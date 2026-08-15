// routes/note.routes.js
// This file answers exactly one question: which URL runs which function?
//
// It does not contain a single line about what a note is, how one gets saved,
// or what happens when an id doesn't exist. All of that lives next door in
// controllers/note.controller.js.
//
// That split is the first real lesson of this project. Read this file and you
// know the entire shape of the API in ten seconds — five URLs, five functions.
// If the logic were mixed in here, those five lines would be buried in two
// hundred, and answering "what endpoints does this app have?" would mean
// scrolling and squinting.

import { Router } from 'express';
import * as noteController from '../controllers/note.controller.js';

// A Router is a mini Express app you can plug in somewhere. Using one means
// this file never has to know its own address — app.js decides that.
const router = Router();

// These paths look wrong at first glance. Where is /api/notes?
//
// It is in app.js, which plugs this file in at '/api/notes'. So '/' down here
// really means /api/notes, and '/:id' really means /api/notes/:id. What that
// buys you: moving all five addresses to /v2/notes is one change in app.js,
// instead of five changes here.
//
// The ':id' part is a placeholder. A request to /api/notes/7 matches '/:id',
// and the controller reads that 7 as req.params.id.
router.get('/', noteController.list);
router.get('/:id', noteController.getOne);
router.post('/', noteController.create);
router.put('/:id', noteController.update);
router.delete('/:id', noteController.remove);

export default router;
