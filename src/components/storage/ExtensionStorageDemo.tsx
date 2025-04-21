
import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import StorageCard from '../StorageCard';
import InteractiveDemo from '../InteractiveDemo';
import CodeSnippet from '../CodeSnippet';

const ExtensionStorageDemo = () => {
  const demoComponent = (
    <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg">
      <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
        <div className="text-purple-800 mb-4">
          <BookOpen className="h-12 w-12 mx-auto mb-2" />
          <p className="font-medium">Extension Storage API</p>
        </div>
        <p className="text-sm text-gray-500 max-w-md">
          Extension Storage is only available to browser extensions and can't be demonstrated in a regular web page. It provides dedicated storage mechanisms for browser extensions.
        </p>
      </div>
    </div>
  );

  return (
    <StorageCard 
      title="Extension Storage" 
      icon={<BookOpen className="h-6 w-6 text-purple-600" />}
      color="#D6BCFA"
    >
      <p className="mb-4">
        Extension Storage is like a private vault just for browser extensions. It's storage that only a specific extension can access, with special powers to save data and sync it across devices where the extension is installed.
      </p>
      
      <InteractiveDemo 
        title="How Extension Storage Works" 
        demoComponent={demoComponent}
        color="#D6BCFA"
      >
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Available only to browser extensions, not regular websites</li>
          <li>Provides both local and synced storage options</li>
          <li>Synced storage can share data across user's devices</li>
          <li>Has higher quotas than localStorage (up to 5MB for sync, 100MB+ for local)</li>
          <li>Data is isolated to the specific extension</li>
        </ul>

        <p className="mb-4">
          Extension Storage is essential for browser extensions that need to store settings, user data, or state information that persists across browser sessions and potentially across devices.
        </p>

        <CodeSnippet code={`// This code only works in browser extensions
// It will not work on regular websites

// Saving data to local extension storage
chrome.storage.local.set(
  { userPreferences: { theme: 'dark', fontSize: 'large' } },
  function() {
    console.log('Preferences saved locally');
  }
);

// Retrieving data from local storage
chrome.storage.local.get('userPreferences', function(result) {
  console.log('Retrieved preferences:', result.userPreferences);
});

// Saving data to synced storage (available across devices)
chrome.storage.sync.set(
  { savedItems: ['item1', 'item2', 'item3'] },
  function() {
    console.log('Items saved and will sync to other devices');
  }
);

// Listening for changes in storage
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (let key in changes) {
    const storageChange = changes[key];
    console.log(
      \`Storage key "\${key}" in \${namespace} changed.\`,
      \`Old value: \${JSON.stringify(storageChange.oldValue)}\`,
      \`New value: \${JSON.stringify(storageChange.newValue)}\`
    );
  }
});

// Removing data
chrome.storage.local.remove('temporaryData', function() {
  console.log('Temporary data removed');
});

// Getting storage usage information
chrome.storage.local.getBytesInUse(null, function(bytesUsed) {
  console.log(\`Using \${bytesUsed} bytes of storage\`);
});`} />
      </InteractiveDemo>
    </StorageCard>
  );
};

export default ExtensionStorageDemo;
