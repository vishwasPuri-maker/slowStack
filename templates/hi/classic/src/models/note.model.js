// models/note.model.js
// Do kaam: ye batati hai ki note hota *kya* hai, aur yahi ek jagah hai jahan
// notes sach mein rakhe hain. Controllers neeche wale array ko seedha kabhi
// haath nahi lagate — wo yahan ke functions bulate hain. Isi wajah se baad mein
// is array ki jagah asli database lagana sirf ek file ka badlav hai, na ki har
// route mein jaakar dhoondhna.

// Asli project mein ye sab ek database mein hota. Backend ka dhaancha samajhne
// ke liye array kaafi hai, aur iska matlab hai ye project bina Docker, bina
// connection string, bina kisi signup ke chal jata hai. Par sachchai ye hai:
// yahan ka sab kuch server band karte hi mit jata hai. Dobara chalao to wapas
// yahi do notes milenge.
let notes = [
  { id: 1, title: 'Pehla note', body: 'Notes memory mein hain, jab tak database nahi lagta.' },
  { id: 2, title: 'Doosra note', body: 'PUT se badlo, DELETE se hatao.' },
];

// Id kabhi dobara use nahi honi chahiye, isliye ye aage ginta hai, notes.length
// use nahi karta. Note 2 delete karo aur length 1 ho jayegi — agla banaya gaya
// note phir se id 2 le lega, wahi id jo kisi ne bookmark kar rakhi ho.
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

  // Sirf wahi badlo jo request mein sach mein aaya hai. Bina check ke dono
  // assign kar dete to sirf title bhejne wali PUT chupchaap body mita deti.
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
