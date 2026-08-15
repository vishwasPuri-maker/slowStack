// app.js
// This file builds your application. It does not start it — server.js does
// that, and it explains why in six lines. Read this one first.
//
// Read it top to bottom, because that is exactly how Express reads it. For
// every request that arrives, Express walks these app.use() calls in order and
// stops at the first one that sends a response. The order below is not styling.
// It is behaviour. Move a line and the app changes what it does.

import express from 'express';
import noteRoutes from './routes/note.routes.js';

const app = express();

// ---------------------------------------------------------------------------
// 1. Middleware — runs before your routes
// ---------------------------------------------------------------------------

app.use(express.json());
// "Middleware" is a scarier word than it needs to be. It means: a function that
// gets to look at the request before your route does.
//
// This particular one reads the JSON out of the request body and puts it on
// req.body for you. Without it req.body is undefined — not empty, undefined —
// so every POST and PUT looks like the client sent nothing at all. This is the
// single most common "why is my POST not working" question on the internet.
//
// It must sit ABOVE the routes. Express runs these lines top to bottom, and the
// routes are what read req.body, so the parsing has to have happened already.

// ---------------------------------------------------------------------------
// 2. Routes
// ---------------------------------------------------------------------------

app.use('/api/notes', noteRoutes);
// This one line decides that every note URL begins with /api/notes.
// routes/note.routes.js decides everything after that prefix.
//
// That is why the paths in the routes file look bare ('/' and '/:id'). Change
// '/api/notes' to '/v2/notes' right here and all five endpoints move together.

// ---------------------------------------------------------------------------
// 3. The catch-alls — these two must stay last
// ---------------------------------------------------------------------------

app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl}` });
});
// This runs only when nothing above it matched, which is why it has to be below
// the routes. Put it above them and it would answer every request with a 404,
// including the valid ones.
//
// Express does have a built-in response for unknown URLs, but it is an HTML
// error page — an odd thing to hand to a client that asked for JSON and is
// about to call JSON.parse on your reply. This keeps every failure the same
// shape: a JSON object with an `error` key.

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});
// The safety net: when your code throws somewhere unexpected, this turns the
// crash into a normal response instead of a stack trace sent to the client.
// (A stack trace tells a stranger your folder names and file paths.)
//
// Those four arguments are not decoration. Express identifies an error handler
// by COUNTING them: four means error handler, three means ordinary middleware.
// Delete the unused `next` and this stops catching anything — silently. No
// warning, it simply never runs again.
//
// It goes last because Express only hands errors forward, never backward.

export default app;

// ---------------------------------------------------------------------------
// What this project deliberately does NOT have
// ---------------------------------------------------------------------------
//
// Most Express projects you will meet have more folders than this one. They
// were left out on purpose, because a folder you do not understand yet is worse
// than no folder at all. Here is what is missing, and the moment to add it.
//
// models/  — a file that owns the data, so nothing else touches the array
//            directly. Right now the controller reaches into data/notes.js
//            itself. Add this when you catch yourself copy-pasting the same
//            notes.find(...) into a third function, or when you swap the array
//            for a real database and want one file to change instead of six.
//
// config/  — one place for settings that differ between your laptop and a real
//            server. Right now the port lives in server.js as a plain number.
//            Add this the first time you need a second setting, or the first
//            time you deploy anywhere.
//
// middleware/  — the two functions above, moved into their own files. Add this
//            when a handler grows past a few lines, or when you write a second
//            one (logging, authentication) and app.js starts getting long.
//
// services/  — logic that is not about HTTP at all: sending an email, charging
//            a card, talking to another API. Add this when a controller starts
//            doing something that has nothing to do with req and res.
//
// The pattern is the same every time: split when the pain is real, not because
// a tutorial said to. Every split costs you a file to open and a jump to
// follow. It should buy you something.
//
// When you want to see what all of them look like in place, generate the other
// structure alongside this one and compare:
//
//     npx slowstack        # and pick "classic"
