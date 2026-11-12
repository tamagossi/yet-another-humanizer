# YAH (yet another humanizer)

YAH is an agent skill that makes AI-written answers, articles and video scripts read like a careful person wrote them for one reader.

It's opinionated. I built it for myself, because I got tired of reading AI-generated prose, including in my own Claude sessions when I used Claude as a learning mentor. Cleanup skills like humanizer removed the obvious tells, but the answers still read as written for nobody in particular. YAH works on the draft before it exists: who reads it, what the one point is, which facts are actually available. Then it cleans what slipped through. It turned out useful enough that I'm sharing it.

## What YAH believes

- **Settle the reader before writing.** A model's default is the text that fits the widest range of readers. YAH decides who reads this, the one point, the real details and the stance first.
- **Answer first.** The first sentence carries the answer, the decision or the next action.
- **Never invent facts.** No made-up statistic, customer, quote or anecdote to make the text more convincing. When a detail is missing, YAH asks, writes a plainer sentence, or leaves a marked placeholder.
- **Say plainly what isn't known**, once, next to the claim it affects.
- **Concrete before abstract.** A case you can picture comes before the general rule, and one example carries through a conversation.
- **A writer's sample beats the rules.** If your sample uses dashes and lowercase, so does the output.
- **Remove the tells last.** Every draft gets a final pass against a catalog of AI-writing patterns, structural ones first.

Beating AI detectors is not a goal. Detectors are unreliable (see [Research](#research)), and a text can pass a detector and still be useless to its reader. YAH is judged by people reading it.

## Before and after

Each pair is the same model on the same prompt: first with no skill, then following YAH. They come from the sample set in [`evals/samples/`](evals/samples/), trimmed where marked `[...]`. The prompts are made-up test cases, not my own writing. All 14 cases are in [`evals/`](evals/), including the ones where YAH did worse, with a fact check of every output in [`evals/RESULTS.md`](evals/RESULTS.md).

### Answers: a question with an unanswerable half

<!-- sample: answers-06-unknown-part -->
Prompt: "Which Python version added the match statement, and what percentage of Python projects in production use it today?" The default answers, then adds a code sample, three reasons the number is hard to find, and a list of places to look. YAH answers both halves in two paragraphs.

Default:

```txt
**Python version:** The `match` statement (structural pattern matching) was added in **Python 3.10**, released in October 2021. It was introduced through PEP 634 (specification), PEP 635 (motivation and rationale), and PEP 636 (tutorial).
[...]
**Percentage of production projects using it:** Unfortunately, I don't have a reliable figure for this, and I'm not aware of any authoritative source that measures it. There are a few reasons it's hard to pin down:
[...]
If you need actual numbers, some places to look:
```

YAH:

```txt
Python 3.10 added the `match` statement (structural pattern matching, PEP 634), released in October 2021.

I don't know what percentage of production Python projects use it, and I don't know of any study that measures it, so any number I gave you would be a guess. The closest public data I know of is the annual Python Developers Survey from the PSF and JetBrains, which reports which Python versions developers use. That gives an upper bound: a project still on 3.9 or older can't use `match` at all.
```

### Answers: a request with no clear reader

<!-- sample: answers-02-unclear-reader -->
Prompt: "Write something about our refund policy. Refunds within 30 days of purchase, store credit after that, no refunds on sale items." The default picks a reader on its own and invents a refund method and a contact process the prompt never gave. YAH asks who reads it, then writes only what it was told and marks the gaps.

Default:

```txt
We want you to be happy with your purchase. If something isn't right, here's how we can help.
[...]
If you're not satisfied, you can request a full refund within **30 days of your purchase date**. Refunds will be issued to your original payment method.
[...]
To start a request, please contact our support team with your order number and the reason for your return. We'll guide you through the next steps.
[...]
If you have any questions about this policy, don't hesitate to reach out. We're here to help.
```

YAH (after the user answers "Customers, on our website's help page"):

```txt
Who will read this, and where will it be published?
[...]
You can get a refund on anything you bought from us in the last 30 days, counted from the date of purchase. After 30 days, we give you store credit instead. Items bought on sale can't be refunded.

[ADD: what happens with sale items instead: store credit, exchange only, or no returns at all]

[ADD: whether the item has to be sent back, and in what condition]

To ask for a refund or store credit, [ADD: how customers request one, such as an email address, a form link or in store, and what to include, such as the order number].
```

### Long-form: editing marketing copy

<!-- sample: longform-03-edit -->
Prompt: "Edit this to sound human", followed by a paragraph full of tells ("In today's fast-paced world", "it's a game changer", "fostering collaboration, boosting productivity, and driving results") with two facts: it's a Slack integration, and 300+ teams adopted it since May. The default rewrite adds features the original never mentioned. YAH keeps the two facts and says what's missing.

Default:

```txt
Getting your team on the same page shouldn't be this hard. That's why we built our new Slack integration. It brings your team's updates, files, and conversations into the place you're already working, so less gets lost and more gets done. Since we launched it in May, more than 300 teams have started using it. Give it a try and see how it fits into your day.
```

YAH:

```txt
Our new Slack integration connects your team and changes how you work together. More than 300 teams have adopted it since it launched in May.

Couldn't fix without more information:

- "connects your team and changes how you work together" keeps the original's "connects your team" and "game changer", but a reader can't check either. Say what the integration does (for example, which updates it posts to which Slack channels) and one thing a team can now do that it couldn't before.
```

### Long-form: a landing page with vague claims

<!-- sample: longform-04-edit-missing-info -->
Prompt: "Make this paragraph better for our landing page", with vague claims ("significantly improves productivity", "trusted by industry leaders", "robust features that users love") and one fact, the $8 price. The default swaps the vague claims for product features nobody supplied. YAH's paragraph is barely better on its own: it keeps the claims, because they're the writer's, and lists the data that would fix each one. That's the trade YAH makes.

Default:

```txt
Acme Notes helps teams capture, share, and find what matters, fast. From meeting notes to project plans, everything stays organized, searchable, and in sync, so your team spends less time looking for information and more time getting work done. Trusted by teams at leading companies. Plans start at just $8 per user per month.
```

YAH:

```txt
Acme Notes makes many teams significantly more productive. Industry leaders trust it, and users love its features. Plans start at $8 per user per month.

Couldn't fix without more information:

- "makes many teams significantly more productive": give the measure and its source, such as hours saved per week or a result from a named customer, and how many teams.
- "Industry leaders trust it": name two or three customers you have permission to show, or give a customer count.
```

### Video script: the opening

<!-- sample: script-01-sky-blue -->
Prompt: "Write a 2-minute YouTube script explaining why the sky is blue." The default opens with timestamps, a bold HOOK label and a "here's the strange part" setup. YAH opens on the misconception, keeps every note on its own bracketed line, and writes for the ear.

Default:

```txt
**Estimated runtime:** ~2 minutes (about 300 words of narration)

---

**[0:00 – 0:10] HOOK**

*[Visual: Time-lapse of a bright blue sky with clouds drifting by.]*

**NARRATOR:**
Look up on a clear day and you'll see it: blue. Everywhere. But here's the strange part: sunlight isn't blue. So why is the sky?
```

YAH:

```txt
[VISUAL: bright blue sky over sand dunes, no water anywhere in frame]
Ask why the sky is blue, and a lot of people will tell you it's reflecting the ocean. So how is the sky over the Sahara just as blue, hundreds of miles from any sea?

The answer starts with sunlight.
```

### Voice: a talk intro from a writing sample

<!-- sample: voice-02-talk-intro -->
Prompt: a short writing sample ("Short version: I was wrong about Kubernetes...") and "Write a 150-word intro for my conference talk... it took 4 months, 120 pipelines, average build time went from 18 minutes to 7." Both versions pick up the sample's opener. The default invents a four-week promise, undocumented scripts and deleted pipelines. YAH asks whether it's spoken or printed, uses the three facts, and says it runs short.

Default:

```txt
Short version: we moved our CI from Jenkins to GitHub Actions, and it was worth it. Mostly.

It took four months. Not the four weeks I'd confidently promised. We had 120 pipelines, and every one of them had its own quirks, its own undocumented shell script, its own reason someone was scared to touch it. Some were easy. Some were not. A few we just deleted, and nobody noticed.
```

YAH (after the user answers "The spoken opening"):

```txt
Short version: we moved our CI from Jenkins to GitHub Actions, and our builds got a lot faster.

It took four months. We had a hundred and twenty pipelines to move. Our average build used to take eighteen minutes. Now it takes seven.

Eleven minutes doesn't sound like much. But you save it on every build, and with a hundred and twenty pipelines, the builds add up.

The rest of this talk is how we got from eighteen minutes to seven.

---

This runs about 30 seconds spoken, roughly half of 150 words. Those three facts don't fill more without padding. To reach 150, send me why you left Jenkins, the hardest part of the four months, and whether anything got worse after the move.
```
<!-- /sample -->

## Installation

YAH is one skill, `yah`, in `skills/yah/`. Pick your agent.

### Claude Code

```bash
claude plugin marketplace add tamagossi/yet-another-humanizer
claude plugin install yah@yet-another-humanizer
```

Update:

```bash
claude plugin marketplace update yet-another-humanizer
claude plugin update yah@yet-another-humanizer
```

### npx skills (Claude Code, Codex, Cursor and other agents)

```bash
npx skills add tamagossi/yet-another-humanizer
```

Update:

```bash
npx skills update yah
```

### pi

```bash
pi install git:github.com/tamagossi/yet-another-humanizer
```

Update:

```bash
pi update git:github.com/tamagossi/yet-another-humanizer
```

Once it's installed, ask for what you want ("explain...", "write a post...", "edit this...", "write a video script...") or say "yah" or "make this sound human". To see what YAH decided before drafting, ask it to show the brief. To see what it removed, ask for the audit.

## How it works

`SKILL.md` holds the rules every mode shares and picks a mode from the request. Each mode's rules live in their own file, so a task loads only what it needs:

| File | What's in it |
|---|---|
| `skills/yah/SKILL.md` | The brief, the fact rules, answer first, uncertainty, the mode router, the final pass |
| `references/answers.md` | Level, "make it simpler", concrete examples, grading a user's answer |
| `references/longform.md` | Point of view, experience placeholders, people-first search check, edits that keep every claim |
| `references/script.md` | The opening, section handoffs, writing for the ear, notes apart from narration |
| `references/voice.md` | Reading a writing sample and matching it |
| `references/tells.md` | The tell catalog for the final pass |

YAH doesn't call any other skill, makes no network calls, and stores nothing. A voice sample stays in the conversation.

## Research

Each rule comes from somewhere. These are the findings behind them.

**AI text is average text.** Models choose the continuation that fits the most readers, so specific facts get smoothed into general, important-sounding claims ([Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)). That's why YAH starts with the reader and the available details instead of only scrubbing words.

**Word lists age; structure lasts.** After "delve" was flagged as a ChatGPT word in early 2024, its use in arXiv abstracts dropped, while other favored words such as "significant" kept rising ([Geng and Trotta, 2025](https://arxiv.org/abs/2502.09606)). YAH's catalog leads with sentence and paragraph shapes and keeps word lists last, to be reviewed each model release.

**People who use AI a lot can tell.** Five annotators who use LLMs for writing, voting together, misclassified 1 of 300 articles, beating most automated detectors ([Russell, Karpinska and Iyyer, 2025](https://arxiv.org/abs/2501.15654)). Sounding human to a careless reader isn't enough.

**Detectors are a poor target.** GPT detectors often flag writing by non-native English speakers as AI-generated ([Liang et al., 2023](https://arxiv.org/abs/2304.02819)). YAH is tested with blind human reads instead.

**Search rewards experience, not keywords.** Google's guidance asks whether content shows first-hand experience and original information, and adds value beyond rewording other sources ([Google Search Central](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)). YAH's search check asks those questions and marks missing experience instead of inventing it.

**Good writing advice agrees.** Cut words that add nothing, prefer the short word and the active voice ([Orwell, 1946](https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/politics-and-the-english-language/)). Plain words keep readers on the ideas ([Graham, 2021](https://paulgraham.com/simply.html)). Lead with the conclusion, then support it (Minto, *The Pyramid Principle*). Zinsser's *On Writing Well* and Pinker's *The Sense of Style* make the same case for clarity and for writing to a reader you can picture.

**Teaching works concrete first, in small steps.** Rosenshine's principles of instruction include presenting new material in small steps and giving models and worked examples ([Rosenshine, 2012](https://www.aft.org/sites/default/files/Rosenshine.pdf)). Mayer's coherence principle (cut extraneous material) and personalization principle (conversational style) come from multimedia learning research (Mayer, *Multimedia Learning*). These shape answers mode.

**Script advice is thin.** Most guidance on video scripts comes from creators describing their own process, with no published retention studies behind specific rules. Opening with a misconception follows the approach Derek Muller of Veritasium describes from his PhD research on physics videos (Muller, 2008); I haven't checked the thesis itself. YAH's script rules are defaults, not proven rules.

### Eval results

The sample set in [`evals/`](evals/) has 14 cases across the three modes, each with the default output and the YAH output. A reviewer agent (another model run, not a person) fact-checked every output for 0.1.0:

| | Default | YAH |
|---|---|---|
| Cases with invented specifics | 9 of 14 | 0 of 14 |
| Invented specifics in all | 44 or more | 0 |
| Cases that did what the case asked | | 13 pass, 1 partial |

The first review of 0.1.0 found three small unsupplied claims in YAH's output, written as the user ("changes stay small", a motive in a newsletter post, a claim about top search results). 0.1.1 tightened the rule and I re-ran those three cases. I rechecked them myself, not the independent reviewer, and one mild slip remains ("I haven't tested any specific models", written as the author). [`evals/RESULTS.md`](evals/RESULTS.md) lists it with the other known problems. A blind read by people hasn't been run yet, so this README makes no claim about which version readers prefer.

## Credits

YAH adapts and credits two skills:

- [blader/humanizer](https://github.com/blader/humanizer) by Siqi Chen (MIT). YAH's tell catalog follows humanizer's structure and many of its patterns, along with its rule that a writing sample overrides style rules and that a rewrite never adds a fact.
- [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop) by Peter Yang (MIT). YAH takes its colon-reveal, synonym-cycling, faux-insight and summary-ending patterns, its "telling the reader what to notice" pattern, the portability test for filler, and parts of its word lists.

Both draw on Wikipedia's [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), maintained by WikiProject AI Cleanup, which YAH paraphrases and cites. The license notices are in [`NOTICE`](NOTICE).

## Sources

### Primary

- Wikipedia, [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), WikiProject AI Cleanup. Accessed 2026-11-12.
- Geng, M. and Trotta, R. (2025). [Human-LLM coevolution: evidence from academic writing](https://arxiv.org/abs/2502.09606). Accessed 2026-11-12.
- Russell, J., Karpinska, M. and Iyyer, M. (2025). [People who frequently use ChatGPT for writing tasks are accurate and robust detectors of AI-generated text](https://arxiv.org/abs/2501.15654). ACL 2025. Accessed 2026-11-12.
- Liang, W., Yuksekgonul, M., Mao, Y., Wu, E. and Zou, J. (2023). [GPT detectors are biased against non-native English writers](https://arxiv.org/abs/2304.02819). *Patterns*. Accessed 2026-11-12.
- Google Search Central. [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). Accessed 2026-11-12.
- Orwell, G. (1946). [Politics and the English language](https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/politics-and-the-english-language/). Accessed 2026-11-12.
- Graham, P. (2021). [Write simply](https://paulgraham.com/simply.html). Accessed 2026-11-12.
- Rosenshine, B. (2012). [Principles of instruction](https://www.aft.org/sites/default/files/Rosenshine.pdf). *American Educator*. Accessed 2026-11-11.
- Muller, D. (2008). *Designing effective multimedia for physics education*. PhD thesis, University of Sydney. Title confirmed via [Wikipedia](https://en.wikipedia.org/wiki/Derek_Muller), accessed 2026-11-12; thesis not read.
- Books: Minto, *The Pyramid Principle*; Zinsser, *On Writing Well*; Pinker, *The Sense of Style*; Mayer, *Multimedia Learning*. Consulted through the research notes of 2026-11-11.

### Secondary

- [blader/humanizer](https://github.com/blader/humanizer), skill and README. Accessed 2026-11-12.
- [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop), skill and README. Accessed 2026-11-12.

## License

MIT. See [`LICENSE`](LICENSE), and [`NOTICE`](NOTICE) for the projects YAH adapts.
