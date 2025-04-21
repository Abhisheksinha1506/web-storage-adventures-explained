
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeSnippetProps {
  code: string;
  language?: string;
  className?: string;
}

const CodeSnippet = ({ code, language = 'javascript', className }: CodeSnippetProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative rounded-md overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-200">
        <span className="text-xs font-medium">{language}</span>
        <button 
          onClick={handleCopy}
          className="text-xs flex items-center gap-1 hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-gray-900 text-gray-100 text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeSnippet;
