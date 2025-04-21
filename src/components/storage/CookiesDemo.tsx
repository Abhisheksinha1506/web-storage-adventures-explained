
import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import StorageCard from '../StorageCard';
import InteractiveDemo from '../InteractiveDemo';
import CodeSnippet from '../CodeSnippet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const CookiesDemo = () => {
  const [name, setName] = useState('cookieName');
  const [value, setValue] = useState('cookieValue');
  const [daysToExpire, setDaysToExpire] = useState('7');
  const [isSecure, setIsSecure] = useState(false);
  const [isHttpOnly, setIsHttpOnly] = useState(false);
  const [cookies, setCookies] = useState<{ name: string; value: string; expires: string }[]>([]);

  useEffect(() => {
    updateCookiesList();
  }, []);

  // Parse document.cookie
  const updateCookiesList = () => {
    const cookiesArray = document.cookie
      .split(';')
      .filter(cookie => cookie.trim().startsWith('demo_'))
      .map(cookie => {
        const [rawName, value] = cookie.split('=').map(part => part.trim());
        const name = rawName.replace('demo_', '');
        
        // We don't have access to expiration in JavaScript
        return { name, value, expires: "Unknown" };
      });
    
    setCookies(cookiesArray);
  };

  const setCookie = () => {
    if (!name || !value) return;
    
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + parseInt(daysToExpire || '0'));
    
    let cookieString = `demo_${name}=${value}; path=/; expires=${expirationDate.toUTCString()}`;
    
    // These flags won't actually work in this demo (they require HTTPS and server involvement)
    if (isSecure) cookieString += '; Secure';
    if (isHttpOnly) cookieString += '; HttpOnly';
    
    document.cookie = cookieString;
    updateCookiesList();
  };

  const deleteCookie = (cookieName: string) => {
    document.cookie = `demo_${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    updateCookiesList();
  };

  const deleteAllCookies = () => {
    document.cookie.split(';').forEach(cookie => {
      const [name] = cookie.split('=').map(part => part.trim());
      if (name.startsWith('demo_')) {
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    });
    updateCookiesList();
  };

  const demoComponent = (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cookie-name">Cookie Name</Label>
          <Input 
            id="cookie-name"
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div>
          <Label htmlFor="cookie-value">Cookie Value</Label>
          <Input 
            id="cookie-value"
            placeholder="Value" 
            value={value} 
            onChange={(e) => setValue(e.target.value)} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 items-end">
        <div>
          <Label htmlFor="cookie-expires">Days until expiration</Label>
          <Input 
            id="cookie-expires"
            type="number" 
            placeholder="Days" 
            value={daysToExpire} 
            onChange={(e) => setDaysToExpire(e.target.value)} 
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="secure" 
            checked={isSecure}
            onCheckedChange={setIsSecure}
          />
          <Label htmlFor="secure">Secure</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch 
            id="httpOnly" 
            checked={isHttpOnly}
            onCheckedChange={setIsHttpOnly}
          />
          <Label htmlFor="httpOnly">HttpOnly</Label>
        </div>
      </div>
      
      <Button onClick={setCookie} className="mt-2">Set Cookie</Button>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium mb-2">Current Cookies:</h4>
        {cookies.length === 0 ? (
          <p className="text-sm text-gray-500">No cookies set yet.</p>
        ) : (
          <div className="space-y-2">
            {cookies.map((cookie) => (
              <div key={cookie.name} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                  <span className="font-mono text-sm">{cookie.name}</span>
                  <span className="mx-2">=</span>
                  <span className="font-mono text-sm text-gray-600">{cookie.value}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => deleteCookie(cookie.name)}
                  className="h-7 text-xs"
                >
                  Delete
                </Button>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={deleteAllCookies} 
              className="mt-2"
            >
              Delete All Cookies
            </Button>
          </div>
        )}
      </div>
      
      <p className="text-xs text-gray-500 mt-4">
        Note: Secure and HttpOnly flags won't actually work in this demo (they require HTTPS and server involvement).
      </p>
    </div>
  );

  return (
    <StorageCard 
      title="Cookies" 
      icon={<Cookie className="h-6 w-6 text-yellow-600" />}
      color="#FEF7CD"
    >
      <p className="mb-4">
        Cookies are like name tags that your browser attaches to every request it makes to a website. Each tag can have a little bit of information written on it that the website can read and write.
      </p>
      
      <InteractiveDemo 
        title="How Cookies Work" 
        demoComponent={demoComponent}
        color="#FEF7CD"
      >
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li>Small pieces of data (up to 4KB each) sent between browser and server</li>
          <li>Automatically included in HTTP requests to the same domain</li>
          <li>Can be set to expire or last for a browser session</li>
          <li>Can have special flags like HttpOnly (not accessible via JavaScript) and Secure (HTTPS only)</li>
          <li>Can be scoped to specific paths within a domain</li>
        </ul>

        <p className="mb-4">
          Cookies are perfect for authentication tokens, user preferences that need to be available on both client and server, and tracking user behavior across sessions.
        </p>

        <CodeSnippet code={`// Setting a cookie that expires in 7 days
document.cookie = "username=dev_guru; path=/; max-age=604800";

// Setting a secure, HttpOnly cookie (server-side example)
// This requires HTTPS and can't be accessed by JavaScript
// res.setHeader('Set-Cookie', 'auth=token123; HttpOnly; Secure');

// Reading cookies in JavaScript
const cookies = document.cookie;
console.log(cookies); // "username=dev_guru; other=value"

// Parsing a specific cookie value
function getCookie(name) {
  const value = \`; \${document.cookie}\`;
  const parts = value.split(\`; \${name}=\`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
const username = getCookie('username'); // "dev_guru"

// Deleting a cookie (set it to expire in the past)
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";`} />
      </InteractiveDemo>
    </StorageCard>
  );
};

export default CookiesDemo;
