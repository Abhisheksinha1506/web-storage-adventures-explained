
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface StorageCardProps {
  title: string;
  icon: ReactNode;
  color: string;
  children: ReactNode;
  className?: string;
}

const StorageCard = ({ title, icon, color, children, className }: StorageCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={cn(
        "storage-card animate-fade-in cursor-pointer",
        isExpanded ? "col-span-2 row-span-2" : "",
        className
      )}
      style={{ 
        borderColor: color,
        backgroundColor: `${color}10`, // Very light version of the color
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center mb-4">
        <div className="icon-container mr-3" style={{ backgroundColor: `${color}30` }}>
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      
      <div className={cn(
        "transition-all duration-300 overflow-hidden",
        isExpanded ? "max-h-[1000px] opacity-100" : "max-h-20 opacity-70"
      )}>
        {children}
      </div>
      
      <div className="mt-4 text-sm text-right text-gray-500">
        {isExpanded ? "Click to collapse" : "Click to learn more"}
      </div>
    </div>
  );
};

export default StorageCard;
