// server.js
// Is poore project mein sirf yahi ek file port kholti hai. Bas yahi iska kaam
// hai.
//
// Ye lagbhag khaali lagti hai, aur teen line ke liye alag file banana bewakoofi
// lagti hai — jab tak tum pehla test nahi likhte. Test app.js ko import karke
// usse request bhej sakta hai aur jawab check kar sakta hai, bina port 3000
// ghere. Na baad mein port khaali karne ka jhanjhat, na do test ek hi number pe
// ladte hain. app.js tumhe chalta hua app deta hai; ye file decide karti hai ki
// wo kahan sune.

import app from './src/app.js';

// process.env.PORT wo value hai jo tumhara app chalane wala computer tumhe de
// sakta hai. Hosting wali jagah ise khud set karti hain aur ummeed karti hain
// ki tum wahi use karoge. Tumhare laptop pe koi set nahi karta, isliye || wala
// hissa 3000 pe aa jata hai aur sab chal jata hai. Isi default ki wajah se is
// project ko chalane ke liye pehle .env file banane ki zaroorat nahi.
//
// Bade project mein ye line config/env.js mein hoti, baaki saari settings ke
// saath. Sirf ek setting ke liye poora folder banana faayde se zyada mehnat hai.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Chal raha hai: http://localhost:${PORT}`);
  console.log(`Try karo:  curl http://localhost:${PORT}/api/notes`);
  console.log('\nBackend naya hai? LEARN.md kholo — usme likha hai ki ye files alag kyun hain.');
});
