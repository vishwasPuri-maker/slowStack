// server.js
// The only file in the project that opens a port.
//
// app.js builds a fully configured app but never calls listen(). Splitting one
// line into its own file looks pointless right up until you write your first
// test: a test can import app.js and fire requests at it without occupying port
// 3000, without racing another test doing the same, and without you having to
// remember to shut a server down afterwards.
//
// Same reason a serverless deploy works — it wants the app, not a listener.

import app from './src/app.js';
import { PORT } from './src/config/env.js';

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
  console.log(`Try it:  curl http://localhost:${PORT}/api/notes`);
});
