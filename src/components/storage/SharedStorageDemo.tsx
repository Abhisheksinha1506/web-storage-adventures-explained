
import { useState } from 'react';
import { Users } from 'lucide-react';
import StorageCard from '../StorageCard';
import InteractiveDemo from '../InteractiveDemo';
import CodeSnippet from '../CodeSnippet';

const SharedStorageDemo = () => {
  const demoComponent = (
    <div className="p-4 bg-gradient-to-br from-sky-50 to-indigo-50 rounded-lg">
      <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
        <div className="text-blue-800 mb-4">
          <Users className="h-12 w-12 mx-auto mb-2" />
          <p className="font-medium">Shared Storage API</p>
        </div>
        <p className="text-sm text-gray-500 max-w-md">
          The Shared Storage API can't be directly demonstrated in this interface as it requires special browser permissions and is primarily used for cross-site data sharing in controlled ways.
        </p>
      </div>
    </div>
  );

  return (
    <StorageCard 
      title="Shared Storage" 
      icon={<Users className="h-6 w-6 text-blue-600" />}
      color="#33C3F0"
    >
      <p className="mb-4">
        Shared Storage is like a special vault that different websites can access, but with strict rules about what they can see and what they can do with the information inside. It's designed to let websites work together while protecting user privacy.
      </p>
      
      <InteractiveDemo 
        title="How Shared Storage Works" 
        demoComponent={demoComponent}
        color="#33C3F0"
      >
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
      </InteractiveDemo>
    </StorageCard>
  );
};

export default SharedStorageDemo;
