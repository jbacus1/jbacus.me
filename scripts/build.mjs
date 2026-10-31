import { mkdir, cp, rm } from 'node:fs/promises';
const out = new URL('../dist/', import.meta.url);
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const f of ['index.html', 'styles.css', 'app.js', 'resume.html', 'assets', 'Jacob_Bacus.jpg', 'SeaTurtleBrazil.jpg']) await cp(new URL('../'+f, import.meta.url), new URL(f, out), { recursive: true });
console.log('Built static site to dist/');
