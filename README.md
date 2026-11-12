# YAH (yet-another-humanizer)

YAH is an opiniated agent skill that makes AI-written answers, articles and video scripts read like a careful person wrote them for one specific reader.

## The Motivation

 I'm tired of reading AI-generated content, even in my own Claude sessions, and the cleanup skills I tried only fix a draft that already exists. YAH settles who the reader is and which facts are real before it writes, then removes the AI tells at the end. This is just a weekend fun project! It might or might not suit your needs.

## Installation

### Claude Code

```bash
claude plugin marketplace add tamagossi/yet-another-humanizer
claude plugin install yah@yet-another-humanizer
```

Update with `claude plugin marketplace update yet-another-humanizer`, then `claude plugin update yah@yet-another-humanizer`.

### npx skills

```bash
npx skills add tamagossi/yet-another-humanizer
```

Update with `npx skills update yah`.

### pi

```bash
pi install git:github.com/tamagossi/yet-another-humanizer
```

Update with `pi update git:github.com/tamagossi/yet-another-humanizer`.

Once it's installed, ask for what you want, or say "yah" or "make this sound human".

## How it Works

YAH is one skill with three modes: answers, long-form writing and video scripts. When you ask for something, it:

1. Picks the mode from your request and loads only that mode's rules.
2. Settles a brief before drafting: who reads this, the one point, the facts it really has, and its stance. It asks one question only when it can't tell who the reader is.
3. Drafts in the mode's shape. Answers lead with the answer and show a concrete example before the rule. Articles take a position and leave marked placeholders where only you have the experience. Scripts open on the question the video answers and are written to be spoken.
4. Adds no facts you didn't give it. A missing detail becomes a question, a plainer sentence or a placeholder like `[ADD: ...]`.
5. Checks the draft against a catalog of AI-writing patterns and rewrites each hit. If you gave it a writing sample, the sample wins over these rules.

`skills/yah/SKILL.md` holds the shared rules. The mode rules, the voice rules and the pattern catalog sit in `references/`, so a task loads only what it needs. YAH makes no network calls and stores nothing.

## Comparison

Each case runs the same task four ways: the plain model (Default), humanizer, no-ai-slop and YAH. humanizer and no-ai-slop cleaned the Default output; on the two edit cases they edited the original text. Only their rewritten text is shown, trimmed where marked `[...]`. The full outputs, a fact check of every output and the known problems are in [`evals/`](evals/).

### A question with an unanswerable half

**Prompt:** "Which Python version added the match statement, and what percentage of Python projects in production use it today?"

<!-- sample: answers-06-unknown-part -->
<table>
<tr><th>Without YAH</th><th>YAH</th></tr>
<tr><td>

**Default**

**Python version:** The `match` statement (structural pattern matching) was added in **Python 3.10**, released in October 2021. It was introduced through PEP 634 (specification), PEP 635 (motivation and rationale), and PEP 636 (tutorial).

[...]

**Percentage of production projects using it:** Unfortunately, I don't have a reliable figure for this, and I'm not aware of any authoritative source that measures it. There are a few reasons it's hard to pin down:

[...]

</td><td rowspan="3">

Python 3.10 added the `match` statement (structural pattern matching, PEP 634), released in October 2021.

I don't know what percentage of production Python projects use it, and I don't know of any study that measures it, so any number I gave you would be a guess. The closest public data I know of is the annual Python Developers Survey from the PSF and JetBrains, which reports which Python versions developers use. That gives an upper bound: a project still on 3.9 or older can't use `match` at all.

</td></tr>
<tr><td>

**humanizer**

The `match` statement (structural pattern matching) was added in Python 3.10, released in October 2021. It came through PEP 634 (specification), PEP 635 (motivation and rationale), and PEP 636 (tutorial).

[...]

I don't have a reliable figure for the percentage of production projects using it, and I don't know of an authoritative source that measures it. It's hard to pin down for a few reasons.

[...]

</td></tr>
<tr><td>

**no-ai-slop**

The `match` statement (structural pattern matching) was added in Python 3.10, released in October 2021. It came through PEP 634 (specification), PEP 635 (motivation and rationale), and PEP 636 (tutorial).

[...]

I don't have a reliable figure for the share of production projects using it, and I don't know of an authoritative source that measures it. Three things make it hard to pin down:

[...]

</td></tr>
</table>

### A request with no clear reader

**Prompt:** "Write something about our refund policy. Refunds within 30 days of purchase, store credit after that, no refunds on sale items."

<!-- sample: answers-02-unclear-reader -->
<table>
<tr><th>Without YAH</th><th>YAH</th></tr>
<tr><td>

**Default**

If you're not satisfied, you can request a full refund within **30 days of your purchase date**. Refunds will be issued to your original payment method.

[...]

To start a request, please contact our support team with your order number and the reason for your return. We'll guide you through the next steps.

[...]

</td><td rowspan="3">

Who will read this, and where will it be published?

[...]

You can get a refund on anything you bought from us in the last 30 days, counted from the date of purchase. After 30 days, we give you store credit instead. Items bought on sale can't be refunded.

[ADD: what happens with sale items instead: store credit, exchange only, or no returns at all]

[ADD: whether the item has to be sent back, and in what condition]

[...]

</td></tr>
<tr><td>

**humanizer**

You can request a full refund within 30 days of your purchase date. We issue refunds to your original payment method.

[...]

Contact our support team with your order number and the reason for your return. We'll tell you the next steps.

[...]

</td></tr>
<tr><td>

**no-ai-slop**

If you're not satisfied with your purchase, you can request a full refund within 30 days of the purchase date. We issue refunds to your original payment method.

[...]

To start a request, contact our support team with your order number and the reason for the return.

[...]

</td></tr>
</table>

### Editing marketing copy

**Prompt:** "Edit this to sound human", followed by a paragraph about a Slack integration. It has two facts: it launched in May, and over 300 teams use it.

<!-- sample: longform-03-edit -->
<table>
<tr><th>Without YAH</th><th>YAH</th></tr>
<tr><td>

**Default**

Getting your team on the same page shouldn't be this hard. That's why we built our new Slack integration. It brings your team's updates, files, and conversations into the place you're already working, so less gets lost and more gets done. Since we launched it in May, more than 300 teams have started using it. Give it a try and see how it fits into your day.

</td><td rowspan="3">

Our new Slack integration connects your team and changes how you work together. More than 300 teams have adopted it since it launched in May.

Couldn't fix without more information:

- "connects your team and changes how you work together" keeps the original's "connects your team" and "game changer", but a reader can't check either. Say what the integration does (for example, which updates it posts to which Slack channels) and one thing a team can now do that it couldn't before.

[...]

</td></tr>
<tr><td>

**humanizer**

Our new Slack integration connects your team. Since launching in May, over 300 teams have adopted it.

</td></tr>
<tr><td>

**no-ai-slop**

Our new Slack integration connects your team. Since it launched in May, over 300 teams have adopted it.

</td></tr>
</table>

### A landing page with vague claims

**Prompt:** "Make this paragraph better for our landing page." It claims "significantly improves productivity", "trusted by industry leaders" and "robust features that users love", and gives one fact, the price.

<!-- sample: longform-04-edit-missing-info -->
<table>
<tr><th>Without YAH</th><th>YAH</th></tr>
<tr><td>

**Default**

Acme Notes helps teams capture, share, and find what matters, fast.

[...]

Trusted by teams at leading companies. Plans start at just $8 per user per month.

</td><td rowspan="3">

Acme Notes makes many teams significantly more productive. Industry leaders trust it, and users love its features. Plans start at $8 per user per month.

Couldn't fix without more information:

- "makes many teams significantly more productive": give the measure and its source, such as hours saved per week or a result from a named customer, and how many teams.

[...]

</td></tr>
<tr><td>

**humanizer**

Acme Notes plans start at $8 per user per month.

</td></tr>
<tr><td>

**no-ai-slop**

Acme Notes plans start at $8 per user per month.

</td></tr>
</table>

### A video script opening

**Prompt:** "Write a 2-minute YouTube script explaining why the sky is blue."

<!-- sample: script-01-sky-blue -->
<table>
<tr><th>Without YAH</th><th>YAH</th></tr>
<tr><td>

**Default**

*[Visual: Time-lapse of a bright blue sky with clouds drifting by.]*

**NARRATOR:**
Look up on a clear day and you'll see it: blue. Everywhere. But here's the strange part: sunlight isn't blue. So why is the sky?

[...]

</td><td rowspan="3">

[VISUAL: bright blue sky over sand dunes, no water anywhere in frame]
Ask why the sky is blue, and a lot of people will tell you it's reflecting the ocean. So how is the sky over the Sahara just as blue, hundreds of miles from any sea?

The answer starts with sunlight.

[...]

</td></tr>
<tr><td>

**humanizer**

*[Visual: Time-lapse of a bright blue sky with clouds drifting by.]*

NARRATOR:
Look up on a clear day and you'll see blue everywhere. But sunlight isn't blue. So why is the sky?

[...]

</td></tr>
<tr><td>

**no-ai-slop**

*[Visual: Time-lapse of a bright blue sky with clouds drifting by.]*

NARRATOR:
Look up on a clear day and you'll see it: blue. Everywhere. But sunlight isn't blue. So why is the sky?

[...]

</td></tr>
</table>

### A talk intro in your voice

**Prompt:** a short writing sample, then "Write a 150-word intro for my conference talk about moving CI from Jenkins to GitHub Actions." The facts: four months, 120 pipelines, average build from 18 minutes to 7.

<!-- sample: voice-02-talk-intro -->
<table>
<tr><th>Without YAH</th><th>YAH</th></tr>
<tr><td>

**Default**

Short version: we moved our CI from Jenkins to GitHub Actions, and it was worth it. Mostly.

It took four months. Not the four weeks I'd confidently promised. We had 120 pipelines, and every one of them had its own quirks, its own undocumented shell script, its own reason someone was scared to touch it. Some were easy. Some were not. A few we just deleted, and nobody noticed.

[...]

</td><td rowspan="3">

Short version: we moved our CI from Jenkins to GitHub Actions, and our builds got a lot faster.

It took four months. We had a hundred and twenty pipelines to move. Our average build used to take eighteen minutes. Now it takes seven.

[...]

This runs about 30 seconds spoken, roughly half of 150 words. Those three facts don't fill more without padding. To reach 150, send me why you left Jenkins, the hardest part of the four months, and whether anything got worse after the move.

</td></tr>
<tr><td>

**humanizer**

Short version: we moved our CI from Jenkins to GitHub Actions, and it was worth it. Mostly.

It took four months, not the four weeks I'd confidently promised. We had 120 pipelines, each with its own quirks and its own undocumented shell script that someone was scared to touch. Some were easy. Some were not. A few we just deleted, and nobody noticed.

[...]

</td></tr>
<tr><td>

**no-ai-slop**

Short version: we moved our CI from Jenkins to GitHub Actions, and it was worth it. Mostly.

It took four months. Not the four weeks I'd confidently promised. We had 120 pipelines, and every one of them had its own quirks, its own undocumented shell script, its own reason someone was scared to touch it. Some were easy. Some were not. A few we just deleted, and nobody noticed.

[...]

</td></tr>
</table>
<!-- /sample -->

## Research

The rules come from published research and writing guidance. The weakest part is video scripts: that advice comes from creators describing their own work, not from retention studies, so the script rules are defaults.

- Models write the most likely wording, so specific facts get smoothed into generic claims. This is why YAH starts with the reader and the facts instead of only scrubbing words.
- Flagged words fade and structure stays. After "delve" was flagged, its use in arXiv abstracts dropped while "significant" kept rising, so the pattern catalog leads with sentence and paragraph shapes.
- People who use LLMs a lot spot AI text well, and detectors often flag non-native English writers by mistake. Beating detectors is not a goal.
- Google's guidance asks for first-hand experience and original information. YAH marks missing experience with a placeholder instead of inventing it.
- Answer first, plain words, concrete examples and small steps come from Minto, Orwell, Graham, Rosenshine and Mayer.

YAH has not had a blind read by people yet. The results so far are in [`evals/RESULTS.md`](evals/RESULTS.md).

## Credits & Sources

YAH adapts these two skills (both MIT; their notices are in [`NOTICE`](NOTICE)):

- [blader/humanizer](https://github.com/blader/humanizer) by Siqi Chen: the structure and many patterns of the tell catalog, the rule that a writing sample overrides the style rules, and the rule that a rewrite never adds a fact.
- [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop) by Peter Yang: the colon-reveal, synonym-cycling, faux-insight and summary-ending patterns, the "telling the reader what to notice" pattern, the portability test for filler, and parts of the word lists.

Sources behind the rules:

- Wikipedia, [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), WikiProject AI Cleanup.
- Geng, M. and Trotta, R. (2025). [Human-LLM coevolution: evidence from academic writing](https://arxiv.org/abs/2502.09606).
- Russell, J., Karpinska, M. and Iyyer, M. (2025). [People who frequently use ChatGPT for writing tasks are accurate and robust detectors of AI-generated text](https://arxiv.org/abs/2501.15654). ACL 2025.
- Liang, W., Yuksekgonul, M., Mao, Y., Wu, E. and Zou, J. (2023). [GPT detectors are biased against non-native English writers](https://arxiv.org/abs/2304.02819). *Patterns*.
- Google Search Central. [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
- Orwell, G. (1946). [Politics and the English language](https://www.orwellfoundation.com/the-orwell-foundation/orwell/essays-and-other-works/politics-and-the-english-language/).
- Graham, P. (2021). [Write simply](https://paulgraham.com/simply.html).
- Rosenshine, B. (2012). [Principles of instruction](https://www.aft.org/sites/default/files/Rosenshine.pdf). *American Educator*.
- Muller, D. (2008). *Designing effective multimedia for physics education*. PhD thesis, University of Sydney. I confirmed the title but haven't read the thesis.
- Minto, *The Pyramid Principle*; Zinsser, *On Writing Well*; Pinker, *The Sense of Style*; Mayer, *Multimedia Learning*. Cited from my research notes, not re-read for this README.

## License

MIT. See [`LICENSE`](LICENSE). [`NOTICE`](NOTICE) lists the projects YAH adapts.
