
import { Folder } from 'lucide-react';
import StorageCard from '../StorageCard';
import CodeSnippet from '../CodeSnippet';

const SUMMARY_TEXT = "Storage Buckets are like organizing your browser's storage into separate, labeled containers with their own expiration rules.";

const StorageBucketDemo = ({
  expanded = false,
  onExpand,
  onCollapse,
  summaryMode = false,
}: {
  expanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
  summaryMode?: boolean;
}) => {
  return (
    <StorageCard 
      title="Storage Buckets" 
      icon={<Folder className="h-6 w-6 text-amber-600" />}
      color="#FEC6A1"
      expanded={expanded}
      onExpand={onExpand}
      onCollapse={onCollapse}
      summaryMode={summaryMode}
      summary={SUMMARY_TEXT}
    >
      <p className="mb-4">
        Storage Buckets are like organizing your browser's storage into separate, labeled containers. Instead of throwing everything into one big box, each container has its own rules about how long to keep stuff and when to clean up.
      </p>
      
      <div className="prose max-w-none mb-4">
        <h3 className="text-lg font-semibold mb-2">How Storage Buckets Work</h3>
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
      </div>

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
    </StorageCard>
  );
};

export default StorageBucketDemo;
