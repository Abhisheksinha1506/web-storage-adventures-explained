
import { useState } from 'react';
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

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <StorageHeader />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LocalStorageDemo />
          <CookiesDemo />
          <HistoryStateDemo />
          <IndexedDBDemo />
          <ServiceWorkerDemo />
          <CacheStorageDemo />
          <SharedStorageDemo />
          <InterestGroupDemo />
          <StorageBucketDemo />
          <ExtensionStorageDemo />
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
