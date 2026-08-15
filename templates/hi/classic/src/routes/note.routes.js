// routes/note.routes.js
// Ye file sirf ek sawaal ka jawab deti hai: kaunsa URL kaunsa function chalayega?
// Function khud controllers/ mein rehte hain. Alag rakhne ka matlab hai ki is
// resource ke saare address ek screen mein dikh jaate hain — poori API ek nazar
// mein, bina us code ko scroll kiye jo use chalata hai.

import { Router } from 'express';
import * as noteController from '../controllers/note.controller.js';

// Router ek chhota app hota hai jise tum kahin bhi laga sakte ho. Isi wajah se
// is file ko apna khud ka pata jaanne ki zaroorat nahi padti.
const router = Router();

// Yahan ke address adhoore hain. app.js is router ko /api/notes pe lagata hai,
// isliye neeche '/' ka matlab hai /api/notes, aur '/:id' ka matlab
// /api/notes/:id. Poore resource ko /v2/notes pe le jaana ho to app.js mein ek
// line badlegi, yahan paanch nahi.
router.get('/', noteController.list);
router.get('/:id', noteController.getOne);
router.post('/', noteController.create);
router.put('/:id', noteController.update);
router.delete('/:id', noteController.remove);

export default router;
