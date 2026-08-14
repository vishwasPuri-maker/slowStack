// middleware/error.middleware.js
// The one place an unexpected crash turns into a response. Without it Express
// replies with the full stack trace, which hands anyone who can reach your API
// the folder layout of the machine it runs on.
//
// The four arguments are not a style choice. Express decides whether a function
// is an error handler by counting them: four means error handler, three means
// ordinary middleware. Delete the unused `next` and this file silently stops
// catching anything — no warning, it just never runs again.

export function errorHandler(err, req, res, next) {
  // The details stay in your terminal where you can debug them...
  console.error(err);

  // ...while the client gets something safe and predictable.
  res.status(err.status || 500).json({ error: 'Something went wrong' });
}
