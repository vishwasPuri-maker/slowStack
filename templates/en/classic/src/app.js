// app.js
// Assembles the application: middleware first, then routes, then the two
// catch-alls. It deliberately never opens a port — see server.js for why.
//
// The order of the app.use() calls below is the whole point of this file.
// Express runs them top to bottom, and a request stops at the first one that
// sends a response. Moving any of these lines changes behaviour.

import express from 'express';
import noteRoutes from './routes/note.routes.js';
import { notFound } from './middleware/notFound.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(express.json());
// Without this line req.body is undefined on POST and PUT — Express does not
// read JSON bodies unless you ask it to. It has to come BEFORE the routes,
// because the routes are what read req.body.

app.use('/api/notes', noteRoutes);
// One line mounts all five note endpoints under this prefix. This is the line
// you edit to move the whole resource, not the route file.

app.use(notFound);
// Only reached when nothing above matched, so it must sit after the routes.
// Put it above them and it would answer every request with a 404.

app.use(errorHandler);
// Always last. Express passes errors forward to the next error handler, so
// anything registered after this one would never see them.

export default app;
