
import { Users } from 'lucide-react';
import StorageCard from '../StorageCard';
import CodeSnippet from '../CodeSnippet';

const SUMMARY_TEXT = "Interest Groups are like private clubs in your browser based on what you like, helping show relevant ads without tracking you across websites.";

const InterestGroupDemo = ({
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
      title="Interest Groups" 
      icon={<Users className="h-6 w-6 text-purple-600" />}
      color="#D946EF"
      expanded={expanded}
      onExpand={onExpand}
      onCollapse={onCollapse}
      summaryMode={summaryMode}
      summary={SUMMARY_TEXT}
    >
      <p className="mb-4">
        Interest Groups are like private clubs in your browser. Websites can ask you to join their "club" based on your interests, and then later show you relevant ads without tracking you across the internet or sharing your personal details.
      </p>
      
      <div className="prose max-w-none mb-4">
        <h3 className="text-lg font-semibold mb-2">How Interest Groups Work</h3>
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
      </div>

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
    </StorageCard>
  );
};

export default InterestGroupDemo;
