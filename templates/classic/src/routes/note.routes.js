// routes/note.routes.js
// This file answers one question only: which URL runs which function?
// The functions themselves live in controllers/. Splitting them means every
// route this resource serves fits on one screen, so you can see the whole API
// at a glance without scrolling past the code that implements it.

import { Router } from 'express';
import * as noteController from '../controllers/note.controller.js';

// A Router is a mini-app you can mount somewhere. It exists so this file does
// not need to know its own address.
const router = Router();

// These paths are relative. app.js mounts this router at /api/notes, so '/'
// below really means /api/notes, and '/:id' means /api/notes/:id. Moving the
// whole resource to /v2/notes is then a one-line change in app.js, not five
// edits here.
router.get('/', noteController.list);
router.get('/:id', noteController.getOne);
router.post('/', noteController.create);
router.put('/:id', noteController.update);
router.delete('/:id', noteController.remove);

export default router;
