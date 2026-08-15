// app.js
// Ye file tumhara app banati hai. Chalati nahi — wo kaam server.js karta hai,
// aur wahan kuch line mein wajah bhi likhi hai. Pehle ye file padho.
//
// Ise upar se neeche padho, kyunki Express bhi bilkul aise hi padhta hai. Jab
// koi request aati hai, Express neeche wali app.use() lines ko upar se ek-ek
// karke dekhta hai, aur jahan pehla jawab mil jata hai wahin ruk jata hai.
//
// Isliye in lines ka order sajaawat nahi hai. Order badla to app ka kaam badal
// jayega.

import express from 'express';
import noteRoutes from './routes/note.routes.js';

const app = express();

// ---------------------------------------------------------------------------
// 1. Setup — routes se pehle chalne wala hissa
// ---------------------------------------------------------------------------

app.use(express.json());
// Ye line tumhe wo data padhne deti hai jo koi tumhe bhejta hai.
//
// Jab koi app tumhe naya note bhejta hai, wo note request ke andar text ban kar
// aata hai. Ye line usse kholti hai aur req.body mein daal deti hai, taaki tum
// use normal JavaScript object ki tarah use kar sako.
//
// Ye line hata do to req.body "undefined" ho jayega — bilkul khaali, kuch nahi.
// Har POST aisa lagega jaise bhejne wale ne kuch bheja hi nahi. Internet pe
// "mera POST kaam kyun nahi kar raha" ka sabse aam jawab yahi hai.
//
// Ye routes se UPAR honi chahiye. Express upar se neeche chalta hai, aur
// req.body padhne ka kaam routes karte hain — to kholna pehle hona chahiye.

// ---------------------------------------------------------------------------
// 2. Routes
// ---------------------------------------------------------------------------

app.use('/api/notes', noteRoutes);
// Ye ek line kehti hai: har note URL /api/notes se shuru hoga.
// Uske aage kya aayega, wo routes/note.routes.js decide karta hai.
//
// Isiliye routes file ke address itne chhote lagte hain ('/' aur '/:id'). Wo
// sirf ant ka hissa hai. Shuruat yahan hai. Isliye agar kabhi paanchon address
// ko /v2/notes pe le jaana ho, to bas yahi ek line badalni hai.

// ---------------------------------------------------------------------------
// 3. Do catch-all — ye hamesha sabse neeche rehne chahiye
// ---------------------------------------------------------------------------

app.use((req, res) => {
  res.status(404).json({ error: `${req.method} ${req.originalUrl} nahi mila` });
});
// Ye tabhi chalta hai jab upar wale kisi bhi address se match na ho. Isiliye ye
// routes ke NEECHE hona chahiye. Upar rakh do to ye HAR request ka jawab "nahi
// mila" de dega — un requests ka bhi jo sahi thi.
//
// Express ke paas anjaan address ke liye apna jawab hai, par wo ek HTML page
// bhejta hai. Jo app JSON maang raha tha aur JSON ki tarah padhne wala tha,
// uske liye ye ajeeb cheez hai. Isse har failure ek hi shakal mein aati hai:
// chhota sa JSON jisme `error` hota hai.

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Kuch galat ho gaya' });
});
// Ye safety net hai. Agar tumhara code kahin unexpected toot jaye, to ye us
// crash ko ek normal jawab mein badal deta hai — poora error bahar nahi jata.
// (Us error mein tumhare computer ke folder ke naam hote hain, jo kisi ajnabi
// ko dikhne nahi chahiye.)
//
// Bracket ke andar wali chaar cheezein dikhawe ke liye nahi hain. Express GIN
// kar decide karta hai ki function safety net hai ya nahi. Chaar matlab safety
// net. Teen matlab normal step. To agar tumne `next` isliye hata diya ki editor
// keh raha tha "unused", to ye chupchaap kaam karna band kar dega. Koi warning
// nahi. Bas kabhi nahi chalega.
//
// Ye sabse aakhir mein hai kyunki Express error hamesha neeche ki taraf hi
// bhejta hai.

export default app;

// ---------------------------------------------------------------------------
// Is project mein jaan-boojhkar jo NAHI hai
// ---------------------------------------------------------------------------
//
// Zyadatar Express projects mein isse zyada folder hote hain. Yahan wo
// jaan-boojhkar hataye gaye hain, kyunki jo folder tumhe abhi samajh nahi aata,
// usse behtar hai ki wo ho hi na.
//
// Ye raha jo missing hai, aur kaise pata chalega ki ab zaroorat hai.
//
// models/  — wo file jo data ki maalik hoti hai, taaki koi aur seedha notes
//            list ko haath na lagaye. Abhi tumhara controller khud
//            data/notes.js ke andar jaakar list mein dhoondhta hai.
//            KAB ADD KARO: jab wahi notes.find(...) line teesri jagah likhni
//            pade, ya jab list ki jagah asli database lagao aur chaho ki chhe
//            file ki jagah sirf ek badle.
//
// config/  — settings ke liye ek jagah, jo tumhare computer aur asli server pe
//            alag hoti hain. Abhi port number seedha server.js mein pada hai.
//            KAB ADD KARO: jab doosri setting ki zaroorat pade, ya jab pehli
//            baar project ko online daalo.
//
// middleware/  — upar wale dono catch-all, apni alag file mein.
//            ("Middleware" us step ko kehte hain jo tumhare routes se pehle ya
//            baad mein chalta hai — jaise upar wale do, aur express.json.)
//            KAB ADD KARO: jab koi ek kuch line se bada ho jaye, ya teesra
//            likhna pade aur ye file ek screen mein na aaye.
//
// services/  — wo code jiska web se koi lena-dena nahi: email bhejna, payment
//            lena, kisi aur ki website ko call karna.
//            KAB ADD KARO: jab controller aisa kuch karne lage jismein req ya
//            res aata hi na ho.
//
// Niyam har baar wahi hai: file tab todo jab usme kaam karna sach mein takleef
// dene lage, isliye nahi ki kisi tutorial ke diagram mein zyada dabbe the. Har
// split ki keemat hai — ek aur file kholna, ek aur jagah jump karna. Uske badle
// kuch asli milna chahiye.
//
// Ye sab jagah pe lage hue dekhne hain? Doosra layout bana kar bagal mein rakh
// kar compare karo:
//
//     npx slowstack        # aur "classic" chuno
