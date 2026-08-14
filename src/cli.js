import { input, select } from '@inquirer/prompts';
import { structures } from './structures.js';

export async function run() {
  const name = await input({
    message: 'Project name:',
    default: 'my-api',
  });

  const structure = await select({
    message: 'Structure:',
    choices: structures,
  });

  console.log({ name, structure });
}
