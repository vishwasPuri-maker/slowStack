// controllers/note.controller.js
// Routes file ne bataya tha ki kaunsa URL kaunsa function chalayega. Ye file
// wahi function hai — jo asli kaam karta hai.
//
// Ye sab routes file mein hi kyun nahi likh diya? Kyunki ye do cheezein
// bilkul alag wajah se badalti hain. URL ka naam tum tab badalte ho jab bahar
// se API ka roop badalna ho. Neeche wala code tab badalta hai jab note ka
// behaviour badalna ho. Alag file mein rakhne ka matlab hai ki ek tarah ka
// badlav doosre ko galti se tod nahi sakta.
//
// Har function yahan teen kaam karta hai — aur ye pattern tumhe har backend
// mein dikhega:
//
//   1. request se padho ki kya maanga gaya hai   (req)
//   2. data ke saath kuch karo                   (notes array)
//   3. jawab bhejo                               (res)

import { notes, counter } from '../data/notes.js';

export function list(req, res) {
  // res.json() array ko JSON text mein badal deta hai aur sahi header bhi laga
  // deta hai. res.send() se bhi kaam chal jata, par baad mein pareshan karta —
  // data bhejna ho to hamesha res.json() use karo.
  res.json(notes);
}

export function getOne(req, res) {
  // Poore project ka sabse bada beginner-trap yahi hai. Dhyan se padho.
  //
  // URL mein sab kuch TEXT hota hai. /api/notes/1 pe request aaye to tumhe
  // string "1" milti hai, number 1 nahi. Hamari id number hai, aur JavaScript
  // mein "1" === 1 hota hai FALSE. Neeche Number() na lagao to ye find() kabhi
  // kisi se match hi nahi karega, har lookup 404 dega — aur koi error nahi
  // aayega jo bataye ki galti kahan hai.
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);

  if (!note) {
    // 404 ka matlab hai "maine samajh liya, par wo cheez hai hi nahi". Yahan
    // `return` zaroori hai: uske bina neeche wala code bhi chal jayega aur
    // Express shikayat karega ki ek request ke do jawab bhej diye.
    return res.status(404).json({ error: 'Note nahi mila' });
  }

  res.json(note);
}

export function create(req, res) {
  // req.body sirf isliye maujood hai kyunki app.js ne routes se pehle
  // express.json() chalaya tha. Wo line hata do, ye undefined ho jayega.
  const { title, body } = req.body;

  // Kabhi maan kar mat chalo ki request mein wahi aaya hoga jo tum soch rahe
  // ho. Tumhari API pe koi bhi kuch bhi bhej sakta hai — typo, app ka purana
  // version, ya koi jaan-boojhkar cheda-chaadi kar raha ho. Ye check na ho to
  // bina title ka note ban jayega, aur pata bahut baad mein chalega jab use
  // dikhane ki koshish hogi.
  if (!title) {
    return res.status(400).json({ error: 'title zaroori hai' });
  }

  const note = { id: counter.nextId, title, body };

  counter.nextId += 1;
  notes.push(note);

  // 201, 200 nahi. Dono ka matlab success hai, par 201 khaas taur pe kehta hai
  // "aur kuch naya ban bhi gaya hai". Client isi farak se decide karta hai ki
  // list refresh karni hai ya nahi.
  res.status(201).json(note);
}

export function update(req, res) {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return res.status(404).json({ error: 'Note nahi mila' });
  }

  const { title, body } = req.body;

  // Sirf wahi badlo jo sach mein bheja gaya hai. Bina check ke dono assign kar
  // dete, to sirf title update karne wali request chupchaap body mita deti —
  // wo wala bug jo hafte baad dikhta hai aur samajh nahi aata kahan se aaya.
  if (title !== undefined) note.title = title;
  if (body !== undefined) note.body = body;

  res.json(note);
}

export function remove(req, res) {
  const id = Number(req.params.id);
  const index = notes.findIndex((n) => n.id === id);

  // Kuch na mile to findIndex -1 deta hai. Ye check hata do to splice(-1, 1)
  // chal jayega, jo AAKHRI note ko uda dega — yaani jo note hai hi nahi use
  // delete karne se ek asli note mit jayega.
  if (index === -1) {
    return res.status(404).json({ error: 'Note nahi mila' });
  }

  notes.splice(index, 1);

  // 204 ka matlab hai "kaam ho gaya, aur jaan-boojhkar kuch bhejne ko nahi
  // hai". Note delete ho chuka hai, to wapas bhejne ko bacha hi kya.
  res.status(204).end();
}
