// app.js
// This file builds your app. It does not start it — server.js does that, and
// it explains why in a few lines. Read this file first.
//
// Read it from top to bottom, because that is exactly how Express reads it.
// When a request arrives, Express goes through the app.use() lines below in
// order, from the top, and stops at the first one that sends an answer back.
//
// So the order of these lines is not decoration. It changes what the app does.

import express from 'express';
import noteRoutes from './routes/note.routes.js';

const app = express();

// ---------------------------------------------------------------------------
// 1. Setup — runs before your routes
// ---------------------------------------------------------------------------

app.use(express.json());
// This line lets you read data that somebody sends you.
//
// When an app sends you a new note, that note travels inside the request, as
// text. This line unpacks that text and puts it on req.body, so your code can
// use it like a normal JavaScript object.
//
// Take this line away and req.body becomes "undefined" — nothing there at all.
// Every POST would look like the sender gave you nothing. This is probably the
// most common "why is my POST not working" question on the whole internet.
//
// It has to sit ABOVE the routes. Express goes top to bottom, and the routes
// are what read req.body, so the unpacking has to happen first.

// ---------------------------------------------------------------------------
// 2. Routes
// ---------------------------------------------------------------------------

app.use('/api/notes', noteRoutes);
// This one line says: every note URL starts with /api/notes.
// The file routes/note.routes.js decides what comes after that.
//
// That is why the addresses in the routes file look so short ('/' and '/:id').
// They are only the ending. The beginning is right here. So if you ever want to
// move all five addresses to /v2/notes, you change this one line.

// ---------------------------------------------------------------------------
// 3. The two catch-alls — these must stay at the bottom
// ---------------------------------------------------------------------------

app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl}` });
});
// This runs only when nothing above it matched the address. That is why it has
// to be below the routes. Move it above them and it would answer EVERY request
// with "not found", including the ones that should have worked.
//
// Express does have its own answer for unknown addresses, but it sends back a
// web page made of HTML. That is a strange thing to send to an app that asked
// for JSON and is about to try reading it as JSON. This keeps every failure the
// same shape: a small JSON object with an `error` inside.

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});
// This is the safety net. If your code breaks somewhere unexpected, this turns
// the crash into a normal answer instead of sending the whole error to whoever
// asked. (That error text would show a stranger the folder names on your
// computer, which you do not want.)
//
// Those four things in the brackets are not there for looks. Express decides
// whether a function is a safety net by COUNTING them. Four means safety net.
// Three means an ordinary step. So if you delete `next` because your editor
// says it is unused, this quietly stops working. No warning. It just never
// runs again.
//
// It goes last because Express only ever passes errors downwards.

export default app;

// ---------------------------------------------------------------------------
// What this project does NOT have, on purpose
// ---------------------------------------------------------------------------
//
// Most Express projects you will see have more folders than this one. They were
// left out on purpose, because a folder you do not understand yet is worse than
// no folder at all.
//
// Here is what is missing, and how to know when you need it.
//
// models/  — a file that owns the data, so nothing else touches the notes list
//            directly. Right now your controller reaches into data/notes.js and
//            searches the list itself.
//            ADD IT WHEN: you find yourself writing the same notes.find(...)
//            line in a third place, or you swap the list for a real database
//            and want to change one file instead of six.
//
// config/  — one place for settings that are different on your computer and on
//            a real server. Right now the port number sits in server.js.
//            ADD IT WHEN: you need a second setting, or you put this project
//            online for the first time.
//
// middleware/  — the two catch-alls above, moved into their own files.
//            ("Middleware" is the usual word for a step that runs before or
//            after your routes, like the two above and express.json.)
//            ADD IT WHEN: one of them grows past a few lines, or you write a
//            third one and this file stops fitting on one screen.
//
// services/  — code that has nothing to do with the web at all: sending an
//            email, taking a payment, calling somebody else's website.
//            ADD IT WHEN: a controller starts doing something that does not
//            involve req or res.
//
// The rule is the same every time: split a file when it actually hurts to work
// in, not because a tutorial had more boxes in its diagram. Every split costs
// you one more file to open and one more jump to follow. It should buy you
// something real.
//
// Want to see all of them already in place? Generate the other layout next to
// this one and compare:
//
//     npx slowstack        # and pick "classic"
