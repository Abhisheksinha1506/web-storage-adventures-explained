
import { useState } from 'react';
import { Folder } from 'lucide-react';
import StorageCard from '../StorageCard';
import InteractiveDemo from '../InteractiveDemo';
import CodeSnippet from '../CodeSnippet';

const StorageBucketDemo = () => {
  const demoComponent = (
    <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg">
      <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
        <div className="text-amber-800 mb-4">
          <Folder className="h-12 w-12 mx-auto mb-2" />
          <p className="font-medium">Storage Bucket API</p>
        </div>
        <p className="text-sm text-gray-500 max-w-md">
          The Storage Bucket API is a newer proposal that can't be fully demonstrated here, as browser support is limited. It aims to provide more granular control over how data is stored and expired.
        </p>
      </div>
    </div>
  );

  return (
    <StorageCard 
      title="Storage Buckets" 
      icon={<Folder className="h-6 w-6 text-amber-600" />}
      color="#FEC6A1"
    >
      <p className="mb-4">
        Storage Buckets are like organizing your browser's storage into separate, labeled containers. Instead of throwing everything into one big box, each container has its own rules about how long to keep stuff and when to clean up.
      </p>
      
      <InteractiveDemo 
        title="How Storage Buckets Work" 
        demoComponent={demoComponent}
        color="#FEC6A1"
      >
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Organizes storage into separate "buckets" with different expiration policies</li>
          <li>Provides more granular control over storage quotas</li>
          <li>Allows different parts of an application to have separate storage lifetimes</li>
          <li>Helps manage storage more efficiently</li>
          <li>Part of the evolving Storage Standard (not fully implemented yet)</li>
        </ul>

        <p className="mb-4">
          Storage Buckets are especially useful for large applications with different components that have varying storage needs and lifetimes.
        </p>

        <CodeSnippet code={`// Creating a storage bucket
// Note: This is a newer API with limited browser support
if ('storageBuckets' in navigator) {
  // Open or create a bucket
  navigator.storageBuckets.open('user-preferences', {
    // Persisted across browser sessions
    persisted: true,
    // Quota in bytes (10MB)
    quota: 10 * 1024 * 1024,
    // Expiration settings
    expires: {
      // Data expires after 30 days
      age: 30 * 24 * 60 * 60 * 1000
    }
  }).then(bucket => {
    // Access local storage in this bucket
    const storage = bucket.localStorage;
    storage.setItem('theme', 'dark');
    
    // Or use indexedDB in this bucket
    const dbPromise = bucket.indexedDB.open('user-data', 1);
    
    // Or use cache storage in this bucket
    bucket.caches.open('user-assets').then(cache => {
      cache.put('/profile-image', new Response('...'));
    });
  });
  
  // List all buckets
  navigator.storageBuckets.keys().then(bucketNames => {
    console.log('Available buckets:', bucketNames);
  });
  
  // Delete a bucket and all its contents
  navigator.storageBuckets.delete('old-bucket').then(() => {
    console.log('Bucket deleted successfully');
  });
}

// Buckets can have different policies
navigator.storageBuckets.open('session-data', {
  persisted: false, // Not persisted across browser restarts
  expires: {
    // Expires after 1 hour of inactivity
    inactivity: 60 * 60 * 1000
  }
});`} />
      </InteractiveDemo>
    </StorageCard>
  );
};

export default StorageBucketDemo;
