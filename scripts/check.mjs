import {readFile, stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve, dirname} from 'node:path';
const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = await readFile(resolve(project,'index.html'),'utf8');
const failures=[];
const assert=(condition, message)=>{if(!condition) failures.push(message);};
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
assert(new Set(ids).size === ids.length, 'Duplicate element IDs');
for (const match of html.matchAll(/(?:href|aria-controls)="#?([^"\s]+)"/g)) {
  if (match[0].startsWith('href="#') || match[0].startsWith('aria-controls=')) assert(ids.includes(match[1]), `Broken fragment/control target: ${match[1]}`);
}
for (const match of html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="([^"#]+)"/g)) {
  if (!/^(https?:|data:)/.test(match[1])) {
    try {await stat(resolve(project,match[1]));} catch {failures.push(`Missing asset: ${match[1]}`);}
  }
}
for(const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) assert(match[0].includes('rel="noopener noreferrer"'), 'External link lacks safe rel attributes');
assert(/<html[^>]*lang="en"/.test(html), 'Missing page language');
assert((html.match(/<h1\b/g)??[]).length===1, 'Expected one h1');
assert(html.includes('name="viewport"'), 'Missing viewport');
assert(html.includes('class="skip-link"'), 'Missing skip link');
assert(html.includes('https://tryhackme.com/p/KaotickJay'), 'Missing current THM URL');
assert(!html.includes('https://tryhackme.com/p/kaotickj'), 'Stale THM URL');
assert(html.includes('https://app.hackthebox.com/profile/476578'), 'Missing HTB URL');
assert(!/(mailto:|tel:|[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/i.test(html), 'Email addresses and private contact details must not be included');
assert(!/https?:\/\/(?:www\.)?kaotickjay\.com/.test(html), 'Unverified domain must not be claimed');
assert((html.match(/data-category=/g)??[]).length===6, 'Expected six verified projects');
assert(!/\b(?:eval\(|new Function\(|innerHTML\s*=)/.test(await readFile(resolve(project,'app.js'),'utf8')), 'Unsafe dynamic HTML or execution');
assert(!/<script[^>]+src="https?:/.test(html), 'Unexpected third-party runtime');
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log('Passed 15 static integrity, privacy, and accessibility checks.');
