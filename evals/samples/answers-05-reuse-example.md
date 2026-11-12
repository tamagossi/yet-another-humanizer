---
case: answers-05-reuse-example
mode: answers
requirements: R.6
---

# answers-05-reuse-example

## Prompt

**Turn 1:**

```txt
What is a hash map?
```

**Turn 2:**

```txt
So what happens when two keys land in the same spot?
```

## What to check

The follow-up builds on the example from the first answer.

## Default output

##### Turn 1

A **hash map** (also called a hash table, dictionary, or associative array) is a data structure that stores **key-value pairs** and lets you look up a value by its key very quickly, typically in **O(1)** average time.

#### How It Works

1. **Hash function:** When you insert a key, the hash map runs it through a *hash function*, which converts the key into a number (the hash code).
2. **Bucket index:** That number is mapped to an index in an underlying array, usually with something like `hash(key) % array_size`. Each slot in the array is called a *bucket*.
3. **Store the value:** The key-value pair is stored in that bucket.
4. **Lookup:** To retrieve a value, the hash map hashes the key again, goes straight to the same bucket, and returns the value. No need to search through every item.

##### Example

```python
phone_book = {}
phone_book["Alice"] = "555-1234"
phone_book["Bob"] = "555-5678"

print(phone_book["Alice"])  # 555-1234
```

Behind the scenes, `"Alice"` is hashed to some index (say, 3), and `"555-1234"` is stored there. Looking up `"Alice"` later hashes to 3 again and finds the value immediately.

#### Collisions

Sometimes two different keys hash to the same bucket. This is called a **collision**. Common ways to handle it:

- **Chaining:** Each bucket holds a list (or another structure) of all entries that land there.
- **Open addressing:** If a bucket is taken, the map probes for another empty slot (e.g., linear probing, quadratic probing, double hashing).

#### Resizing

As more items are added, collisions become more frequent. To keep operations fast, hash maps track a **load factor** (number of items divided by number of buckets). When it passes a threshold (often around 0.75), the map allocates a bigger array and **rehashes** all existing entries into it.

#### Time Complexity

| Operation | Average | Worst case |
|---|---|---|
| Insert | O(1) | O(n) |
| Lookup | O(1) | O(n) |
| Delete | O(1) | O(n) |

The worst case happens when many keys collide, but with a good hash function and resizing, it's rare in practice.

#### Key Properties

- Keys must be **unique**; inserting an existing key usually overwrites its value.
- Keys must be **hashable** (and generally immutable, so their hash doesn't change).
- Traditionally **unordered**, though some implementations (like Python's `dict` since 3.7, or Java's `LinkedHashMap`) preserve insertion order.

#### In Different Languages

- **Python:** `dict`
- **JavaScript:** `Map` (and plain objects)
- **Java:** `HashMap`, `Hashtable`
- **C++:** `std::unordered_map`
- **Go:** `map`
- **C#:** `Dictionary<TKey, TValue>`

#### Common Uses

- Caching results (memoization)
- Counting occurrences (e.g., word frequency)
- Indexing data by ID for fast lookup
- Removing duplicates
- Implementing sets

In short, a hash map trades a bit of extra memory for extremely fast lookups by key.

##### Turn 2

When two different keys hash to the same bucket, that's called a **collision**. It's unavoidable in practice, because there are far more possible keys than there are buckets. Hash maps handle collisions in one of two main ways.

#### 1. Separate Chaining

Each bucket holds a small collection (usually a linked list, sometimes a tree) of all the entries that hash there.

Using the phone book example, say both `"Alice"` and `"Carol"` hash to bucket 3:

```
Bucket 3: [("Alice", "555-1234")] -> [("Carol", "555-9999")]
```

- **Insert:** Hash the key, go to the bucket, and add the pair to the list (or update it if the key is already there).
- **Lookup:** Hash the key, go to the bucket, then walk the list comparing keys until you find a match.
- **Delete:** Find it in the list and remove it.

This is why hash maps compare keys for **equality** after hashing: the hash gets you to the right bucket, but the equality check finds the right entry within it.

**Real-world note:** Java's `HashMap` uses chaining, and since Java 8, if a single bucket's list grows past 8 entries, it converts that list into a balanced tree so lookups in that bucket go from O(n) to O(log n).

#### 2. Open Addressing

All entries live directly in the array itself, with no lists. If the target bucket is occupied, the map **probes** for another open slot according to a fixed rule.

If `"Alice"` is already in bucket 3 and `"Carol"` also hashes to 3:

- **Linear probing:** Try 4, then 5, then 6... until an empty slot is found. Simple, but tends to create clusters of filled slots.
- **Quadratic probing:** Try 3+1², 3+2², 3+3²... which spreads entries out more.
- **Double hashing:** Use a second hash function to decide the step size, which reduces clustering further.

For lookup, the map follows the same probe sequence until it either finds the key or hits an empty slot (which means the key isn't there).

**Deletion is trickier** here: you can't just empty the slot, or later lookups might stop early and miss keys further along the probe sequence. Implementations usually leave a "tombstone" marker instead.

**Real-world note:** Python's `dict` uses open addressing with a pseudo-random probing scheme.

#### Why Collisions Affect Performance

- With few collisions, each bucket has 0 or 1 entries, and operations stay O(1).
- With many collisions, a lookup may have to check many entries, degrading toward O(n) in the worst case (for example, if every key landed in the same bucket).

#### How Hash Maps Keep Collisions Low

- **Good hash functions** spread keys evenly across buckets.
- **Resizing:** When the load factor gets too high, the map grows its array (often doubling it) and rehashes everything, which spreads entries back out.
- **Randomized hashing:** Some languages (like Python for strings) add a random seed to hashes so attackers can't deliberately craft keys that all collide, a type of denial-of-service attack.

#### Quick Comparison

| | Separate Chaining | Open Addressing |
|---|---|---|
| Where entries live | Lists/trees in each bucket | Directly in the array |
| Handles high load factor | Gracefully | Degrades quickly; needs resizing sooner |
| Memory | Extra overhead for pointers | More compact |
| Cache performance | Worse (pointer chasing) | Better (contiguous memory) |
| Deletion | Simple | Needs tombstones |

So in short: when two keys land in the same spot, the hash map either **stacks them together in that bucket** (chaining) or **finds them another nearby spot** (open addressing), and it always compares the actual keys to make sure it returns the right value.

## YAH output

##### Turn 1

A hash map stores pairs of keys and values, and finds the value for a key in about the same time whether it holds ten pairs or ten million.

Say you're storing phone numbers by name. The map starts as an array of, say, 8 empty slots, called buckets. To store `"ana" → "555-0101"`, it runs `"ana"` through a hash function, which turns any key into a number. Suppose that number is 1,859 (I'm making these values up). The map takes the remainder after dividing by 8, which is 3, and puts the pair in bucket 3.

To look up `"ana"` later, it does the same math, gets 3 again, and goes straight to bucket 3. It never checks the other buckets, which is why the lookup doesn't slow down as the map fills.

Most languages have one built in: `dict` in Python, `Map` in JavaScript, `HashMap` in Java.

##### Turn 2

They share bucket 3, and the map tells them apart by comparing the keys stored there. Two keys landing in the same bucket is called a collision.

Say `"budi"` also hashes to a number that leaves remainder 3. I said earlier that a lookup goes straight to bucket 3 and stops. That was simplified: it goes to bucket 3 and then checks the stored key, which is why the map keeps the key next to the value. There are two common ways to make room for `"budi"`.

With chaining, each bucket holds a short list. Bucket 3 holds both `("ana", "555-0101")` and `("budi", ...)`. Looking up `"budi"` goes to bucket 3, sees `"ana"`, doesn't match, moves to the next entry, and finds `"budi"`. Java's `HashMap` works this way.

With open addressing, every bucket holds one pair, so `"budi"` goes into the next free bucket, say 4. Looking up `"budi"` checks bucket 3, finds `"ana"`, and keeps probing until it finds `"budi"`. Python's `dict` uses a version of this, with a probing order more scattered than "the next bucket".

Either way, lots of collisions would make lookups slow, so the map grows before it gets too full. When the 8 buckets fill past a set point, it makes a bigger array, for example 16 buckets, and places every pair again. With more buckets, `"ana"` and `"budi"` may land in different ones, and each bucket holds fewer pairs on average.
