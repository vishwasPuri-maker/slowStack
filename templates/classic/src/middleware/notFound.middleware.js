// middleware/notFound.middleware.js
// Runs only when no route above it matched the request. Express already has a
// built-in response for an unknown URL, but it is an HTML error page — which is
// a confusing thing to hand to a client that asked for JSON and is about to
// call JSON.parse on it.
//
// This makes a wrong URL fail in exactly the same shape as every other error in
// the app: a JSON object with an `error` key.

export function notFound(req, res) {
  res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl}` });
}
