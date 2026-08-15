// controllers/note.controller.js
// Routes file batati hai ki kaunsa URL kaunsa function chalayega. Ye file
// batati hai ki chalne pe hota kya hai. Dono ko alag rakhne ka matlab hai ki
// URL badalne se kaam karta hua logic kabhi khatre mein nahi aata — aur ye file
// bina URL ki chinta kiye padhi ja sakti hai.
//
// Yahan har function wahi teen kaam karta hai: request padho, model se kaam
// karwao, status code chuno. Ye notes array ko khud kabhi haath nahi lagata —
// wo model ka kaam hai.

import * as Note from '../models/note.model.js';

export function list(req, res) {
  res.json(Note.findAll());
}

export function getOne(req, res) {
  // URL ke andar sab kuch text hota hai: "/api/notes/1" se tumhe string "1"
  // milti hai, number 1 nahi. Hamari id number hai, aur "1" === 1 hota hai
  // false — to Number() ke bina har lookup chupchaap miss ho jayega.
  const note = Note.findById(Number(req.params.id));

  if (!note) {
    return res.status(404).json({ error: 'Note nahi mila' });
  }

  res.json(note);
}

export function create(req, res) {
  const { title, body } = req.body;

  // Kabhi maan kar mat chalo ki client ne wahi bheja hoga jo tum soch rahe ho.
  // Is check ke bina bina-naam ka note khushi-khushi ban jayega, aur pata bahut
  // baad mein chalega jab use dikhane ki koshish hogi.
  if (!title) {
    return res.status(400).json({ error: 'title zaroori hai' });
  }

  // 201, 200 nahi: request safal bhi hui *aur* kuch naya ban bhi gaya. Client
  // isi farak se decide karta hai ki list refresh karni hai ya nahi.
  res.status(201).json(Note.create({ title, body }));
}

export function update(req, res) {
  const note = Note.update(Number(req.params.id), req.body);

  if (!note) {
    return res.status(404).json({ error: 'Note nahi mila' });
  }

  res.json(note);
}

export function remove(req, res) {
  const deleted = Note.remove(Number(req.params.id));

  if (!deleted) {
    return res.status(404).json({ error: 'Note nahi mila' });
  }

  // 204 ka matlab hai "kaam ho gaya, aur jaan-boojhkar bhejne ko kuch nahi hai".
  // Note ja chuka hai, to wapas bhejne ko bacha hi kya.
  res.status(204).end();
}
