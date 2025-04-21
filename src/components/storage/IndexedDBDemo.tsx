
import { Database } from 'lucide-react';
import StorageCard from '../StorageCard';
import CodeSnippet from '../CodeSnippet';

const IndexedDBDemo = ({ expanded = false, onExpand, onCollapse, summaryMode = false }) => {
  return (
    <StorageCard 
      title="IndexedDB" 
      icon={<Database className="h-6 w-6 text-orange-600" />}
      color="#F97316"
      expanded={expanded}
      onExpand={onExpand}
      onCollapse={onCollapse}
      summaryMode={summaryMode}
      summary={
        <p>IndexedDB is a powerful client-side database that allows web applications to store and retrieve large amounts of structured data efficiently.</p>
      }
    >
      <p className="mb-4">
        IndexedDB is like having a mini database inside your browser. While LocalStorage is a simple notepad, IndexedDB is more like a spreadsheet program with multiple tables, search abilities, and can store much more data.
      </p>
      
      <div className="prose max-w-none">
        <h3 className="text-lg font-semibold mb-2">How IndexedDB Works</h3>
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
      </div>
    </StorageCard>
  );
};

export default IndexedDBDemo;
