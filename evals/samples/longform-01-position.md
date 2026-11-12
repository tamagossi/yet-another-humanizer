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

If your whole engineering team fits in one standup, run your backend as one app. I lead backend at a six-person startup. Last year we split our monolith into nine services. In March we merged them back into one app, and deploys went from about 40 minutes to 8.

[YOUR EXPERIENCE: why you split the monolith last year, who pushed for it, and what you expected to gain]

Microservices fix a problem between teams. When dozens of engineers share one codebase, they get in each other's way: one team's half-finished change holds up another team's release, and a deploy needs sign-off from people who have never read the code it ships. Splitting the system along team lines lets each team own a service and release on its own schedule.

That independence has a price. A function call becomes a network call that can time out or get a response the caller didn't expect. Each service needs its own build, deploy pipeline, logs and alerts. A feature that touches three services needs three changes, deployed in the right order, and a contract all three agree on. Large companies pay that price because the alternative, forty people queuing behind one release, costs them more.

A six-person team doesn't have that queue. Six people can agree on a release by talking to each other, so splitting the code buys almost nothing, and you still pay every cost above. You pay it with fewer hands, too. On a team that small, whoever builds features also maintains every pipeline and chases every failed call between services.

[YOUR EXPERIENCE: one specific time the nine services slowed you down, such as a change that had to be deployed across several services in order, or an incident that started in a call between two of them]

Our deploys now take about 8 minutes, down from about 40. [ADD: how often you deploy, so readers can see what the saved time adds up to over a week]

Deploy time shapes habits. When a deploy takes 40 minutes, people tend to bundle changes so they wait less often, and a big bundle is harder to debug when something breaks. At 8 minutes, shipping one small change and watching it is cheap enough to do several times a day.

[YOUR EXPERIENCE: how long the merge back took and the hardest part of it]

You can keep clean boundaries inside one app. Give each area of the product its own module with a small public interface, and don't let modules read each other's tables. You get one build and one deploy, and if a module later needs its own team or its own scaling, the seam to cut along is already there.

Split a service out when you can name the reason. Good reasons are a second team that keeps waiting on the first team's releases, or a component with very different needs, like a CPU-heavy worker that should scale separately from the API. Before you split, ask who will own the new service. If the answer is the same six people, keep one app.
