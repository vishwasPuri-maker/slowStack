# Why is this split into so many files?

You just made a project with five files to do one small job. That probably looks
like a lot for something that keeps notes in a list.

This is the answer. It is a story, not a manual — read it top to bottom once, in
order, and the folders will stop looking random.

What you need to know already: you have written a `for` loop. That is all.

---

## 1. It really does start as one file

Here is a complete, working backend. Not a pretend one. This actually runs.

```js
import express from 'express';

const app = express();
app.use(express.json());

const notes = [{ id: 1, title: 'First note' }];

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

Sixteen lines. Two working addresses. Save that as `server.js`, run it, and you
have a real backend that a real app could talk to.

**This is not the "wrong" way.** For sixteen lines it is the right way. Anyone
who tells you to split this up has not thought about it.

So why does your project look different? Because of what happens next.

---

## 2. Where that falls apart

Nothing dramatic happens. The file just gets bigger.

You add a way to fetch one note. Then update. Then delete. Then you need users,
so that is five more. Then comments on notes. Then logging in. Then you want to
check the title is not empty, and answer politely when the id does not exist
instead of crashing.

Now it is 400 lines. Here is what that actually feels like.

**You cannot answer "what can this app do?" any more.** Someone asks which
addresses exist. In the sixteen-line version you just looked. Now you scroll for
two minutes hunting for `app.get` between chunks of code, and you still miss one.

**Two jobs that have nothing to do with each other sit right next to each
other.** Renaming an address and fixing how notes get saved are completely
different tasks. But they live four lines apart, so doing one means reading past
the other.

**Working with somebody else gets painful.** You change line 210, they change
line 215, and now git asks you both to sort out a clash in code neither of you
meant to touch.

**You cannot test one small thing on its own.** You want to check "does creating
a note work?" But that code only exists inside a function Express calls, tied to
an address, inside a file that starts a whole server the moment you open it.

None of these is a disaster on any single day. That is exactly why the file gets
to 400 lines. No one day ever felt like the day to fix it.

---

## 3. The first split: routes

The first thing to pull out is the **list of addresses**, because that is what
you look for most often, and it is the easiest thing to lose.

Open [`src/routes/note.routes.js`](src/routes/note.routes.js). The whole file is
five real lines:

```js
router.get('/', noteController.list);
router.get('/:id', noteController.getOne);
router.post('/', noteController.create);
router.put('/:id', noteController.update);
router.delete('/:id', noteController.remove);
```

That is your entire backend, visible all at once, with no code in the way.

**What you got for it:** "what can this app do?" is now a five-second question,
no matter how big the project grows. And renaming an address now happens in a
file that has no working code in it at all — so a typo while renaming cannot
break how notes are saved. Not "is unlikely to". *Cannot.* That code is not in
this file.

You will notice the addresses look unfinished — `'/'`, not `'/api/notes'`. The
first part lives in [`src/app.js`](src/app.js), on the line that plugs this file
in. That is on purpose: moving all five addresses to `/v2/notes` is one change
there, instead of five changes here.

---

## 4. The second split: controllers

The routes file now says *which* function runs. The functions themselves moved
to [`src/controllers/note.controller.js`](src/controllers/note.controller.js).

Open it and read `getOne`. Look at what it never mentions: no address, no
`/api/notes`, no route. It takes a request, finds a note, sends an answer. It
would work exactly the same at a completely different address.

**What you got for it:** the two files now change for two different reasons.

The routes file changes when the *shape* of your backend changes — a new
address, a renamed one. The controller changes when the *behaviour* changes — a
new rule, a different answer. Those are separate jobs, often on separate days,
sometimes done by separate people. So: separate files.

This is what people mean when they say "separation of concerns", and it is far
less mysterious than it sounds. **Two things that change for different reasons
should not live in the same file.**

**A test for whether a split is any good:** can you say what each file does in
one sentence, without using the word "and"?

- routes: *which address runs which function*
- controllers: *what happens when one runs*
- data: *where the notes are kept*

Three sentences, no "and". That is a good split.

---

## 5. What is missing on purpose

Most Express projects have more folders than this. Yours does not, on purpose —
a folder you do not understand yet is worse than no folder at all.

Here is what was left out, and how you will know it is time.

### `models/`

A file that owns the data, so nothing else touches the notes list directly.
Right now your controller reaches into `data/notes.js` and searches it itself.

**Add it when:** you catch yourself writing the same `notes.find(...)` line in a
third place — or when you swap the list for a real database and want to change
one file instead of six.

### `config/`

One place for settings that are different on your computer and on a real server.
Right now your port number is just sitting in `server.js`.

**Add it when:** you need a second setting, or you put the project online for the
first time.

### `middleware/`

The two catch-alls at the bottom of `app.js`, moved into their own files.

**Add it when:** one of them grows past a few lines, or you write a third one and
`app.js` stops fitting on one screen.

### `services/`

Code that has nothing to do with the web: sending an email, taking a payment,
calling somebody else's website.

**Add it when:** a controller starts doing something that does not involve `req`
or `res` at all.

---

**The rule is the same every time: split a file when it actually hurts, not
because a tutorial said to.**

Every split costs something. One more file to open. One more jump to follow when
you are chasing a bug at midnight. That cost is worth paying once a file has got
genuinely hard to work in. It is not worth paying on day one, on a project with
five addresses, because a picture somewhere had more boxes in it.

The sixteen-line version in section 1 is still the right answer to a
sixteen-line problem. What you have now is the right answer to a slightly bigger
one. The skill worth having is not memorising a folder layout. It is noticing
the moment yours started to hurt.

---

## 6. Where to go next

**Make the other layout and put them side by side:**

```bash
npx slowstack        # pick "classic" this time
```

That gives you the layout most Express tutorials and most jobs use, with the
`models/`, `config/` and `middleware/` folders already there. Same five
addresses, same behaviour, same notes. The only difference is how far it is
split up.

Open both projects next to each other and find the same feature in each one.
Then ask yourself honestly, for every extra file: *would I have wanted this yet?*

There is no single right answer. Both layouts are correct — for projects of
different sizes. Now you can tell which is which, and that is the actual skill.

**Then, in this project, try these three things:**

- Add a way to search notes, at `/api/notes/search?q=...`. Notice that you touch
  exactly two files, and you knew which two before you started.
- Delete `app.use(express.json())` from `app.js`, then try to create a note.
  Read the error slowly. That error will find you again one day.
- Move the "not found" catch-all above the routes and watch every single request
  fail. Order is not decoration.
