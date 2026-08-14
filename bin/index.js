#!/usr/bin/env node
import { run } from '../src/cli.js';

run().catch((err) => {
  // Ctrl+C during a prompt. Expected user action, not a crash.
  if (err.name === 'ExitPromptError') process.exit(0);

  console.error(err.message);
  process.exit(1);
});
