// routes/note.routes.js
// Ye file sirf ek sawaal ka jawab deti hai: kaunsa URL kaunsa function chalayega?
//
// Ismein ek line bhi nahi hai ki note hota kya hai, save kaise hota hai, ya id
// na milne pe kya karna hai. Wo sab bagal wali file mein hai —
// controllers/note.controller.js.
//
// Yahi is project ka pehla asli sabak hai. Is file ko dekho aur 10 second mein
// tumhe poore backend ka naksha pata chal jayega — paanch URL, paanch function.
// Agar saara code bhi yahin hota, to ye paanch line do sau line ke beech dab
// jaati, aur "is app mein kya-kya hai?" poochne pe scroll karna padta.

import { Router } from 'express';
import * as noteController from '../controllers/note.controller.js';

// Router ek chhota Express app hota hai jise tum kahin bhi laga sakte ho. Isse
// fayda ye hai ki is file ko apna khud ka pata pata hi nahi hota — wo app.js
// decide karta hai.
const router = Router();

// Pehli nazar mein ye adhoore lagenge. /api/notes kahan gaya?
//
// Wo app.js mein hai, jahan ye file '/api/notes' pe lagayi gayi hai. To yahan
// '/' ka matlab hai /api/notes, aur '/:id' ka matlab hai /api/notes/:id.
// Iska fayda: paanchon address ko /v2/notes pe le jaana ho to app.js mein ek
// badlav, yahan paanch nahi.
//
// ':id' ek jagah hai jo bharti hai. /api/notes/7 pe request aaye to wo '/:id'
// se match hoti hai, aur controller usse req.params.id se padhta hai.
router.get('/', noteController.list);
router.get('/:id', noteController.getOne);
router.post('/', noteController.create);
router.put('/:id', noteController.update);
router.delete('/:id', noteController.remove);

export default router;
