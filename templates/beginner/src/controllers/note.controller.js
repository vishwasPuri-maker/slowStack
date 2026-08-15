// controllers/note.controller.js
// The routes file decided which URL runs which function. This file is those
// functions — the part that actually does the work.
//
// Why is this not just written inside the routes file? Because these two things
// change for completely different reasons. You rename a URL because of how the
// API looks from outside. You change the code below because of how notes
// behave. Keeping them in separate files means one kind of change can never
// break the other by accident.
//
// Every function here has the same three beats, and once you see the pattern
// you will see it in every backend you ever read:
//
//   1. read what the request is asking for   (req)
//   2. do something with the data            (the notes array)
//   3. send an answer back                   (res)

import { notes, counter } from '../data/notes.js';

export function list(req, res) {
  // res.json() converts the array to JSON text and sets the Content-Type
  // header. Using res.send() with an object would mostly work and then surprise
  // you later, so reach for res.json() with data.
  res.json(notes);
}

export function getOne(req, res) {
  // Here is the single most common beginner trap in this whole project.
  //
  // Everything in a URL is text. A request to /api/notes/1 gives you the STRING
  // "1", never the number 1. Our ids are numbers, and in JavaScript "1" === 1
  // is false. Without Number() below, this find() would never match anything
  // and every single lookup would return a 404 — with no error to explain why.
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);

  if (!note) {
    // 404 means "I understood you, that thing does not exist". Returning early
    // matters: without `return`, the code below would run too and Express would
    // complain that you sent two responses to one request.
    return res.status(404).json({ error: 'Note not found' });
  }

  res.json(note);
}

export function create(req, res) {
  // req.body only exists because app.js called express.json() before the routes
  // ran. Comment that line out and this is undefined.
  const { title, body } = req.body;

  // Never assume the request contains what you expect. Anyone can send anything
  // to your API — a typo, an old version of an app, or someone poking at it on
  // purpose. Without this check you would happily store a note with no title
  // and only discover it much later when something tried to display it.
  if (!title) {
    return res.status(400).json({ error: 'title is required' });
  }

  const note = { id: counter.nextId, title, body };

  counter.nextId += 1;
  notes.push(note);

  // 201, not 200. Both mean success, but 201 specifically means "and something
  // new exists now". Clients use that difference to decide whether to refresh.
  res.status(201).json(note);
}

export function update(req, res) {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const { title, body } = req.body;

  // Only overwrite what was actually sent. If you assigned both without
  // checking, a request that updates just the title would silently erase the
  // body — the kind of bug you notice a week later with no idea what caused it.
  if (title !== undefined) note.title = title;
  if (body !== undefined) note.body = body;

  res.json(note);
}

export function remove(req, res) {
  const id = Number(req.params.id);
  const index = notes.findIndex((n) => n.id === id);

  // findIndex returns -1 when nothing matched. Skipping this check would make
  // splice(-1, 1) delete the LAST note instead — deleting a note that does not
  // exist would destroy a real one.
  if (index === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  notes.splice(index, 1);

  // 204 means "it worked, and there is deliberately nothing to send back".
  // The note is gone, so there is nothing left to return.
  res.status(204).end();
}
