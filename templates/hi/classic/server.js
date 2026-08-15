// server.js
// Poore project mein sirf yahi ek file port kholti hai.
//
// app.js poora tayyar app banata hai par listen() kabhi nahi bulata. Ek line ke
// liye alag file banana bewakoofi lagta hai — theek pehle test tak. Test app.js
// ko import karke usse request bhej sakta hai, bina port 3000 ghere, bina doosre
// test se ladhe, aur bina ye yaad rakhe ki baad mein server band karna hai.
//
// Isi wajah se serverless deploy bhi chalta hai — use app chahiye, listener
// nahi.

import app from './src/app.js';
import { PORT } from './src/config/env.js';

app.listen(PORT, () => {
  console.log(`Chal raha hai: http://localhost:${PORT}`);
  console.log(`Try karo:  curl http://localhost:${PORT}/api/notes`);
});
