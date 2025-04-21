
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StorageCardProps {
  title: string;
  icon: ReactNode;
  color: string;
  children: ReactNode;
  className?: string;
  expanded?: boolean;
  summary?: ReactNode;
  onExpand?: () => void;
  onCollapse?: () => void;
  summaryMode?: boolean; // true: condensed, false: expanded (default false)
}

const StorageCard = ({
  title,
  icon,
  color,
  children,
  className,
  expanded = false,
  summary,
  onExpand,
  onCollapse,
  summaryMode = false,
}: StorageCardProps) => {
  const handleClick = () => {
    if (expanded) {
      onCollapse?.();
    } else {
      onExpand?.();
    }
  };

  return (
    <div
      className={cn(
        "storage-card animate-fade-in cursor-pointer flex flex-col justify-between outline-none",
        expanded
          ? "col-span-2 row-span-2 border-2 border-[var(--tw-shadow-color)] bg-white" // prominent when open
          : "opacity-80 hover:opacity-100",
        className
      )}
      style={{
        borderColor: color,
        boxShadow: expanded ? `0 4px 24px 0 ${color}30` : undefined,
        backgroundColor: expanded ? `${color}08` : `${color}06`,
        transition: "all 0.4s cubic-bezier(.5,.1,0,1)",
      }}
      tabIndex={0}
      onClick={handleClick}
      aria-expanded={expanded}
      role="button"
    >
      <div className="flex items-center mb-4">
        <div className="icon-container mr-3" style={{ backgroundColor: `${color}25` }}>
          {icon}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>

      <div className={cn(
        "transition-all duration-300 grow",
        expanded
          ? "opacity-100 max-h-[1200px]"
          : "opacity-80 max-h-32 overflow-hidden"
      )}>
        {summaryMode && summary ? (
          <div className="text-sm text-gray-600">{summary}</div>
        ) : (
          children
        )}
      </div>

      <div className="mt-4 text-sm text-right text-gray-500 select-none">
        {expanded ? "Click to collapse" : "Click to learn more"}
      </div>
    </div>
  );
};

export default StorageCard;
