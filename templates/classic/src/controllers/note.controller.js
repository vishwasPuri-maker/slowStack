// controllers/note.controller.js
// Route files decide which URL runs which function. This file decides what
// actually happens when one runs. Keeping the two apart means changing a URL
// never risks touching working logic — and it means you can read this file
// without caring what the paths look like.
//
// Each function here does the same three things: read the request, ask the
// model to do the work, choose a status code. It never touches the notes array
// itself; that belongs to the model.

import * as Note from '../models/note.model.js';

export function list(req, res) {
  res.json(Note.findAll());
}

export function getOne(req, res) {
  // Everything inside a URL arrives as text: "/api/notes/1" gives you the
  // string "1", never the number 1. Our ids are numbers, and "1" === 1 is
  // false, so without Number() every single lookup would quietly miss.
  const note = Note.findById(Number(req.params.id));

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  res.json(note);
}

export function create(req, res) {
  const { title, body } = req.body;

  // Never trust that the client sent what you expect. Without this check a
  // request with no title would happily create a nameless note, and you would
  // only find out much later when something tried to display it.
  if (!title) {
    return res.status(400).json({ error: 'title is required' });
  }

  // 201, not 200: the request succeeded *and* something new exists now. Clients
  // rely on that difference to know whether to refresh a list.
  res.status(201).json(Note.create({ title, body }));
}

export function update(req, res) {
  const note = Note.update(Number(req.params.id), req.body);

  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  res.json(note);
}

export function remove(req, res) {
  const deleted = Note.remove(Number(req.params.id));

  if (!deleted) {
    return res.status(404).json({ error: 'Note not found' });
  }

  // 204 means "it worked, and there is deliberately nothing to send back".
  // The note is gone, so there is no body left to return.
  res.status(204).end();
}
