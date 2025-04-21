
import { Users } from 'lucide-react';
import StorageCard from '../StorageCard';
import CodeSnippet from '../CodeSnippet';

const SUMMARY_TEXT = "Shared Storage is like a special vault that different websites can access, but with strict rules about what they can see and do.";

const SharedStorageDemo = ({
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
      title="Shared Storage" 
      icon={<Users className="h-6 w-6 text-blue-600" />}
      color="#33C3F0"
      expanded={expanded}
      onExpand={onExpand}
      onCollapse={onCollapse}
      summaryMode={summaryMode}
      summary={SUMMARY_TEXT}
    >
      <p className="mb-4">
        Shared Storage is like a special vault that different websites can access, but with strict rules about what they can see and what they can do with the information inside. It's designed to let websites work together while protecting user privacy.
      </p>
      
      <div className="prose max-w-none mb-4">
        <h3 className="text-lg font-semibold mb-2">How Shared Storage Works</h3>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Allows limited cross-site data sharing (across different domains)</li>
          <li>Provides privacy-preserving ways to share information</li>
          <li>Uses special "worklets" to access and process data</li>
          <li>Designed for specific use cases like cross-site user frequency capping</li>
          <li>Part of the Privacy Sandbox initiative to replace third-party cookies</li>
        </ul>

        <p className="mb-4">
          Unlike other storage mechanisms, Shared Storage has strict limitations on how data can be extracted, focusing on aggregated information rather than individual user data.
        </p>
      </div>

      <CodeSnippet code={`// Accessing the shared storage
// This would typically be used by advertisers or analytics services
if ('sharedStorage' in window) {
  // Writing data to shared storage
  window.sharedStorage.set('campaign_view_count', '3');
  
  // Running a worklet to process data privately
  window.sharedStorage.run('select-url', {
    data: { urls: ['url1', 'url2', 'url3'] },
    selectURL: true
  }).then(result => {
    // The result is a URL index, not the actual data
    console.log(\`Selected URL index: \${result}\`);
  });
  
  // For frequency capping example
  window.sharedStorage.worklet.addModule('frequency-capping.js');
}

// Example of a frequency capping worklet (frequency-capping.js)
class FrequencyCappingSelectURLOperation {
  async run(data) {
    // Get current view count
    const countStr = await this.sharedStorage.get('campaign_view_count') || '0';
    const count = parseInt(countStr, 10);
    
    // Update the count
    await this.sharedStorage.set('campaign_view_count', String(count + 1));
    
    // Select different content based on view frequency
    if (count < 5) {
      return 0; // First URL - regular ad
    } else {
      return 1; // Second URL - alternative content
    }
  }
}

register('frequency-capping', FrequencyCappingSelectURLOperation);`} />
    </StorageCard>
  );
};

export default SharedStorageDemo;
