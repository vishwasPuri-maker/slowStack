// middleware/notFound.middleware.js
// Ye tabhi chalta hai jab upar wale kisi bhi route se match na ho. Express ke
// paas anjaan URL ke liye apna jawab pehle se hai, par wo HTML ka error page
// hota hai — jo us client ko dena ajeeb hai jisne JSON maanga tha aur ab uspe
// JSON.parse chalane wala hai.
//
// Isse galat URL bhi bilkul usi shakal mein fail hota hai jaise app ki baaki
// har error: ek JSON object jisme `error` hota hai.

export function notFound(req, res) {
  res.status(404).json({ error: `${req.method} ${req.originalUrl} nahi mila` });
}
