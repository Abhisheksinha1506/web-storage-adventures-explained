
import { useState, useEffect } from 'react';
import { Cloud } from 'lucide-react';
import StorageCard from '../StorageCard';
import InteractiveDemo from '../InteractiveDemo';
import CodeSnippet from '../CodeSnippet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CacheStorageDemo = () => {
  const [cacheSupported, setCacheSupported] = useState(false);
  const [cacheName, setCacheName] = useState('demo-cache');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/todos/1');
  const [cacheContents, setCacheContents] = useState<string[]>([]);
  const [responseData, setResponseData] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if Cache API is supported
    if ('caches' in window) {
      setCacheSupported(true);
      updateCacheContents();
    }
  }, []);

  const updateCacheContents = async () => {
    if (!cacheSupported) return;
    
    try {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      setCacheContents(requests.map(request => request.url));
    } catch (err) {
      setError(`Error reading cache: ${err}`);
    }
  };

  const addToCache = async () => {
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const cache = await caches.open(cacheName);
      const response = await fetch(url);
      await cache.put(url, response.clone());
      
      // Display the cached data
      const data = await response.json();
      setResponseData(JSON.stringify(data, null, 2));
      
      updateCacheContents();
    } catch (err) {
      setError(`Error caching URL: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCache = async (cachedUrl: string) => {
    try {
      const cache = await caches.open(cacheName);
      await cache.delete(cachedUrl);
      updateCacheContents();
      if (cachedUrl === url) {
        setResponseData('');
      }
    } catch (err) {
      setError(`Error removing from cache: ${err}`);
    }
  };

  const clearCache = async () => {
    try {
      await caches.delete(cacheName);
      setCacheContents([]);
      setResponseData('');
    } catch (err) {
      setError(`Error clearing cache: ${err}`);
    }
  };

  const fetchFromCache = async (cachedUrl: string) => {
    setLoading(true);
    setError('');
    
    try {
      const cache = await caches.open(cacheName);
      const response = await cache.match(cachedUrl);
      
      if (response) {
        const data = await response.json();
        setResponseData(JSON.stringify(data, null, 2));
        setUrl(cachedUrl);
      } else {
        setError('No cached data found for this URL');
        setResponseData('');
      }
    } catch (err) {
      setError(`Error fetching from cache: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const demoComponent = (
    <div className="space-y-4">
      {!cacheSupported ? (
        <div className="p-3 bg-yellow-50 text-yellow-800 rounded-md">
          Your browser doesn't support the Cache API.
        </div>
      ) : (
        <>
          {error && (
            <div className="p-2 bg-red-50 text-red-700 text-sm rounded">
              {error}
            </div>
          )}
          
          <div className="flex gap-2">
            <Input 
              placeholder="URL to cache" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              className="flex-1"
            />
            <Button 
              onClick={addToCache} 
              variant="outline" 
              disabled={loading}
            >
              {loading ? 'Caching...' : 'Cache URL'}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Cached URLs:</h4>
              {cacheContents.length === 0 ? (
                <p className="text-sm text-gray-500">No URLs cached yet.</p>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {cacheContents.map((cachedUrl) => (
                    <div key={cachedUrl} className="flex justify-between items-center p-2 bg-gray-50 rounded text-xs">
                      <button 
                        onClick={() => fetchFromCache(cachedUrl)}
                        className="text-left hover:underline truncate max-w-[150px]"
                        title={cachedUrl}
                      >
                        {cachedUrl}
                      </button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFromCache(cachedUrl)}
                        className="h-6 text-xs"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearCache} 
                    className="mt-2 w-full"
                  >
                    Clear Cache
                  </Button>
                </div>
              )}
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Response Data:</h4>
              {responseData ? (
                <pre className="text-xs p-2 bg-gray-50 rounded-md max-h-40 overflow-auto">
                  {responseData}
                </pre>
              ) : (
                <p className="text-sm text-gray-500">No data to display.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <StorageCard 
      title="Cache Storage" 
      icon={<Cloud className="h-6 w-6 text-blue-500" />}
      color="#1EAEDB"
    >
      <p className="mb-4">
        Cache Storage is like having a super-powered browser cache that you can control. It's like telling your browser, "Remember this entire webpage and all its resources, so next time, you don't need to download it again - even if the user is offline!"
      </p>
      
      <InteractiveDemo 
        title="How Cache Storage Works" 
        demoComponent={demoComponent}
        color="#1EAEDB"
      >
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
      </InteractiveDemo>
    </StorageCard>
  );
};

export default CacheStorageDemo;
