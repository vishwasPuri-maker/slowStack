// data/notes.js
// Tumhare saare notes yahin rehte hain. Bas ek simple JavaScript array — wahi
// jo tumne pehle bhi sau baar likha hoga.
//
// Asli project mein ye sab ek database mein hota (Postgres, MongoDB, SQLite).
// Hum jaan-boojhkar database use nahi kar rahe. Database ka matlab hai pehle
// software install karo, use chalao, usse connect karo, phir connection ke
// errors theek karo — aur ye sab tumhe backend ke baare mein kuch nahi
// sikhata. Wo sab tumhare asli kaam se pehle ka jhanjhat hai.
//
// Iski ek sachchai jaan lo: ye sab tumhare computer ki memory mein hai, yaani
// server band karte hi mit jayega. Ek note banao, Ctrl+C dabao, dobara chalao —
// tumhara note gayab, aur ye do wapas aa gaye. Ye bug nahi hai. "In memory" ka
// matlab hi yahi hota hai.
//
// Jab tum baad mein asli database lagaoge, to sirf yahi file badlegi. Baaki sab
// waise ka waisa chalta rahega.

export const notes = [
  { id: 1, title: 'Pehla note', body: 'Ye notes memory mein hain, isliye server restart karte hi reset ho jaate hain.' },
  { id: 2, title: 'Doosra note', body: 'Mujhe PUT se badal kar dekho, ya DELETE se hata kar dekho.' },
];

// Alag counter kyun? notes.length + 1 se kaam kyun nahi chalega?
//
// Kyunki id kabhi dobara use nahi honi chahiye. Maan lo tumhare paas 2 notes
// hain aur tum note 2 delete kar dete ho. Ab notes.length 1 hai, to agla naya
// note phir se id 2 le lega — wahi id jo kisi ne shayad bookmark ya link kar
// rakhi ho. Aage ginte jao aur kabhi peeche mat jao, problem hi khatam.
export const counter = { nextId: 3 };
