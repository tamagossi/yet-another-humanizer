---
case: answers-01-cdn-brief
mode: answers
requirements: R.1, R.4, R.6
---

# answers-01-cdn-brief

## Prompt

```txt
Explain what a CDN is. Show me your brief before the answer.
```

## What to check

Brief appears only because it was asked for; answer first; concrete case before the term.

## Default output

#### Brief

**Goal:** Explain what a CDN (Content Delivery Network) is in a clear, accessible way.

**Audience:** Someone with general tech familiarity who may not know networking details.

**Plan:**
1. Give a one-sentence definition.
2. Explain the problem a CDN solves (distance and load).
3. Describe how it works (edge servers, caching, routing).
4. List the main benefits.
5. Mention common examples and when you'd use one.

**Tone:** Clear, friendly, moderately detailed, with an analogy to make it concrete.

---

#### What Is a CDN?

A **CDN (Content Delivery Network)** is a geographically distributed network of servers that stores copies of website content and delivers it to users from a location close to them.

##### The Problem It Solves

Imagine your website is hosted on a single server in New York. A visitor in New York loads it quickly, but a visitor in Tokyo has to wait for data to travel across the world and back. That distance adds delay (called **latency**). On top of that, if thousands of people visit at once, that single server can become overloaded.

##### How It Works

1. **Edge servers:** A CDN operates many servers, called *edge servers* or *points of presence (PoPs)*, in data centers around the world.
2. **Caching:** These edge servers store (cache) copies of your static content, such as images, videos, CSS, JavaScript files, and sometimes full HTML pages.
3. **Smart routing:** When a user requests your site, the CDN routes the request to the nearest or best-performing edge server.
4. **Origin fallback:** If the edge server doesn't have the requested content (a "cache miss"), it fetches it from your main server (the *origin*), delivers it to the user, and keeps a copy for the next visitor.

**Analogy:** Think of a CDN like a chain of local warehouses. Instead of shipping every package from one central factory, a company stocks popular items in warehouses across the country so customers get their orders faster.

##### Key Benefits

- **Faster load times:** Content travels a shorter distance.
- **Reduced server load:** The origin server handles far fewer requests.
- **Better reliability:** If one edge server goes down, others can take over.
- **Scalability:** Handles traffic spikes (like a viral post or product launch) more gracefully.
- **Security:** Many CDNs offer DDoS protection, web application firewalls, and TLS/SSL handling.
- **Lower bandwidth costs:** Caching reduces the amount of data your origin has to serve.

##### Common Examples

- Cloudflare
- Akamai
- Amazon CloudFront
- Fastly
- Google Cloud CDN
- Azure Front Door / Azure CDN

##### When Should You Use One?

A CDN is useful for almost any website with users in more than one region, and especially for sites that serve lots of media, have heavy or unpredictable traffic, or need strong uptime and security. Many hosting platforms (like Vercel, Netlify, and Shopify) include a CDN by default.

**In short:** A CDN makes websites faster, more reliable, and more secure by serving content from servers close to each user instead of from one distant location.

## YAH output

Reader: someone who has heard "CDN" and wants to know what it does, with no networking background assumed.

Point: a CDN keeps copies of a website's files on servers near its visitors, so pages load faster and the site's own server sends less.

Details: a shop's server in Virginia, a visitor in Jakarta, a nearby copy in Singapore, how copies arrive and expire, and Cloudflare, Akamai and Amazon CloudFront as examples.

Stance: well-established general knowledge; no speed figures, since the gain depends on the site and where its visitors are.

A CDN (content delivery network) is a set of servers in many cities that keep copies of a website's files, so each visitor downloads them from a server nearby instead of from the site's own server.

Say an online shop runs on one server in Virginia. When someone in Jakarta opens a product page, every image and script on it travels about 16,000 km, and a single page can need dozens of files. If the shop uses a CDN, copies of those files also sit on a CDN server in Singapore, under 1,000 km from Jakarta, and the visitor's browser fetches them from there, so the page appears sooner.

The servers a CDN places around the world are called edge servers, and the shop's own server is the origin. An edge server gets its copies on demand. The first time a visitor near Singapore asks for a file, the edge server doesn't have it yet, so it fetches it from the origin, keeps a copy, and serves that copy to everyone nearby who asks later. The site owner decides how long a copy stays valid, so a new logo replaces the old one when the copy expires or when the owner clears it early.

Because edge servers answer most requests, the origin does less work too. If 5,000 people in Southeast Asia load the same product photo, the origin sends it to the Singapore edge server once instead of sending it 5,000 times.

A CDN helps most with files that are the same for every visitor, such as images, video, stylesheets and scripts. A page built for one logged-in person, like their shopping cart, usually still comes from the origin. Cloudflare, Akamai and Amazon CloudFront are widely used CDNs.
