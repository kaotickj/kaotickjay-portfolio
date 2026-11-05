import {mkdir, copyFile, rm} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve, dirname} from 'node:path';
const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(project, 'dist');
await rm(dist, {recursive:true, force:true});
await mkdir(resolve(dist, 'assets'), {recursive:true});
for (const file of ['index.html','styles.css','app.js','core.js','assets/favicon.svg']) {
  await copyFile(resolve(project,file), resolve(dist,file));
}
console.log('Static build ready in dist/. No dependencies, network requests, or paid build services.');
