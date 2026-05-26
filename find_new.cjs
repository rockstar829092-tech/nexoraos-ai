const fs = require('fs');
const files = fs.readdirSync('dist/assets').filter(f => f.endsWith('.js'));
const m = new Map();
files.forEach(f => {
  const content = fs.readFileSync('dist/assets/' + f, 'utf8');
  const regex = /new ([A-Z][a-zA-Z0-9_]+)\(/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    m.set(match[1], (m.get(match[1]) || 0) + 1);
  }
});
const sorted = Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
console.log(sorted.slice(0, 50).map(x => x[0] + ': ' + x[1]).join('\n'));
