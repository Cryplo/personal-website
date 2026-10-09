import { readFile, readdir, mkdir, writeFile, rm } from 'node:fs/promises';
import { watch } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(root, 'content/writings');
const output = path.join(root, 'public/writings');
const templateFile = path.join(root, 'templates/writings.html');
const origin = 'https://www.lidylan.dev';
const escape = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const dateFormat = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

async function build() {
  const template = await readFile(templateFile, 'utf8');
  const files = (await readdir(source)).filter(file => file.endsWith('.txt'));
  const posts = await Promise.all(files.map(async file => {
    const slug = path.basename(file, '.txt');
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`${file}: use lowercase words separated by hyphens for the filename.`);
    const text = (await readFile(path.join(source, file), 'utf8')).replace(/\r\n?/g, '\n');
    const match = text.match(/^Title:\s*([^\n]+)\nDate:\s*(\d{4}-\d{2}-\d{2})\s*\n\n([\s\S]+)$/i);
    if (!match) throw new Error(`${file}: expected Title, Date (YYYY-MM-DD), a blank line, then your text.`);
    const [, title, date, content] = match;
    const parsedDate = new Date(`${date}T00:00:00Z`);
    if (Number.isNaN(parsedDate.valueOf()) || parsedDate.toISOString().slice(0, 10) !== date) throw new Error(`${file}: invalid date.`);
    if (!content.trim()) throw new Error(`${file}: add some text below the date.`);
    return { slug, title: title.trim(), date, content: content.trim(), displayDate: dateFormat.format(parsedDate) };
  }));
  posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  const render = values => template.replace(/\{\{(title|description|url|content)\}\}/g, (_, key) => key === 'content' ? values[key] : escape(values[key]));
  const pages = posts.map(post => ({
    slug: post.slug,
    html: render({
      title: `${post.title} — Dylan Li`,
      description: post.content.replace(/\s+/g, ' ').slice(0, 160),
      url: `${origin}/writings/${post.slug}/`,
      content: `    <a class="text-link back-link" href="/writings/">← Writings</a>
    <article>
      <header class="post-header">
        <h1>${escape(post.title)}</h1>
        <time class="post-note" datetime="${post.date}">${post.displayDate}</time>
      </header>
      <hr>
${post.content.split(/\n\s*\n/).map(paragraph => `      <p>${escape(paragraph)}</p>`).join('\n')}
    </article>`,
    }),
  }));
  const listing = render({
    title: 'To write is to think', description: 'Writing by Dylan Li.', url: `${origin}/writings/`,
    content: `    <a class="text-link back-link" href="/">← Home</a>
    <h1>To write is to think</h1>
    <hr>
    <ul class="post-list">
${posts.map(post => `      <li><a class="text-link" href="/writings/${post.slug}/">${escape(post.title)}</a><time class="post-note" datetime="${post.date}">${post.displayDate}</time></li>`).join('\n')}
    </ul>`,
  });
  // This directory contains generated pages only. Recreate it so renaming a
  // content file also removes its former URL without maintaining a slug list.
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  await writeFile(path.join(output, 'index.html'), listing);
  for (const page of pages) {
    await mkdir(path.join(output, page.slug), { recursive: true });
    await writeFile(path.join(output, page.slug, 'index.html'), page.html);
  }
  const routes = ['/', '/writings/', ...posts.map(post => `/writings/${post.slug}/`)];
  await writeFile(path.join(root, 'public/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>${origin}${route}</loc></url>`).join('')}</urlset>\n`);
  console.log(`Built ${posts.length} writings post${posts.length === 1 ? '' : 's'}.`);
}

await build();
if (process.argv.includes('--watch')) {
  let timer;
  let queue = Promise.resolve();
  const rebuild = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      queue = queue.then(build).catch(error => console.error(error.message));
    }, 150);
  };
  watch(source, rebuild);
  watch(templateFile, rebuild);
  console.log('Watching writings content. Save a file, then refresh your browser.');
}
