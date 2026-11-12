# Tell catalog

The patterns YAH removes in its final pass. Each one is a default choice: the move that fits the widest range of readers, made by rule instead of for this reader.

Structural tells come first because they survive model releases. Word lists come last because they age fastest; review them whenever a new model ships.

**How to weigh a tell.** Groups A and B justify an edit on one sighting, except entries marked *weak alone*, which need other tells nearby. Leave a pattern alone inside a quotation, a title, a proper name, or text that discusses the pattern instead of using it. A person can make any of these choices on purpose; several together are the signal.

Adapted from [humanizer](https://github.com/blader/humanizer) by Siqi Chen and [no-ai-slop](https://github.com/petergyang/no-ai-slop) by Peter Yang, both MIT (see `NOTICE`), which draw on Wikipedia's [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), maintained by WikiProject AI Cleanup.

## A. Staging instead of stating

The sentence signals that something matters instead of adding a fact.

### A1. Not X but Y

**Watch for:** "not X but Y", "not just X, but Y", "it's not X, it's Y", "X rather than Y", the contrast split over two sentences ("This doesn't mean X. It means Y."), a clipped tail (", no guesswork"), and the negative list ("Not a tool. Not a toy. A partner."). The same move exists in every language.

**Fix:** state Y. Keep a contrast only when the reader really believes X, or when both halves carry information.

> Before: It's not just a library, it's a whole new way of thinking about state.
> After: The library keeps all state in one store that components subscribe to.

### A2. Closers, fragments and kickers

**Watch for:** a one-line paragraph that repeats the one before it ("That's the real win."); a line after an example that names what it showed ("This shows why testing matters."); a row of fragments ("No setup. No config. No excuses."); "Let that sink in"; a final line that turns the point into an aphorism or mic drop; one word in capitals or with periods between words.

**Fix:** delete the line. End on the last concrete sentence. Keep a short line only when it adds a new fact or consequence. Don't replace a kicker with a better kicker.

### A3. Sayings that sound deep

**Watch for:** the real question is, at its core, what really matters, the heart of the matter, "X is the new Y", "X is the language of Y", "X becomes a trap", "not a tool but a mirror".

**Fix:** replace the saying with the specific claim it stands for.

> Before: At its core, onboarding is the currency of trust.
> After: Users who finish onboarding in the first week are the ones who stay.

### A4. Run-ups before the point

**Watch for:** let's dive in, let's break this down, here's what you need to know, here's the thing, the thing is, let's be honest, real talk, "Honestly?" as a standalone opener; faux-insight setups ("what nobody tells you", "the part everyone misses", "this is where most people go wrong"); rhetorical setups ("What if I told you...", "Think about it:", "Plot twist:", a question the writer answers in the very next sentence). A script's handoff question, answered by the whole next section, is not this tell.

**Fix:** cut the run-up and make the point. "Honestly" inside an ordinary sentence is fine; the tell is the staged opener before a routine claim.

### A5. Colon reveals

**Watch for:** a noun phrase, a colon, then the "reveal": "The secret: consistency." "The best part: it's free."

**Fix:** write a plain sentence. "It's free, which is the best part" or just "It's free." Use colons for lists, labels and quotations.

### A6. Arguing with no one

**Watch for:** "This isn't about...", "I'm not saying...", "To be clear,", "Don't get me wrong,", "You might think... but", "A tempting approach would be...", rejecting an option nobody proposed.

**Fix:** remove the defense. If it hides a real claim, state the claim. Keep an objection the text attributes and answers, or an option a reader would actually weigh.

### A7. Telling the reader what to notice

**Watch for:** "That last part matters more than it sounds", "The key point is", "This distinction matters", "As you can see", "Importantly,", a redundant "In other words".

**Fix:** delete the aside and let the content carry the weight. If the point isn't landing, add the fact or example that makes it land.

## B. Rhythm by rule

Shapes and punctuation used everywhere, whether or not the meaning asks for them.

### B1. Forced triads

Ideas arrive in threes to sound complete: three adjectives, three parallel examples, three short facts and a lesson. Check that each item adds a distinct idea. Keep three when there really are three; otherwise merge, cut, or develop the strongest one.

> Before: The workshop offers inspiration, connection, and growth.
> After: The workshop is mostly hands-on exercises, with an hour at the end to meet the other attendees.

### B2. Robotic rhythm

Several sentences in a row start the same way, every paragraph has the same shape, or punchy short sentences stack up. Vary by ear: merge, change the subject, start with the action. Don't ban the repeated word, and keep repetition the writer uses on purpose.

### B3. Dashes as the universal connector

The final text contains no em dashes (U+2014) or en dashes (U+2013), and no spaced double hyphens used as dashes, unless the writer's sample uses them; then match the sample's rate. Replace each with a period, comma, colon or parentheses, or rewrite the sentence. Dashes inside code, commands, paths, URLs and number ranges in data stay. One dash is *weak alone*; a text full of them isn't.

### B4. Stacked qualifiers

**Watch for:** could potentially, might arguably, it's also possible that, in some cases it may.

One qualifier per claim, and only when the doubt is real. Keep scope statements, legal and safety notices, and ordinary hedges like "usually" or "tends to". *Weak alone.*

### B5. Synonym cycling

One thing gets a new name in every sentence: "the tool... the platform... the solution... the assistant". Pick the clear word and repeat it. Readers take a new word to mean a new thing.

### B6. Passive voice and missing subjects

"No setup needed." "The results are saved automatically." Name who acts when it makes the sentence clearer, and don't let objects do human things ("the decision emerged"). *Weak alone.*

### B7. Hyphenated pairs after the noun

"The report is high-quality and well-documented." Keep the hyphen before a noun (a high-quality report) and drop it after (the report is high quality). Words always spelled with a hyphen, like third-party, keep it. *Weak alone.*

## C. Inflation and borrowed authority

The fact underneath is usually fine. Keep it and remove the dressing.

### C1. Inflated significance

**Watch for:** stands as a testament, marks a pivotal moment, plays a vital role, underscores its importance, reflects a broader trend, an enduring legacy, setting the stage for, the evolving landscape; stock "Challenges and future outlook" sections; send-offs like "the future looks bright" and "exciting times ahead".

**Fix:** state the fact and let the reader judge it. Cut the send-off paragraph and end on the last concrete fact.

> Before: The 2019 release marked a pivotal moment in the project's evolution.
> After: The 2019 release added plugins, and most of today's users arrived after it.

### C2. Shallow -ing riders

**Watch for:** a clause tacked onto a fact with highlighting, underscoring, reflecting, showcasing, symbolizing, ensuring, fostering, contributing to.

**Fix:** keep the fact. Keep the rider only if the source supports what it claims, and then say what it means concretely.

> Before: The update adds offline mode, showcasing the team's commitment to users.
> After: The update adds offline mode, so drafts survive a dropped connection.

### C3. Vague connection

**Watch for:** associated with, connected to, linked to, tied to, in connection with.

**Fix:** name the relationship (founded, works for, caused, funded) when the source gives it. If it doesn't, keep the vague wording rather than invent a role.

### C4. Borrowed authority

**Watch for:** experts agree, studies show, industry reports suggest, many argue, widely regarded as, a list of outlets someone was "featured in", follower counts.

**Fix:** name the source and what it said, or cut the claim. If the user has no source, ask. A missing citation alone isn't a tell; most writing is unsourced.

### C5. Sales language

**Watch for:** nestled, in the heart of, breathtaking, stunning, rich (figurative), renowned, must-visit, a diverse array, groundbreaking, commitment to excellence.

**Fix:** say what the thing is.

### C6. Avoiding "is" and "has"

**Watch for:** serves as, stands as, functions as, acts as, boasts, features, offers (meaning "has").

**Fix:** use is, are, has.

> Before: The app serves as a central hub and boasts powerful search.
> After: The app keeps all your notes in one place and has full-text search.

## D. Formatting by rule

Templates produce clean formatting too. The tell is decoration on every item.

### D1. Bold as decoration

Bold scattered through sentences, and lists where every item starts with a bold label and a colon that the sentence then repeats. Remove the bold. Turn a labeled list into prose when the labels add nothing.

### D2. Decorative headings

Title Case On Every Word, emoji or arrows in headings, a horizontal rule between every section, a heading written for effect instead of naming what's under it. Use sentence case and plain names.

### D3. Lists where prose belongs

Bullets that break one line of reasoning into fragments, or headings over sections two sentences long. Write the reasoning as prose. Keep lists for steps, options and items the reader compares.

### D4. Curly quotes

Curly quotation marks where the target format uses straight ones. Most editors curl quotes automatically. *Weak alone.*

## E. Leftovers from the chat and the draft

Remove these outright.

### E1. Chatbot residue

Great question!, Certainly!, Of course!, You're absolutely right, I hope this helps, Let me know if..., Would you like me to..., Here is a... The most certain tell, and the easiest to miss when it wraps real content.

### E2. Knowledge-limit disclaimers and guesses

"As of my last update", "based on available information", "details are not widely documented", followed by a plausible guess ("she likely grew up..."). State what isn't known, or cut the sentence. Never fill the gap.

### E3. A heading restated in the first sentence

"## Performance" followed by "Performance matters." Delete the restatement and start with the content.

### E4. Writing about the document

"This section covers", "the table below compares", "this was added to replace", "compiled from", "anything unconfirmed is flagged". Write about the subject. Keep a source credit the reader can follow and a caveat that changes what they do.

### E5. Summary endings

"In conclusion", "Ultimately", "Overall", "To sum up", or a last paragraph that repeats the piece. The reader was just there. End on the last concrete point, the takeaway, or the next action.

## F. Writing for the wrong reader

### F1. Re-explaining what the reader knows

A reply that restates the problem, walks through the diagnosis and lays out the proof before reaching the decision, which sits in the last line. When the reader already has the context (a reply in a thread, a follow-up), lead with the decision and keep only the fact they lack. Act on this only when you can see the conversation or the text is plainly a reply.

## G. Word lists

These age fastest. Each word is a tell mainly in groups, or when a plainer word would do. Technical uses are fine (a robust estimator, a gated feature).

**Overused words:** additionally, align with, bolster, crucial, delve, elevate, embark, empower, enduring, enhance, facilitate, foster, garner, harness, highlight (verb), interplay, intricate, key (adjective), landscape (abstract), leverage (verb), meticulous, multifaceted, paramount, pivotal, realm, robust (figurative), seamless, showcase, streamline, supercharge, tapestry, testament, transformative, underscore, utilize, valuable, vibrant.

**Often-empty phrases:** it's worth noting, it's important to note, at the end of the day, when it comes to, in today's world, in the age of, the reality is, the truth is, in terms of, with regard to, in order to, going forward, game changer, this changes everything.

**Often-empty adverbs:** actually, basically, crucially, essentially, fundamentally, importantly, inherently, literally, quietly, simply, truly. Cut them when they add nothing; keep them when they carry real emphasis, doubt, or the writer's rhythm.

## Keep these: they read as human

- A specific, odd detail: a real address, an exact quote, "the lawyer who used to work upstairs from my dentist".
- Mixed feelings left unresolved.
- Dated references, slang and in-jokes tied to a time and a group.
- A genuine aside, parenthetical or self-correction.
- A first-person choice the writer can explain.
