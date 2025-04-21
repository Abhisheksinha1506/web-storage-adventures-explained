
import { useState, useEffect } from 'react';
import { History } from 'lucide-react';
import StorageCard from '../StorageCard';
import CodeSnippet from '../CodeSnippet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HistoryStateDemo = ({ expanded = false, onExpand, onCollapse, summaryMode = false }) => {
  const [stateData, setStateData] = useState('');
  const [currentState, setCurrentState] = useState<any>(null);
  
  const pushState = () => {
    if (!stateData) return;
    
    const data = { text: stateData, timestamp: new Date().toISOString() };
    window.history.pushState(data, '', `#${stateData.toLowerCase().replace(/\s+/g, '-')}`);
    setCurrentState(data);
  };
  
  const replaceState = () => {
    if (!stateData) return;
    
    const data = { text: stateData, timestamp: new Date().toISOString() };
    window.history.replaceState(data, '', `#${stateData.toLowerCase().replace(/\s+/g, '-')}`);
    setCurrentState(data);
  };
  
  const goBack = () => {
    window.history.back();
  };
  
  const goForward = () => {
    window.history.forward();
  };

  // Listen for popstate events
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setCurrentState(event.state);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  return (
    <StorageCard
      title="History State"
      icon={<History className="h-6 w-6 text-indigo-600" />}
      color="#8B5CF6"
      expanded={expanded}
      onExpand={onExpand}
      onCollapse={onCollapse}
      summaryMode={summaryMode}
      summary={
        <p>The History API allows web applications to manipulate browser history and store state data without page reloads, perfect for single-page applications.</p>
      }
    >
      <p className="mb-4">
        The History State is like a magical bookmark that not only remembers what page you were on, but also remembers extra information about what you were doing there - without having to reload anything.
      </p>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="State data"
            value={stateData}
            onChange={(e) => setStateData(e.target.value)}
            className="flex-1"
          />
          <Button onClick={pushState} variant="outline">Push State</Button>
          <Button onClick={replaceState} variant="outline">Replace State</Button>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button onClick={goBack} variant="secondary" size="sm">← Back</Button>
          <Button onClick={goForward} variant="secondary" size="sm">Forward →</Button>
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <h4 className="text-sm font-medium mb-2">Current State:</h4>
          {currentState ? (
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(currentState, null, 2)}
            </pre>
          ) : (
            <p className="text-sm text-gray-500">No state set yet.</p>
          )}
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          Note: Use the browser's back/forward buttons or the buttons above to navigate history states.
        </p>

        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Allows websites to store data in the browser's navigation history</li>
          <li>Works with browser forward/back buttons</li>
          <li>Saves the state of your page without reloading</li>
          <li>Perfect for single-page applications (SPAs)</li>
          <li>Data is lost when you close the tab or navigate away</li>
        </ul>
        
        <p className="mb-4">
          It's commonly used in modern web apps to maintain UI state when navigating between views, without needing to reload the entire page.
        </p>
        
        <CodeSnippet code={`// Store state in history
window.history.pushState(
  { page: 2, settings: { theme: 'dark' } }, // state object
  '', // title (ignored by most browsers)
  '/new-url' // URL
);

// Replace current history entry
window.history.replaceState(
  { page: 2, updated: true },
  '',
  '/same-url'
);

// Access state when user navigates
window.addEventListener('popstate', (event) => {
  console.log(event.state); // Retrieve the state object
});`} />
      </div>
    </StorageCard>
  );
};

export default HistoryStateDemo;
