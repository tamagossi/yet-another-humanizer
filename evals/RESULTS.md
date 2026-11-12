# Results: YAH 0.1.1

The outputs were generated on 2026-11-12 by Claude Opus 5.5 subagents and reviewed by another subagent, not a human. No blind read has been run yet.

After the first review (0.1.0), three cases had small invented claims. 0.1.1 tightens the fact rule for text written in the user's voice, and those three cases (longform-01, longform-02, voice-01) were re-run and rechecked by the same session that wrote the skill, not by the independent reviewer. The other 11 cases are the 0.1.0 outputs, unchanged, because the edits did not touch their rules.

Invented facts counts specifics that are not in the prompt and are presented as fact about the user's world or as unverified data. Labeled examples and well-established general knowledge are not counted. Tell IDs refer to `skills/yah/references/tells.md`.

## Summary

| Case | Invented facts (default) | Invented facts (YAH) | Tells left in YAH | Case check |
|---|---|---|---|---|
| answers-01-cdn-brief | 0 | 0 | none | pass |
| answers-02-unclear-reader | 5 | 0 | none | pass |
| answers-03-indonesian | 0 | 0 | none | pass |
| answers-04-make-it-simpler | 0 | 0 | A5 (borderline) | pass |
| answers-05-reuse-example | 0 | 0 | none | pass |
| answers-06-unknown-part | 3 | 0 | none | pass |
| longform-01-position | 9 | 0 | B2 (weak) | pass |
| longform-02-seo | 12+ | 0 (one mild, see below) | none | pass |
| longform-03-edit | 2 | 0 | C1 (weak, flagged by YAH) | pass |
| longform-04-edit-missing-info | 3 | 0 | C4 (kept and flagged) | pass |
| script-01-sky-blue | 0 | 0 | none | pass |
| script-02-cold-brew | 2 | 0 | A1 (weak) | pass |
| voice-01-dashes-sample | 4 | 0 | none | pass |
| voice-02-talk-intro | 4 | 0 | A6 | partial |

## Per case

### answers-01-cdn-brief

- YAH specifics not in the prompt: Virginia, Jakarta and Singapore as a labeled example ("Say an online shop..."), about 16,000 km Virginia to Jakarta and under 1,000 km Singapore to Jakarta (both correct), 5,000 visitors as a hypothetical, Cloudflare, Akamai and CloudFront. All fine.
- The "origin sends it to the Singapore edge server once" line simplifies (a region can have several edge nodes that each fetch), but is fair for the stated reader.
- YAH tells: none found. The brief was requested, so its labels are not E4.
- Default: 0 invented (New York and Tokyo labeled "Imagine"; vendor and host lists are general knowledge). Tells: D1, D2, D3, E5 ("In short:"), G ("Key Benefits"), B1 ("faster, more reliable, and more secure"), about 6.
- Case check pass: brief shown only because asked, the definition is the first sentence, and the shop example comes before "edge server" and "origin" are named.

### answers-02-unclear-reader

- YAH asks one question ("Who will read this, and where will it be published?") before drafting.
- The draft after the answer adds no policy details; every gap is an [ADD] placeholder (5 of them, so the page is mostly placeholders).
- Wording slip: "You can get a refund on anything you bought from us in the last 30 days" is contradicted two sentences later by "Items bought on sale can't be refunded."
- Default invented 5 policy details: refunds to the original payment method, store credit "for the value of your purchase", credit usable "toward any future order", a request process via support with order number and reason, and "on sale or at a discount" widening the sale rule. Tells: E1 ("Here's a clear...", "Let me know"), D1, D2, A2 ("We're here to help."), about 4.
- Case check pass: one question, no drafting until answered.

### answers-03-indonesian

- YAH specifics: the `nginx` image, `docker run -d nginx` twice, `docker rm`, `docker images`, `docker ps`. All general knowledge.
- Accuracy gap: `docker rm` on a running container fails without `docker stop` first or `-f`, and a beginner following the text would hit that error.
- "file sistem" is half translated; either "file system" (English term) or "sistem file".
- YAH tells: none found.
- Default: 0 invented. Tells: E1 ("Pertanyaan bagus!", "Semoga membantu!", "Kalau mau, saya bisa lanjut"), A7 ("salah satu konsep paling penting"), D1, D2, D3, about 5.
- Case check pass: Indonesian, English technical terms, beginner level, answer in the first sentence.

### answers-04-make-it-simpler

- YAH specifics: `users` table with a million rows and `ana@example.com` (labeled with "Say"), B-tree (general), cookbook with "banana bread, page 212" (labeled analogy). All fine.
- Turn 1 says the `EXPLAIN` output "should mention the index". On a small test table PostgreSQL often still picks a sequential scan, so a reader trying it may see the opposite.
- Turn 2 drops code and most terms and switches to a cookbook, which is a real step down, not a reword.
- YAH tells: borderline A5 in turn 2, "The catch is the same as in the cookbook: ...".
- Default: 0 invented. Tells: E1 ("Sure! Here's a simpler version:"), A5 ("The catch:", "So the rule of thumb is:"), A2 ("That takes forever."), D1, D2, E5 ("Summary"), about 6.
- Case check pass.

### answers-05-reuse-example

- YAH specifics: hash value 1,859 labeled "I'm making these values up" (1,859 mod 8 is 3, correct), 8 and 16 buckets as examples, Java `HashMap` chaining and Python `dict` open addressing (correct).
- Turn 2 reuses `"ana"` in bucket 3, adds `"budi"`, and corrects turn 1's "never checks the other buckets" claim openly ("That was simplified"), which is the kind of self-correction the catalog keeps.
- YAH tells: none found.
- Default: 0 invented (Java 8 treeify at 8 entries, 0.75 load factor and Python hash randomization are correct, though treeify also needs a table of 64 buckets). Tells: D1 ("Real-world note:"), D2, D3, E5 ("In short", "So in short:"), G ("Key Properties"), about 5.
- Case check pass.

### answers-06-unknown-part

- YAH specifics: Python 3.10, PEP 634, October 2021, the PSF and JetBrains Python Developers Survey. All correct.
- Dangling modifier: "(structural pattern matching, PEP 634), released in October 2021" reads as if the PEP was released then.
- "That gives an upper bound" is reasonable logic, but the survey counts developers, not production projects, so it bounds a different population.
- Default invented 3 unverified trend claims under "What can be said more generally": adoption "relatively gradual", usage "growing", and `match` showing up most in parsing code. Tells: D1, E2 ("Unfortunately, I don't have a reliable figure" followed by guesses), E1 ("Here's a quick example"), about 3.
- Case check pass: known part answered, unknown part stated plainly, no number, one qualifier at most.

### longform-01-position

- 0.1.1 re-run. YAH uses the supplied facts (6 people, 9 services, March merge, 40 to 8 minutes) and puts the position in the first sentence.
- The 0.1.0 invented outcome ("changes stay small") is gone. The merge-back story is now a placeholder: "[YOUR EXPERIENCE: how long the merge back took and the hardest part of it]". A general claim about habits ("people tend to bundle changes") is framed as a general pattern, not as the author's experience.
- Stretch that remains: "6-person startup" is treated as a six-person engineering team ("If your whole engineering team fits in one standup", "A six-person team"). The prompt does not say all six are engineers.
- Tells: the 0.1.0 B2 stacked-parallel-lines pattern was not found on a quick read of the re-run; this was not checked line by line.
- Notes: the output has 4 placeholders for the author's experience and 1 [ADD] for deploy frequency.
- Default invented about 9 first-person details: Netflix and Uber as motivation, an "unwieldy" monolith, features touching "three or four" services, retries and tracing work, slower new hires, shared Slack channels, a container stack on laptops, kept module boundaries, one-command onboarding. Tells: A1 ("isn't technical. It's organizational."), A4 ("Here's what I wish someone had told us"), A5 ("That's the key:"), A2 ("We learned that the hard way, so you don't have to."), B2 ("Netflix did it. Uber did it."), D1, D2, E5 ("The Bottom Line"), about 8.
- Case check pass on the 0.1.1 re-run (0.1.0 was partial because of the invented outcome).

### longform-02-seo

- 0.1.1 re-run (second pass, after the SEO section of longform.md was changed to judge the draft by what it contains). YAH gives no specs, prices, decibel levels or warranty lengths; the numbers it uses are the general elbow-angle rule and the arm's-length guide, and it says it has not verified them against a named source.
- The first 0.1.1 re-run still wrote a gap note that compared the draft with "what top results already cover", an unverified claim about search results. The edit to longform.md removed it. The final output's note judges the draft by what it contains (no first-hand experience, no original information, nothing sourced), and its count of five [YOUR EXPERIENCE] placeholders matches the text.
- Mild issue: the text speaks as the author in two places ("I haven't tested any specific models", "I wouldn't pay extra for them"). The first asserts something about the author's experience that the prompt does not give. Counted as 0 invented specifics, but it is the same kind of slip.
- Tells: none found on a quick read. No keyword stuffing and no meta block.
- Default: 12 or more unsourced specs and prices presented as fact (25 to 50 in height range, 6'2" and 5'4" cutoffs, 150 to 200 lb and 250 lb capacities, desk widths, 24 and 30 in depth, 45 to 50 dB, 1 to 1.5 in/s, a $150 to $600+ price table, 5 to 15 and 3 to 5 year warranties, 30 to 60 minute standing intervals). Tells: C4 ("Most ergonomic experts recommend", "Many people report"), A1, A5 ("And for good reason:"), C5 ("the perfect standing desk"), D1, D2, E4 ("This guide walks you through"), E5 ("Final Thoughts"), E1 ("Ready to upgrade your workspace?"), about 9.
- Case check pass.

### longform-03-edit

- YAH keeps the Slack integration, May launch and "more than 300 teams", and adds no new claims.
- Dropped claims, all disclosed in the notes: "fostering collaboration, boosting productivity, and driving results", the "today's fast-paced world" opener and "the future of teamwork is here".
- YAH tells: C1 (weak), "changes how you work together" is "game changer" reworded and still unverifiable. YAH flags it itself.
- Default invented 2: features ("brings your team's updates, files, and conversations into the place you're already working") and a benefit ("less gets lost and more gets done"); it also adds a call to action. Tells: E1 ("Here's a more natural, human-sounding version"), D1, A4 (staged opener "Getting your team on the same page shouldn't be this hard."), about 3 to 4.
- Case check pass.

### longform-04-edit-missing-info

- YAH keeps $8 per user per month and adds nothing.
- Silently dropped: "robust" from "robust features that users love". Not disclosed in the notes.
- The rewrite is close to a restatement. All three unsupported claims stay in front of landing page visitors, so the paragraph is not much better for the stated use until the user fills the gaps.
- YAH tells: C4, "Industry leaders trust it", kept as the original claim and flagged in the notes; "significantly" also remains.
- Default invented 3 sets of features or benefits presented as fact: "capture, share, and find", "organized, searchable, and in sync", and in the example "real-time collaboration, powerful search, and integrations" left outside the brackets. Its example numbers ("10,000+ teams", "5 hours a week") are labeled and fine. Tells: E1, D1, B1 (two triads), C5-ish "just $8", about 4.
- Case check pass: price kept, each unsupported sentence listed with what data it needs.

### script-01-sky-blue

- YAH specifics: the ocean reflection misconception, the Sahara, "about five times more than red", Lord Rayleigh in the 1870s, water absorbing red light. All general knowledge and correct.
- Opening states the misconception and the question; handoffs ("The answer starts with sunlight.", the violet question) lead into the next section; notes sit in brackets on their own lines.
- Narration is about 340 words, roughly 2 minutes 15 seconds at 150 words per minute, slightly over the 2 minute request.
- YAH tells: none found.
- Default: 0 invented (the "some violet absorbed high in the atmosphere" reason is a minor, contested factor). Tells: A4 ("But here's the strange part:", "Wait."), A2 ("blue. Everywhere."), A5 ("remember:"), C5 ("Gorgeous time-lapse"), D1, E1 ("hit like, subscribe"), about 6.
- Case check pass.

### script-02-cold-brew

- YAH uses only the supplied numbers; "six in the evening, ready at ten the next morning" is derived from 16 hours and correct.
- Narration is about 344 words, roughly 2 minutes 20 seconds, against a 3 minute request. YAH discloses the shortfall but says the steps cannot fill 3 minutes "without padding", while general know-how (equipment, not squeezing the filter, batch size) could have filled it without new numbers.
- It asks whether 1:8 is by weight or volume, which is a real gap in the brief.
- YAH tells: A1 (weak), "Lots of people think cold brew is just regular coffee poured over ice. It's made a different way." The contrast fits a misconception opener, but the second half says nothing until later.
- Default invented 2: the concentrate "keeps in the fridge for up to about a week", and "1 cup of grounds to 8 cups of water works too", which treats weight and volume ratios as equal. Tells: B1 ("Smooth, rich, and way less bitter"), A4 ("Why does this matter?", "The easiest way to do this?"), A2 ("No dry clumps!", "Make it your own.", "Super simple, and so good."), B6 ("No fancy equipment required."), D1, E1, about 6.
- Case check pass: supplied numbers only, speakable, notes separate.

### voice-01-dashes-sample

- 0.1.1 re-run. YAH matches the sample: lowercase sentence starts, a spaced em dash pair as in the sample, and 3 December is a Thursday, so "first Thursday issue goes out 3 December" is consistent with the prompt.
- The 0.1.0 invented motive ("assuming I'd given up") is gone. The 0.1.1 text gives no reason for the move and addresses readers conditionally ("if you've got a filter, a folder or a Tuesday-morning reading habit built around it"), which is a hypothetical about readers, not a claim about the user.
- Open question: the output capitalizes Tuesday, Thursday and December although the sample is lowercase. The rule added in 0.1.1 says to use normal conventions for what the sample does not show, but the sample does show lowercase starts, so this is a judgment call.
- YAH tells: none counted. The dash is allowed by the sample.
- Default invented 4: three reasons for the move ("tuesdays kept sneaking up on me", "the week had already eaten me alive", writing "at 1am") and "nothing else changes". It also reuses the sample's closing line almost word for word. Tells: E1 (two), A4 ("why?"), B1 ("same newsletter, same me, just two days later"), about 3.
- Case check pass. Whether the sample was stored cannot be checked from the output.

### voice-02-talk-intro

- YAH asks one useful question (spoken opening or program abstract) before drafting, then uses only the three supplied facts.
- Length: about 80 words against the requested 150, disclosed with a request for the missing facts. Filling it would need the user's own details, so the shortfall is honest, but the request is not met.
- Voice: it copies "Short version:" and the short sentences, but has no self-correction or walk-back ("sort of", "Just not us, not anymore"), which is the sample's defining move.
- YAH tells: A6, "Eleven minutes doesn't sound like much. But you save it on every build", answering an objection no one raised (and 18 to 7 minutes is a 61 percent cut). "The rest of this talk is how we got from eighteen minutes to seven." is a normal talk signpost, not counted.
- Default invented 4: "the four weeks I'd confidently promised", each pipeline's "undocumented shell script", "A few we just deleted, and nobody noticed", and developers wandering off for coffee. Tells: A1 ("That's not a rounding error. That's..."), A6 ("This talk isn't a sales pitch"), B1 ("its own quirks, its own undocumented shell script, its own reason"), A2 ("Or doesn't."), E1, about 5.
- Case check partial: supplied facts only and short sentences, but the self-correcting voice is missing.

## What YAH still gets wrong

1. Small unsupplied claims can still slip into text written as the user. 0.1.0 had three ("changes stay small" in longform-01, the "assuming I'd given up" motive in voice-01, the claim about top search results in longform-02); 0.1.1 fixed them in the re-run, with one more edit needed for the search claim. The longform-02 re-run still says "I haven't tested any specific models" as the author. Each is minor, but it is the exact failure YAH exists to prevent, and three re-runs of three cases is not proof the rule holds.
2. Voice matching copies surface features and misses the defining move. voice-02 reuses "Short version:" and short sentences but drops the self-correction that makes the sample sound like its writer.
3. Length requests go unmet and the gap is handed back to the user. voice-02 delivers about 80 of 150 words and script-02 about 2:20 of 3:00; in script-02 general how-to content could have filled the time without inventing numbers.
4. Edits that lack data return near-copies of the original. longform-04 keeps "significantly more productive" and "Industry leaders trust it" on a landing page, and longform-03 keeps "changes how you work together". The notes are good, but the delivered text is not usable until the user acts, and longform-04 drops "robust" without saying so.
5. Small accuracy and clarity slips in technical answers: `docker rm` on a running container (answers-03), `EXPLAIN` on a small table may still show a full scan (answers-04), the dangling "released in October 2021" (answers-06), "anything you bought" contradicted by the sale rule (answers-02), and "file sistem" (answers-03).
6. Residual rhythm tells survive in longer pieces: stacked parallel short sentences (longform-01), a pre-empted objection (voice-02) and a contrast whose second half is empty (script-02).
