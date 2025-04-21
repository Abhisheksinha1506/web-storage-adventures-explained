
import { useState, useEffect } from 'react';
import { Database } from 'lucide-react';
import StorageCard from '../StorageCard';
import InteractiveDemo from '../InteractiveDemo';
import CodeSnippet from '../CodeSnippet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const IndexedDBDemo = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const [people, setPeople] = useState<{ id: number; name: string; age: number }[]>([]);
  const DB_NAME = 'DemoDatabase';
  const STORE_NAME = 'people';

  useEffect(() => {
    // Initialize the database and load existing data
    initDB().then(() => {
      loadPeople();
    }).catch(err => {
      setError(`Failed to initialize database: ${err.message}`);
    });
  }, []);

  const initDB = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error('Your browser doesn\'t support IndexedDB'));
        return;
      }

      const request = window.indexedDB.open(DB_NAME, 1);

      request.onerror = (event) => {
        reject(new Error('Error opening database'));
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      };

      request.onsuccess = (event) => {
        resolve();
      };
    });
  };

  const loadPeople = () => {
    const request = window.indexedDB.open(DB_NAME);
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const getAllRequest = store.getAll();
      
      getAllRequest.onsuccess = () => {
        setPeople(getAllRequest.result || []);
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    };
  };

  const addPerson = () => {
    if (!name || !age) {
      setError('Please enter both name and age');
      return;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum)) {
      setError('Age must be a number');
      return;
    }

    setError('');
    
    const request = window.indexedDB.open(DB_NAME);
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      store.add({ name, age: ageNum });
      
      transaction.oncomplete = () => {
        db.close();
        setName('');
        setAge('');
        loadPeople();
      };
      
      transaction.onerror = (event) => {
        setError(`Transaction error: ${(event.target as IDBTransaction).error}`);
      };
    };
  };

  const deletePerson = (id: number) => {
    const request = window.indexedDB.open(DB_NAME);
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      store.delete(id);
      
      transaction.oncomplete = () => {
        db.close();
        loadPeople();
      };
    };
  };

  const clearAll = () => {
    const request = window.indexedDB.open(DB_NAME);
    
    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      store.clear();
      
      transaction.oncomplete = () => {
        db.close();
        loadPeople();
      };
    };
  };

  const demoComponent = (
    <div className="space-y-4">
      {error && (
        <div className="p-2 bg-red-50 text-red-700 text-sm rounded">
          {error}
        </div>
      )}
      
      <div className="flex gap-2">
        <Input 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="flex-1"
        />
        <Input 
          placeholder="Age" 
          type="number" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          className="w-24"
        />
        <Button onClick={addPerson} variant="outline">Add Person</Button>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">People in Database:</h4>
        {people.length === 0 ? (
          <p className="text-sm text-gray-500">No people in the database yet.</p>
        ) : (
          <div className="space-y-2">
            {people.map((person) => (
              <div key={person.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <span className="font-medium">{person.name}</span>
                  <span className="text-gray-500 ml-2">Age: {person.age}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => deletePerson(person.id)}
                  className="h-7 text-xs"
                >
                  Delete
                </Button>
              </div>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAll} 
              className="mt-2"
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <StorageCard 
      title="IndexedDB" 
      icon={<Database className="h-6 w-6 text-orange-600" />}
      color="#F97316"
    >
      <p className="mb-4">
        IndexedDB is like having a mini database inside your browser. While LocalStorage is a simple notepad, IndexedDB is more like a spreadsheet program with multiple tables, search abilities, and can store much more data.
      </p>
      
      <InteractiveDemo 
        title="How IndexedDB Works" 
        demoComponent={demoComponent}
        color="#F97316"
      >
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>A full-featured database in the browser</li>
          <li>Can store large amounts of structured data</li>
          <li>Supports transactions and indexes for faster searches</li>
          <li>Completely client-side - data never leaves the browser</li>
          <li>Persists even when you close the browser</li>
        </ul>

        <p className="mb-4">
          IndexedDB is perfect for web apps that need to work offline or store significant amounts of data like documents, images, or complex data structures.
        </p>

        <CodeSnippet code={`// Opening a database
const request = indexedDB.open('MyDatabase', 1);

// Creating object stores (tables) when needed
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const store = db.createObjectStore('customers', { keyPath: 'id' });
  store.createIndex('name', 'name', { unique: false });
};

// Working with data
request.onsuccess = (event) => {
  const db = event.target.result;
  
  // Start a transaction and get the object store
  const transaction = db.transaction(['customers'], 'readwrite');
  const store = transaction.objectStore('customers');
  
  // Add a new customer
  store.add({ id: 1, name: 'John', email: 'john@example.com' });
  
  // Get a customer by ID
  const getRequest = store.get(1);
  getRequest.onsuccess = () => {
    console.log(getRequest.result);
  };
};`} />
      </InteractiveDemo>
    </StorageCard>
  );
};

export default IndexedDBDemo;
