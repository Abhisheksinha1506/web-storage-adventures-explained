
import { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InteractiveDemoProps {
  title: string;
  children: ReactNode;
  demoComponent: ReactNode;
  color: string;
}

const InteractiveDemo = ({ title, children, demoComponent, color }: InteractiveDemoProps) => {
  const [activeTab, setActiveTab] = useState<'explanation' | 'demo'>('explanation');

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="flex border-b">
        <button
          className={cn(
            "px-4 py-2 text-sm font-medium flex-1",
            activeTab === 'explanation' 
              ? `bg-${color} text-white` 
              : "bg-white hover:bg-gray-50"
          )}
          onClick={() => setActiveTab('explanation')}
          style={activeTab === 'explanation' ? { backgroundColor: color } : {}}
        >
          Explanation
        </button>
        <button
          className={cn(
            "px-4 py-2 text-sm font-medium flex-1",
            activeTab === 'demo' 
              ? `bg-${color} text-white` 
              : "bg-white hover:bg-gray-50"
          )}
          onClick={() => setActiveTab('demo')}
          style={activeTab === 'demo' ? { backgroundColor: color } : {}}
        >
          Try It
        </button>
      </div>
      
      <div className="p-4">
        {activeTab === 'explanation' ? (
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            {children}
          </div>
        ) : (
          <div className="min-h-[200px]">
            {demoComponent}
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveDemo;
