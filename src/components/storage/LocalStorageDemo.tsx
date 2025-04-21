
import { useState, useEffect } from 'react';
import { Database } from 'lucide-react';
import StorageCard from '../StorageCard';
import InteractiveDemo from '../InteractiveDemo';
import CodeSnippet from '../CodeSnippet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const LocalStorageExample = () => {
  const [key, setKey] = useState('myKey');
  const [value, setValue] = useState('myValue');
  const [storedItems, setStoredItems] = useState<{ key: string; value: string }[]>([]);

  useEffect(() => {
    updateStoredItems();
  }, []);

  const updateStoredItems = () => {
    const items: { key: string; value: string }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i) || '';
      if (key.startsWith('demo_')) {
        items.push({ key: key.replace('demo_', ''), value: localStorage.getItem(key) || '' });
      }
    }
    setStoredItems(items);
  };

  const handleSave = () => {
    localStorage.setItem(`demo_${key}`, value);
    updateStoredItems();
  };

  const handleClear = (itemKey: string) => {
    localStorage.removeItem(`demo_${itemKey}`);
    updateStoredItems();
  };

  const handleClearAll = () => {
    // Only clear items that start with demo_
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('demo_')) {
        localStorage.removeItem(key);
      }
    });
    updateStoredItems();
  };

  const demoComponent = (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input 
          placeholder="Key" 
          value={key} 
          onChange={(e) => setKey(e.target.value)} 
          className="flex-1"
        />
        <Input 
          placeholder="Value" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          className="flex-1"
        />
        <Button onClick={handleSave} variant="outline">Save</Button>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Stored Items:</h4>
        {storedItems.length === 0 ? (
          <p className="text-sm text-gray-500">No items stored yet.</p>
        ) : (
          <div className="space-y-2">
            {storedItems.map((item) => (
              <div key={item.key} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <span className="font-mono text-sm">{item.key}:</span>{' '}
                  <span className="font-mono text-sm text-gray-600">{item.value}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleClear(item.key)}
                  className="h-7 text-xs"
                >
                  Clear
                </Button>
              </div>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearAll} 
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
      title="LocalStorage" 
      icon={<Database className="h-6 w-6 text-purple-600" />}
      color="#9b87f5"
    >
      <p className="mb-4">
        Think of LocalStorage as a small notebook that your browser keeps for each website. The website can write things in this notebook, and the notes stay there even if you close the browser or turn off your computer.
      </p>
      
      <InteractiveDemo 
        title="How LocalStorage Works" 
        demoComponent={demoComponent}
        color="#9b87f5"
      >
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>The browser gives each website up to 5MB of storage</li>
          <li>Data is stored as key-value pairs (like a dictionary)</li>
          <li>Values are always stored as strings</li>
          <li>Data persists even when you close the browser</li>
          <li>Data is accessible only to that specific website domain</li>
        </ul>

        <p className="mb-4">
          It's perfect for saving user preferences, theme settings, or a shopping cart that persists between visits.
        </p>

        <CodeSnippet code={`// Saving data
localStorage.setItem('username', 'dev_guru');

// Reading data
const username = localStorage.getItem('username');

// Removing data
localStorage.removeItem('username');

// Clearing all data (careful with this one!)
localStorage.clear();`} />
      </InteractiveDemo>
    </StorageCard>
  );
};

export default LocalStorageExample;
