
import { useState, useEffect } from 'react';
import { Cloud } from 'lucide-react';
import StorageCard from '../StorageCard';
import InteractiveDemo from '../InteractiveDemo';
import CodeSnippet from '../CodeSnippet';
import { Button } from '@/components/ui/button';

const ServiceWorkerDemo = ({ expanded = false, onExpand, onCollapse, summaryMode = false }) => {
  const [swSupported, setSwSupported] = useState(false);
  const [swActive, setSwActive] = useState(false);
  const [swStatus, setSwStatus] = useState('Checking...');

  useEffect(() => {
    // Check if Service Worker is supported
    if ('serviceWorker' in navigator) {
      setSwSupported(true);
      
      // Check if there are any active service workers
      navigator.serviceWorker.getRegistrations().then(registrations => {
        setSwActive(registrations.length > 0);
        setSwStatus(registrations.length > 0 
          ? `Active (${registrations.length} worker${registrations.length > 1 ? 's' : ''})` 
          : 'Not active');
      });
    } else {
      setSwStatus('Not supported in this browser');
    }
  }, []);

  const demoComponent = (
    <div className="space-y-4">
      <div className="p-4 rounded-md bg-gray-50">
        <h4 className="text-sm font-medium mb-2">Service Worker Status:</h4>
        <div className="flex items-center">
          <div 
            className={`w-3 h-3 rounded-full mr-2 ${swActive ? 'bg-green-500' : 'bg-red-500'}`}
          ></div>
          <span className="text-sm">{swStatus}</span>
        </div>
      </div>
      
      <p className="text-sm">
        {swSupported 
          ? "Your browser supports Service Workers. In a real app, you could register a Service Worker to enable offline features." 
          : "Your browser doesn't support Service Workers."}
      </p>
      
      <div className="bg-blue-50 p-4 rounded-md mt-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> For security reasons, we can't actually register a Service Worker in this demo iframe. In a real application, Service Workers enable powerful features like offline access, push notifications, and background sync.
        </p>
      </div>
    </div>
  );

  return (
    <StorageCard 
      title="Service Workers" 
      icon={<Cloud className="h-6 w-6 text-blue-600" />}
      color="#0EA5E9"
      expanded={expanded}
      onExpand={onExpand}
      onCollapse={onCollapse}
      summaryMode={summaryMode}
      summary={
        <p>Service Workers act as proxy servers that sit between web applications, the browser, and the network, enabling features like offline functionality and push notifications.</p>
      }
    >
      <p className="mb-4">
        A Service Worker is like having a personal assistant for your website that works behind the scenes. This assistant stays active even when you close the website and can handle tasks like delivering notifications, syncing data, and most importantly, letting you use the website even when you're offline!
      </p>
      
      <InteractiveDemo 
        title="How Service Workers Work" 
        demoComponent={demoComponent}
        color="#0EA5E9"
      >
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Acts as a proxy between the web app and the network</li>
          <li>Can intercept network requests and cache responses</li>
          <li>Runs in the background, separate from the web page</li>
          <li>Enables offline experiences and background sync</li>
          <li>Allows for push notifications even when the browser is closed</li>
        </ul>

        <p className="mb-4">
          Unlike other storage mechanisms, Service Workers don't store data directly but work with Cache API to provide offline capabilities. They're perfect for building Progressive Web Apps (PWAs).
        </p>

        <CodeSnippet code={`// Registering a service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', 
                  registration.scope);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}

// Example service worker (sw.js) that caches resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/styles.css',
        '/app.js',
        '/offline.html'
      ]);
    })
  );
});

// Intercept fetch requests and respond with cached content
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});`} />
      </InteractiveDemo>
    </StorageCard>
  );
};

export default ServiceWorkerDemo;
