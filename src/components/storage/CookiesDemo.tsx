
import { Cookie } from 'lucide-react';
import StorageCard from '../StorageCard';
import CodeSnippet from '../CodeSnippet';

const CookiesDemo = ({ expanded = false, onExpand, onCollapse, summaryMode = false }) => {
  return (
    <StorageCard 
      title="Cookies" 
      icon={<Cookie className="h-6 w-6 text-yellow-600" />}
      color="#FEF7CD"
      expanded={expanded}
      onExpand={onExpand}
      onCollapse={onCollapse}
      summaryMode={summaryMode}
      summary={
        <p>Cookies are small pieces of data stored in your browser that websites can access to remember information about you and your preferences.</p>
      }
    >
      <p className="mb-4">
        Cookies are like name tags that your browser attaches to every request it makes to a website. Each tag can have a little bit of information written on it that the website can read and write.
      </p>
      
      <div className="prose max-w-none">
        <h3 className="text-lg font-semibold mb-2">How Cookies Work</h3>
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
      </div>
    </StorageCard>
  );
};

export default CookiesDemo;
