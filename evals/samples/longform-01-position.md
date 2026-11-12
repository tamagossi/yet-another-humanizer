---
case: longform-01-position
mode: longform
requirements: R.8, R.3
---

# longform-01-position

## Prompt

```txt
Write a 500-word blog post arguing that small teams should skip microservices. Context: I lead backend at a 6-person startup. Last year we split our monolith into 9 services. In March we merged them back into one app. Deploys went from about 40 minutes to 8.
```

## What to check

Position in the opening; uses only the supplied facts; placeholders where more first-hand detail is needed.

## Default output

### Why Small Teams Should Skip Microservices

Last year, my team made a decision that felt like the grown-up thing to do. We were a six-person startup with a monolith that was getting a little unwieldy, so we split it into nine microservices. We had read the blog posts. We had watched the conference talks. Netflix did it. Uber did it. Surely we should too.

In March, we merged all nine services back into a single application. Our deploy time dropped from about 40 minutes to 8. And that number is only the most visible part of what we got back.

Here's what I wish someone had told us before we started.

#### Microservices Solve an Organizational Problem You Don't Have

The real value of microservices isn't technical. It's organizational. They let large numbers of engineers work independently without stepping on each other. When you have 200 engineers across 30 teams, giving each team its own service with clear boundaries reduces coordination costs.

We had six people. We all sat in the same Slack channels. We already knew what everyone else was working on. We didn't have a coordination problem to solve, so we paid the cost of microservices without collecting the benefit.

#### The Hidden Tax Is Enormous

Splitting a monolith doesn't remove complexity. It moves it into places that are harder to see and harder to debug.

With nine services, a simple feature change often touched three or four of them. That meant coordinating multiple pull requests, multiple deploys, and careful versioning so nothing broke in between. Function calls became network calls, and network calls fail in ways function calls never do. We spent time on retries, timeouts, service discovery, and distributed tracing just to understand why a request was slow.

Local development got painful too. Running the full system on a laptop required a stack of containers and a fair amount of patience. New hires took noticeably longer to get productive.

And every one of those nine services needed its own CI pipeline, monitoring, alerts, and dependency updates. For a team our size, that maintenance overhead ate into the time we should have spent building the product.

#### What We Gained by Going Back

Since merging back into one app, we've seen:

- **Faster deploys:** From roughly 40 minutes to 8.
- **Simpler debugging:** One stack trace instead of a scavenger hunt across logs.
- **Easier refactoring:** Changing a boundary is a code change, not a migration project.
- **Quicker onboarding:** One repo, one app, one command to run it.

We didn't give up on good design. We still keep clear module boundaries inside the monolith. If a part of the system ever genuinely needs to scale or deploy independently, those boundaries will make it easier to extract later. That's the key: extract a service when you have a concrete reason, not because it's the architecture you think serious companies use.

#### The Bottom Line

If you're a small team, your biggest risk isn't that your architecture won't scale. It's that you'll run out of time or money before you find product-market fit. Every hour spent wrangling infrastructure is an hour not spent on your customers.

Start with a well-structured monolith. Keep it modular. Split things off only when real pain, not hypothetical future pain, tells you to. We learned that the hard way, so you don't have to.

## YAH output

### Small teams should skip microservices

If your whole engineering team fits around one table, keep your backend in one app. I lead backend at a six-person startup, and we tried it the other way. Last year we split our monolith into nine services. In March we merged them back into one app, and deploys went from about 40 minutes to 8.

#### Why we split

[YOUR EXPERIENCE: why you split the monolith last year, for example a scaling worry, a pattern someone brought from a bigger company, or advice you read, and who made the call]

#### What nine services cost six people

Every service needs its own build, deploy pipeline, configuration, logs and alerts. At a large company a platform team carries that work. On a team of six, it lands on the same people who are supposed to be shipping the product.

A change that touches two services stops being one pull request. You change the API, release the service that provides it, release the service that calls it, and keep the old and new versions working in between. Inside one app, the same change is an edited function signature and a single deploy.

Running the product on a laptop gets harder too. Someone has to maintain the script or compose file that starts every service with the right ports and environment variables, and keep it working as the services change.

Bugs get harder to trace. A function call becomes a network call, which can time out or fail halfway, and the error you see in one service often started in another.

[YOUR EXPERIENCE: one bug or release from the nine-service year that showed this cost, with roughly when it happened and how long it took to sort out]

#### What merging back changed

Our deploys dropped from about 40 minutes to 8. [ADD: what made the old deploys take 40 minutes, for example nine pipelines running in sequence, and what the single deploy does instead]

With 8-minute deploys, shipping a small change is cheap, so changes stay small. When something breaks in production, the fix goes out in minutes instead of most of an hour.

[YOUR EXPERIENCE: how long the merge back took, and anything that got harder after it, if anything did]

#### When services are worth it

Services pay off when separate teams need to release on their own schedules, or when one part of the system has to scale very differently from the rest. The first problem arrives with headcount. The second arrives with load you can measure. A team of six usually has neither.

You can still draw clear boundaries between modules inside one codebase and pay for only one deploy. If you're a small team weighing a split, write down the specific problem it would solve, then check whether a module boundary inside your current app solves it first.
