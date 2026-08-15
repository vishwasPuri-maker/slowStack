// data/notes.js
// This is where your notes live. All of them. That's it — a plain JavaScript
// array, the same kind you have written a hundred times.
//
// A real application would keep this in a database (Postgres, MongoDB, SQLite).
// We are not using one on purpose. A database means installing software,
// starting it, connecting to it and debugging the connection before you have
// written a single line of your actual app — and none of that teaches you
// anything about how a backend is put together.
//
// The honest trade-off: everything here is stored in your computer's memory,
// which means it is wiped the moment you stop the server. Add a note, press
// Ctrl+C, start again — your note is gone and these two are back. That is not a
// bug. It is what "in memory" means.
//
// When you do add a real database later, this is the only file that changes
// shape. Everything else keeps working the same way.

export const notes = [
  { id: 1, title: 'First note', body: 'These notes are stored in memory, so they reset when the server restarts.' },
  { id: 2, title: 'Second note', body: 'Try changing me with PUT, or removing me with DELETE.' },
];

// Why a separate counter instead of just using notes.length + 1?
//
// Because ids must never be reused. Say you have 2 notes and you delete note 2.
// Now notes.length is 1, so the next note you create would get id 2 — an id
// somebody may already have bookmarked or linked to. Counting forward and never
// going back avoids that entirely.
export const counter = { nextId: 3 };
