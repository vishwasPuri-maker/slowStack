# Ye itni saari files mein kyun bata hua hai?

Tumne abhi ek project banaya jisme ek chhote se kaam ke liye paanch files hain.
Ek list mein notes rakhne ke liye ye kaafi zyada lagta hoga.

Yahi uska jawab hai. Ye manual nahi, kahani hai — ek baar upar se neeche, order
mein padh lo, aur folders random lagne band ho jayenge.

Pehle se kya aana chahiye: tumne `for` loop likha hai. Bas itna hi.

---

## 1. Sach mein ye ek hi file se shuru hota hai

Ye ek poora, chalta hua backend hai. Nakli nahi. Ye sach mein chalta hai.

```js
import express from 'express';

const app = express();
app.use(express.json());

const notes = [{ id: 1, title: 'Pehla note' }];

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const note = { id: notes.length + 1, title: req.body.title };
  notes.push(note);
  res.status(201).json(note);
});

app.listen(3000);
```

Solah line. Do chalte hue address. Ise `server.js` mein save karke chala do —
tumhare paas asli backend hai jisse koi asli app baat kar sakta hai.

**Ye "galat" tareeka nahi hai.** Solah line ke liye yahi sahi tareeka hai. Jo
tumse kahe ki isse bhi tod do, usne soche bina kaha hai.

To phir tumhara project alag kyun dikhta hai? Kyunki iske baad kya hota hai.

---

## 2. Ye kahan se bikharna shuru hota hai

Kuch dramatic nahi hota. File bas badi hoti jaati hai.

Tum ek note nikalne ka tareeka add karte ho. Phir update. Phir delete. Phir
users chahiye, to paanch aur. Phir notes pe comments. Phir login. Phir lagta hai
title khaali to nahi hai ye check kar lein, aur id na mile to crash hone ke
bajaye theek se jawab de dein.

Ab wo 400 line hai. Ab uske andar kaam karna kaisa lagta hai, wo suno.

**"Ye app kya-kya kar sakta hai" ka jawab dena band ho jata hai.** Koi poochta
hai kaunse address hain. Solah line wale version mein tumne bas dekh liya tha.
Ab do minute scroll karke code ke beech `app.get` dhoondhte ho, aur phir bhi ek
chhoot jata hai.

**Do bilkul alag kaam ek doosre se sat kar baithe hain.** Address ka naam
badalna aur note save hone ka tareeka theek karna — ye do bilkul alag kaam hain.
Par wo chaar line ki doori pe hain, to ek karne ke liye doosre ko padhna padta
hai.

**Kisi ke saath kaam karna dard ban jata hai.** Tum line 210 badalte ho, wo line
215, aur ab git tum dono se kehta hai ki us code ka jhagda suljhao jise tum
dono ne jaan-boojhkar chhua bhi nahi tha.

**Ek chhoti cheez alag se test nahi kar sakte.** Tum check karna chahte ho "note
banna kaam karta hai kya?" Par wo code sirf ek function ke andar hai jise
Express bulata hai, jo ek address se bandha hua hai, jo ek aisi file mein hai jo
khulte hi poora server chala deti hai.

Inme se koi bhi ek din ki aafat nahi hai. Isiliye to file 400 line tak pahunch
jaati hai. Koi ek din aisa laga hi nahi ki aaj isse theek karna chahiye.

---

## 3. Pehla split: routes

Sabse pehle **address ki list** bahar nikalti hai, kyunki wahi cheez tum sabse
zyada dhoondhte ho, aur wahi sabse pehle kho jaati hai.

[`src/routes/note.routes.js`](src/routes/note.routes.js) kholo. Poori file mein
paanch asli line hain:

```js
router.get('/', noteController.list);
router.get('/:id', noteController.getOne);
router.post('/', noteController.create);
router.put('/:id', noteController.update);
router.delete('/:id', noteController.remove);
```

Ye tumhara poora backend hai, ek saath dikhta hua, beech mein koi code nahi.

**Iske badle kya mila:** "ye app kya kar sakta hai" ab paanch second ka sawaal
hai, project chahe kitna bhi bada ho jaye. Aur address ka naam badalna ab us
file mein hota hai jisme ek line bhi chalne wala code nahi hai — to naam badalte
waqt typo ho bhi jaye, wo note save hone ka tareeka **tod hi nahi sakta**. "Shayad
nahi todega" nahi — *tod hi nahi sakta*. Wo code is file mein hai hi nahi.

Dhyan dena ki address adhoore lagte hain — `'/'`, `'/api/notes'` nahi. Pehla
hissa [`src/app.js`](src/app.js) mein hai, us line pe jahan ye file lagayi gayi
hai. Ye jaan-boojhkar hai: paanchon address ko `/v2/notes` pe le jaana ho to
wahan ek badlav, yahan paanch nahi.

---

## 4. Doosra split: controllers

Routes file ab batati hai ki *kaunsa* function chalega. Wo function khud
[`src/controllers/note.controller.js`](src/controllers/note.controller.js) mein
chale gaye.

Use kholo aur `getOne` padho. Dekho usme kya kabhi aata hi nahi: koi address
nahi, koi `/api/notes` nahi, koi route nahi. Wo request leta hai, note dhoondhta
hai, jawab bhejta hai. Kisi bilkul alag address pe bhi wo bilkul waise hi kaam
karta.

**Iske badle kya mila:** ab ye do files do alag wajah se badalti hain.

Routes file tab badalti hai jab backend ka *roop* badle — naya address, naam
badla. Controller tab badalta hai jab *behaviour* badle — naya niyam, alag
jawab. Ye alag kaam hain, aksar alag dinon pe, kabhi alag logon ke. To: alag
files.

Isi ko log "separation of concerns" kehte hain, aur ye naam jitna bhaari lagta
hai utna hai nahi. **Jo do cheezein alag wajah se badalti hain, unhe ek file
mein nahi rehna chahiye.**

**Split achha hai ya nahi, ye jaanchne ka tareeka:** kya tum har file ka kaam ek
line mein bata sakte ho, bina "aur" bole?

- routes: *kaunsa address kaunsa function chalayega*
- controllers: *chalne pe hota kya hai*
- data: *notes kahan rakhe hain*

Teen line, koi "aur" nahi. Matlab split achha hai.

---

## 5. Jo jaan-boojhkar nahi hai

Zyadatar Express projects mein isse zyada folder hote hain. Tumhare mein
jaan-boojhkar nahi hain — jo folder tumhe abhi samajh nahi aata, usse behtar hai
ki wo ho hi na.

Ye raha jo hataya gaya, aur kaise pata chalega ki ab waqt aa gaya.

### `models/`

Wo file jo data ki maalik hoti hai, taaki koi aur seedha notes list ko haath na
lagaye. Abhi tumhara controller khud `data/notes.js` ke andar jaakar dhoondhta
hai.

**Kab add karo:** jab wahi `notes.find(...)` line teesri jagah likhni pade — ya
jab list ki jagah asli database lagao aur chaho ki chhe file ki jagah sirf ek
badle.

### `config/`

Settings ke liye ek jagah, jo tumhare computer aur asli server pe alag hoti
hain. Abhi tumhara port number seedha `server.js` mein pada hai.

**Kab add karo:** jab doosri setting ki zaroorat pade, ya jab pehli baar project
online daalo.

### `middleware/`

`app.js` ke neeche wale dono catch-all, apni alag file mein.

**Kab add karo:** jab koi ek kuch line se bada ho jaye, ya teesra likhna pade
aur `app.js` ek screen mein na aaye.

### `services/`

Wo code jiska web se koi lena-dena nahi: email bhejna, payment lena, kisi aur ki
website ko call karna.

**Kab add karo:** jab controller aisa kuch karne lage jisme `req` ya `res` aata
hi na ho.

---

**Niyam har baar wahi hai: file tab todo jab sach mein takleef ho, isliye nahi
ki kisi tutorial ne kaha tha.**

Har split ki keemat hai. Ek aur file kholna. Raat ko bug dhoondhte waqt ek aur
jagah jump karna. Wo keemat tab wasool hai jab file mein kaam karna waqai
mushkil ho chuka ho. Pehle din, paanch address wale project mein wo keemat
bekaar hai — sirf isliye ki kisi diagram mein zyada dabbe the.

Section 1 wala solah line ka version aaj bhi solah line ki problem ka sahi jawab
hai. Tumhare paas jo hai wo thodi badi problem ka sahi jawab hai. Asli hunar
folder ka naksha ratna nahi hai. Asli hunar wo pal pehchaanna hai jab tumhara
apna naksha takleef dena shuru kare.

---

## 6. Aage kahan jaana hai

**Doosra layout bana kar dono ko bagal-bagal rakho:**

```bash
npx slowstack        # is baar "classic" chuno
```

Usme wahi layout milega jo zyadatar Express tutorials aur zyadatar jobs use
karti hain — `models/`, `config/` aur `middleware/` folders pehle se lage hue.
Wahi paanch address, wahi behaviour, wahi notes. Farak sirf itna hai ki kitna
toda gaya hai.

Dono projects ko bagal-bagal kholo aur ek hi feature dono mein dhoondho. Phir
har extra file ke liye khud se imaandari se poocho: *kya mujhe ye abhi chahiye
thi?*

Koi ek sahi jawab nahi hai. Dono layout sahi hain — bas alag size ke projects ke
liye. Ab tum bata sakte ho kaunsa kiske liye hai, aur asli hunar yahi hai.

**Phir isi project mein ye teen cheezein try karo:**

- Notes search karne ka tareeka add karo, `/api/notes/search?q=...` pe. Dhyan
  dena ki tum sirf do file chhoote ho, aur shuru karne se pehle hi tumhe pata
  tha kaunsi do.
- `app.js` se `app.use(express.json())` hata do, phir note banane ki koshish
  karo. Error ko aaram se padho. Ye error tumse ek din phir milega.
- "nahi mila" wale catch-all ko routes se upar le jao aur dekho har request fail
  ho jaati hai. Order sajaawat nahi hai.
