// models/note.model.js
// Two jobs: it defines what a note *is*, and it is the only place notes are
// actually kept. Controllers never touch the array below directly — they call
// the functions here. That is what makes replacing this array with a real
// database a one-file change later, instead of a hunt through every route.

// A real project would keep these rows in a database. An array is enough to
// learn the shape of a backend, and it means this project runs with no Docker,
// no connection string and no signup. The trade-off is real though: everything
// here disappears when you stop the server. Restart it and you are back to
// these two notes.
let notes = [
  { id: 1, title: 'First note', body: 'Notes live in memory until you add a database.' },
  { id: 2, title: 'Second note', body: 'Change me with PUT, remove me with DELETE.' },
];

// Ids must never be reused, which is why this counts forward instead of using
// notes.length. Delete note 2 and the length drops to 1 — the next note created
// would take id 2 again and collide with a note somebody already bookmarked.
let nextId = 3;

export function findAll() {
  return notes;
}

export function findById(id) {
  return notes.find((note) => note.id === id);
}

export function create({ title, body }) {
  const note = { id: nextId, title, body };

  nextId += 1;
  notes.push(note);

  return note;
}

export function update(id, { title, body }) {
  const note = findById(id);

  if (!note) {
    return undefined;
  }

  // Only overwrite what the request actually sent. Assigning both unconditionally
  // would mean a PUT carrying just a title silently wipes the body.
  if (title !== undefined) note.title = title;
  if (body !== undefined) note.body = body;

  return note;
}

export function remove(id) {
  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return false;
  }

  notes.splice(index, 1);

  return true;
}
