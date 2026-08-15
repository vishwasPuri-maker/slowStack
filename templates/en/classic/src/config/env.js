// config/env.js
// Every value that differs between your laptop and a real server, collected in
// one place with a default that already works. Nothing else in the app reads
// process.env directly, so when a setting gets renamed there is exactly one
// file to change instead of a search across the project.
//
// Those defaults are also why this project runs straight after `npm install`
// with no .env file to create first.

export const PORT = process.env.PORT || 3000;
