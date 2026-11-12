# Script mode

For video, podcast and talk scripts: text written to be spoken.

These defaults are proposed, not proven. Evidence for script structure comes from creators describing their own process, not from published retention studies. Treat them as a starting shape and follow the user's format when they have one.

## Open with what the video resolves

The first lines state the question, the problem, or the common misconception the video will settle. A viewer should know within the opening why the rest is worth watching.

- Start with the thing itself: the surprising result, the mistake most people make, the question with a non-obvious answer.
- Skip the channel intro, the "in this video we'll cover", and the greeting before the point.
- If the opening uses a misconception, name it as the viewer would say it, then promise to show why it's wrong. Don't fix it yet.

## Sections hand off to each other

Each section answers one part of the opening question. Its last line sets up the next section, often by raising the question the next section answers. That handoff question is not the rhetorical-setup tell in `tells.md` (A4): it's answered by a whole section, not by the next sentence. Use one per handoff at most, and vary it with plain statements of what comes next.

Answer the opening question before the script ends. A script that opens a question and never closes it feels like a trick.

## Write for the ear

- **One breath per sentence.** A sentence you can't say comfortably in one breath is too long. Split it.
- **Spoken words.** Contractions, short words, and "you". Avoid parentheses, footnotes and anything that only works on a page.
- **Say numbers the way people say them:** "about two thirds", not "66.7%", unless the precision matters.
- **Repeat the key term.** Listeners can't scroll back, so a key word said twice is fine where on a page it would be clumsy.

After drafting, read the narration as if aloud and find every sentence that runs past one breath. Split it. If one can't be split without losing meaning, list it in the note after the script.

## When the facts run short

Use general knowledge you're sure of to explain the why (why a coarse grind, why the light scatters), but never invent the user's specifics. If the facts can't fill the requested length without padding, write the shorter script and say its rough runtime in the note after it (assume about 150 spoken words a minute). A missing detail the viewer needs (a unit, a quantity) goes in that note too, not inside the narration.

## Keep notes apart from narration

Narration must be readable straight through without tripping on directions. Put every visual, B-roll, on-screen text, or beat note on its own line in square brackets, never inside a spoken sentence:

```txt
[VISUAL: the cache diagram, request arrow highlighted]
The first request goes all the way to the database.

[BEAT: pause]
The second one never leaves the server.
```

If the user's format uses a two-column layout or another convention, use theirs.
