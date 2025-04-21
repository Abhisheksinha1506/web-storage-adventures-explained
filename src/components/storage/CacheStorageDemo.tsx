
import { Cloud } from 'lucide-react';
import StorageCard from '../StorageCard';
import CodeSnippet from '../CodeSnippet';

const CacheStorageDemo = ({ expanded = false, onExpand, onCollapse, summaryMode = false }) => {
  return (
    <StorageCard 
      title="Cache Storage" 
      icon={<Cloud className="h-6 w-6 text-blue-500" />}
      color="#1EAEDB"
      expanded={expanded}
      onExpand={onExpand}
      onCollapse={onCollapse}
      summaryMode={summaryMode}
      summary={
        <p>Cache Storage allows web applications to store network responses, enabling offline access and improving performance by reducing network requests.</p>
      }
    >
      <p className="mb-4">
        Cache Storage is like having a super-powered browser cache that you can control. It's like telling your browser, "Remember this entire webpage and all its resources, so next time, you don't need to download it again - even if the user is offline!"
      </p>
      
      <div className="prose max-w-none">
        <h3 className="text-lg font-semibold mb-2">How Cache Storage Works</h3>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Stores complete HTTP responses (HTML, CSS, JS, images, etc.)</li>
          <li>Paired with Service Workers to enable offline experiences</li>
          <li>Developer-controlled caching (unlike traditional browser cache)</li>
          <li>Persistent across browser sessions</li>
          <li>Can store responses from different origins (cross-domain resources)</li>
        </ul>

        <p className="mb-4">
          Cache Storage is a key component of Progressive Web Apps (PWAs), allowing them to work offline by storing previously fetched resources.
        </p>

        <CodeSnippet code={`// Opening a specific cache
caches.open('my-site-cache-v1').then(cache => {
  // Cache a response to a specific request
  cache.put('/api/data', new Response('{"status": "cached"}'));
  
  // Add a list of URLs to the cache
  return cache.addAll([
    '/',
    '/styles.css',
    '/script.js',
    '/images/logo.png'
  ]);
});

// Fetching from cache
caches.match('/api/data').then(response => {
  if (response) {
    return response.json(); // Cached data found
  } else {
    return fetch('/api/data'); // Not in cache, fetch from network
  }
});

// Common pattern in Service Workers for offline-first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        // Clone the response to store in cache
        return caches.open('my-cache').then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      });
    })
  );
});`} />
      </div>
    </StorageCard>
  );
};

export default CacheStorageDemo;
