// middleware/error.middleware.js
// Wo ek jagah jahan unexpected crash ek normal response ban jata hai. Iske bina
// Express poora stack trace bhej deta hai, jo kisi bhi banda jo tumhari API tak
// pahunch sakta hai, use tumhare computer ke folder ka naksha de deta hai.
//
// Chaar arguments style ki baat nahi hai. Express GIN kar decide karta hai ki
// function error handler hai ya nahi: chaar matlab error handler, teen matlab
// normal middleware. Unused `next` ko hata do aur ye file chupchaap kaam karna
// band kar degi — koi warning nahi, bas dobara kabhi nahi chalegi.

export function errorHandler(err, req, res, next) {
  // Details tumhare terminal mein rehti hain, jahan tum debug kar sako...
  console.error(err);

  // ...aur client ko kuch safe aur predictable milta hai.
  res.status(err.status || 500).json({ error: 'Kuch galat ho gaya' });
}
