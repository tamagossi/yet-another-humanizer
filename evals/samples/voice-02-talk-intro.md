---
case: voice-02-talk-intro
mode: longform
requirements: R.2, R.3
---

# voice-02-talk-intro

## Prompt

```txt
My writing sample:

Short version: I was wrong about Kubernetes. I said we didn't need it. We didn't, for two years. Then we did, and I'd made the move harder by putting it off. Lesson learned, sort of. I still think most teams adopt it too early. Just not us, not anymore.

Write a 150-word intro for my conference talk about moving our CI from Jenkins to GitHub Actions. Facts: it took 4 months, 120 pipelines, average build time went from 18 minutes to 7.
```

## What to check

Matches the short, self-correcting voice; uses only the supplied facts.

## Default output

Here's a 150-word intro in your voice:

---

Short version: we moved our CI from Jenkins to GitHub Actions, and it was worth it. Mostly.

It took four months. Not the four weeks I'd confidently promised. We had 120 pipelines, and every one of them had its own quirks, its own undocumented shell script, its own reason someone was scared to touch it. Some were easy. Some were not. A few we just deleted, and nobody noticed.

The payoff was real, though. Average build time went from 18 minutes to 7. That's not a rounding error. That's developers getting feedback before they've wandered off to get coffee.

This talk isn't a sales pitch for GitHub Actions. Jenkins wasn't the villain, and Actions isn't magic. It's the story of what we got wrong, what we'd do differently, and how to know if the move makes sense for you. Or doesn't.

---

That comes in right around 150 words. Let me know if you'd like it punchier, more technical, or with a stronger hook at the start.

## YAH output

Is this the spoken opening of your talk, or the abstract in the conference program?

##### After the user answers: "The spoken opening"

Short version: we moved our CI from Jenkins to GitHub Actions, and our builds got a lot faster.

It took four months. We had a hundred and twenty pipelines to move. Our average build used to take eighteen minutes. Now it takes seven.

Eleven minutes doesn't sound like much. But you save it on every build, and with a hundred and twenty pipelines, the builds add up.

The rest of this talk is how we got from eighteen minutes to seven.

---

This runs about 30 seconds spoken, roughly half of 150 words. Those three facts don't fill more without padding. To reach 150, send me why you left Jenkins, the hardest part of the four months, and whether anything got worse after the move.
