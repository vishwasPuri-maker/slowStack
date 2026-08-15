import { input, select } from '@inquirer/prompts';
import { structures } from './structures.js';
import { languages } from './languages.js';
import { scaffold } from './scaffold.js';

export async function run() {
  const name = await input({
    message: 'Project name:',
    default: 'my-api',
  });

  const structure = await select({
    message: 'Structure:',
    choices: structures,
  });

  const language = await select({
    message: 'Explanations in:',
    choices: languages,
  });

  scaffold({ name, structure, language });

  console.log(`\nCreated ${name}/ using the ${structure} structure.`);
  console.log('\nNext:\n');
  console.log(`  cd ${name}`);
  console.log('  npm install');
  console.log('  npm run dev\n');
}
