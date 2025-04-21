
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import StorageHeader from '@/components/StorageHeader';
import LocalStorageDemo from '@/components/storage/LocalStorageDemo';
import HistoryStateDemo from '@/components/storage/HistoryStateDemo';
import IndexedDBDemo from '@/components/storage/IndexedDBDemo';
import ServiceWorkerDemo from '@/components/storage/ServiceWorkerDemo';
import CookiesDemo from '@/components/storage/CookiesDemo';
import CacheStorageDemo from '@/components/storage/CacheStorageDemo';
import SharedStorageDemo from '@/components/storage/SharedStorageDemo';
import InterestGroupDemo from '@/components/storage/InterestGroupDemo';
import StorageBucketDemo from '@/components/storage/StorageBucketDemo';
import ExtensionStorageDemo from '@/components/storage/ExtensionStorageDemo';

// Each card will have a unique id; let's define their structures:
const storageDemos = [
  {
    id: "localstorage",
    component: LocalStorageDemo,
  },
  {
    id: "cookies",
    component: CookiesDemo,
  },
  {
    id: "history",
    component: HistoryStateDemo,
  },
  {
    id: "indexeddb",
    component: IndexedDBDemo,
  },
  {
    id: "serviceworker",
    component: ServiceWorkerDemo,
  },
  {
    id: "cache",
    component: CacheStorageDemo,
  },
  {
    id: "sharedstorage",
    component: SharedStorageDemo,
  },
  {
    id: "interestgroup",
    component: InterestGroupDemo,
  },
  {
    id: "storagebucket",
    component: StorageBucketDemo,
  },
  {
    id: "extensionstorage",
    component: ExtensionStorageDemo,
  },
];

const Index = () => {
  // Only allow one expanded at a time, and no card is expanded by default
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Helmet>
        <title>Web Storage Adventures - Browser Storage Guide</title>
      </Helmet>
      
      <StorageHeader />

      <div className="container mx-auto px-2 py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {storageDemos.map(({ id, component: Component }) => (
            <Component
              expanded={expandedId === id}
              onExpand={() => setExpandedId(id)}
              onCollapse={() => setExpandedId(null)}
              key={id}
              summaryMode={expandedId !== id}
            />
          ))}
        </div>
      </div>

      <footer className="mt-12 py-8 bg-gray-100 text-center text-gray-600">
        <div className="container mx-auto px-4">
          <p className="text-sm">
            Web Storage Adventures - A fun, interactive guide to browser storage mechanisms
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
