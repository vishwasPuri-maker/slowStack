// server.js
// The only file in this project that opens a port. That is its whole job.
//
// It looks almost empty, and splitting three lines into their own file seems
// silly — until the first time you write a test. A test can import app.js,
// fire requests at it and check the answers, all without ever occupying port
// 3000. No port to free up afterwards, no two tests fighting over the same
// number. app.js hands you a working app; this file decides where it listens.

import app from './src/app.js';

// process.env.PORT is a value the computer running your app can hand you.
// Hosting platforms set it themselves and expect you to use it. On your laptop
// nobody sets it, so the || falls through to 3000 and everything just works.
// That default is why this project runs with no .env file to create first.
//
// In a bigger project this line would live in config/env.js, together with
// every other setting. With exactly one setting, a whole folder for it would be
// more work than it saves.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
  console.log(`Try it:  curl http://localhost:${PORT}/api/notes`);
  console.log('\nNew to backends? Open LEARN.md — it explains why these files are split up.');
});
