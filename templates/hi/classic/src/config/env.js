// config/env.js
// Har wo value jo tumhare laptop aur asli server pe alag hoti hai, ek jagah —
// aur har ek ka default pehle se kaam karta hua. App mein aur koi jagah seedha
// process.env nahi padhti, isliye jab koi setting ka naam badle to sirf ek hi
// file badalni hoti hai, poore project mein dhoondhna nahi padta.
//
// Inhi defaults ki wajah se ye project `npm install` ke turant baad chal jata
// hai, bina pehle koi .env file banaye.

export const PORT = process.env.PORT || 3000;
