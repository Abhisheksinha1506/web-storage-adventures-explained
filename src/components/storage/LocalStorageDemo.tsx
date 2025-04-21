
import { Database } from 'lucide-react';
import StorageCard from '../StorageCard';
import CodeSnippet from '../CodeSnippet';

const SUMMARY_TEXT = "Think of LocalStorage as a small notebook your browser keeps for each website. The notes stay there even if you close the browser!";

const LocalStorageDemo = ({
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
      title="LocalStorage"
      icon={<Database className="h-6 w-6 text-purple-600" />}
      color="#9b87f5"
      expanded={expanded}
      onExpand={onExpand}
      onCollapse={onCollapse}
      summaryMode={summaryMode}
      summary={SUMMARY_TEXT}
    >
      <p className="mb-4">
        Think of LocalStorage as a small notebook that your browser keeps for each website. The website can write things in this notebook, and the notes stay there even if you close the browser or turn off your computer.
      </p>
      <div className="prose max-w-none mb-4">
        <h3 className="text-lg font-semibold mb-2">How LocalStorage Works</h3>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>The browser gives each website up to 5MB of storage</li>
          <li>Data is stored as key-value pairs (like a dictionary)</li>
          <li>Values are always stored as strings</li>
          <li>Data persists even when you close the browser</li>
          <li>Data is accessible only to that specific website domain</li>
        </ul>
        <p>
          It's perfect for saving user preferences, theme settings, or a shopping cart that persists between visits.
        </p>
      </div>
      <CodeSnippet code={`// Saving data
localStorage.setItem('username', 'dev_guru');

// Reading data
const username = localStorage.getItem('username');

// Removing data
localStorage.removeItem('username');

// Clearing all data (careful with this one!)
localStorage.clear();`} />
    </StorageCard>
  );
};

export default LocalStorageDemo;
