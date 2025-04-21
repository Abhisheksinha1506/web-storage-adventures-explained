
import { useState } from 'react';
import { Users } from 'lucide-react';
import StorageCard from '../StorageCard';
import InteractiveDemo from '../InteractiveDemo';
import CodeSnippet from '../CodeSnippet';

const InterestGroupDemo = () => {
  const demoComponent = (
    <div className="p-4 bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-lg">
      <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
        <div className="text-purple-800 mb-4">
          <Users className="h-12 w-12 mx-auto mb-2" />
          <p className="font-medium">Interest Group API</p>
        </div>
        <p className="text-sm text-gray-500 max-w-md">
          Interest Groups (part of the Privacy Sandbox) can't be directly demonstrated in this interface as they require special browser configurations and are primarily used for privacy-preserving ad targeting.
        </p>
      </div>
    </div>
  );

  return (
    <StorageCard 
      title="Interest Groups" 
      icon={<Users className="h-6 w-6 text-purple-600" />}
      color="#D946EF"
    >
      <p className="mb-4">
        Interest Groups are like private clubs in your browser. Websites can ask you to join their "club" based on your interests, and then later show you relevant ads without tracking you across the internet or sharing your personal details.
      </p>
      
      <InteractiveDemo 
        title="How Interest Groups Work" 
        demoComponent={demoComponent}
        color="#D946EF"
      >
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Part of the Privacy Sandbox initiative (replacing third-party cookies)</li>
          <li>Allows browsers to store user interests locally</li>
          <li>Enables on-device ad auctions without sharing browsing history</li>
          <li>Gives users control over which interest groups they belong to</li>
          <li>Keeps targeting data in the browser, not on external servers</li>
        </ul>

        <p className="mb-4">
          Interest Groups represent a major shift in how online advertising works, moving from cross-site tracking to privacy-preserving targeting that keeps user data on their device.
        </p>

        <CodeSnippet code={`// On an advertiser's website, a user shows interest in running shoes
navigator.joinAdInterestGroup({
  owner: 'https://shoes-advertiser.example',
  name: 'running-shoes-fans',
  expiryTime: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
  ads: [{
    renderUrl: 'https://shoes-advertiser.example/ads/running-shoes.html',
    metadata: {
      productId: 'running-shoes-v2',
      clickthrough: 'https://shoes-advertiser.example/running-shoes'
    }
  }]
}, 7 * 24 * 60 * 60 * 1000); // 7 day permission

// On a publisher's website, during page load
const auctionConfig = {
  seller: 'https://publisher.example',
  decisionLogicUrl: 'https://publisher.example/auction-decision.js',
  interestGroupBuyers: [
    'https://shoes-advertiser.example',
    'https://another-advertiser.example'
  ],
  auctionSignals: { /* publisher-specific signals */ },
  sellerSignals: { /* site-specific signals */ },
  perBuyerSignals: {
    'https://shoes-advertiser.example': { /* buyer-specific signals */ }
  }
};

// Run the ad auction (in the browser)
navigator.runAdAuction(auctionConfig).then(auctionResult => {
  if (auctionResult) {
    // Render the winning ad in a fenced frame
    const adFrame = document.createElement('fencedframe');
    adFrame.src = auctionResult;
    document.body.appendChild(adFrame);
  }
});`} />
      </InteractiveDemo>
    </StorageCard>
  );
};

export default InterestGroupDemo;
