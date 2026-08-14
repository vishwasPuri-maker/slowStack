import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolved from this file, never from process.cwd(). cwd() is wherever the user
// happens to be standing; the templates ship inside this package.
const packageRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const templatesDir = path.join(packageRoot, 'templates');

export function scaffold({ name, structure }) {
  const source = path.join(templatesDir, structure);
  const target = path.join(process.cwd(), name);

  if (fs.existsSync(target)) {
    throw new Error(`Folder "${name}" already exists — pick another name, or delete it first.`);
  }

  fs.cpSync(source, target, { recursive: true });
  restoreDotfiles(target);
  writeProjectName(target, name);

  return target;
}

// npm strips .gitignore out of published tarballs, so templates store it
// undotted and we put the dot back on the way out.
function restoreDotfiles(target) {
  const undotted = path.join(target, 'gitignore');

  if (fs.existsSync(undotted)) {
    fs.renameSync(undotted, path.join(target, '.gitignore'));
  }
}

function writeProjectName(target, name) {
  const pkgPath = path.join(target, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  pkg.name = name;
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
}
