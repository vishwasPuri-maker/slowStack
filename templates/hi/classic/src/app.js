// app.js
// App ko jodta hai: pehle middleware, phir routes, phir do catch-all. Ye
// jaan-boojhkar kabhi port nahi kholta — wajah server.js mein likhi hai.
//
// Neeche wali app.use() lines ka order hi is file ka poora point hai. Express
// inhe upar se neeche chalata hai, aur request wahin ruk jaati hai jahan pehla
// jawab mil jaye. Koi bhi line hilane se behaviour badal jayega.

import express from 'express';
import noteRoutes from './routes/note.routes.js';
import { notFound } from './middleware/notFound.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(express.json());
// Is line ke bina POST aur PUT pe req.body undefined hota hai — Express JSON
// body tab tak nahi padhta jab tak tum bolo na. Ye routes se PEHLE honi
// chahiye, kyunki req.body padhne ka kaam routes karte hain.

app.use('/api/notes', noteRoutes);
// Ek line paanchon note endpoints ko is prefix pe laga deti hai. Poore resource
// ko hilana ho to yahi line badalti hai, routes file nahi.

app.use(notFound);
// Ye tabhi pahunchta hai jab upar kuch match na ho, isliye routes ke baad hona
// chahiye. Unse upar rakh do to ye har request ka jawab 404 se de dega.

app.use(errorHandler);
// Hamesha sabse aakhir. Express error aage ki taraf bhejta hai, isliye iske
// baad register kiya gaya kuch bhi unhe kabhi dekh nahi payega.

export default app;
