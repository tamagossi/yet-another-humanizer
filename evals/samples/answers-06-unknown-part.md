---
case: answers-06-unknown-part
mode: answers
requirements: R.7, R.3
---

# answers-06-unknown-part

## Prompt

```txt
Which Python version added the match statement, and what percentage of Python projects in production use it today?
```

## What to check

Answers the known part; says plainly the second part has no reliable figure; no invented statistic; no stacked qualifiers.

## Default output

**Python version:** The `match` statement (structural pattern matching) was added in **Python 3.10**, released in October 2021. It was introduced through PEP 634 (specification), PEP 635 (motivation and rationale), and PEP 636 (tutorial).

Here's a quick example:

```python
def handle(command):
    match command.split():
        case ["go", direction]:
            return f"Moving {direction}"
        case ["quit"]:
            return "Goodbye"
        case _:
            return "Unknown command"
```

**Percentage of production projects using it:** Unfortunately, I don't have a reliable figure for this, and I'm not aware of any authoritative source that measures it. There are a few reasons it's hard to pin down:

- **Production code is mostly private.** Most production codebases live in private repositories, so there's no comprehensive way to survey them.
- **Version adoption is a prerequisite.** A project can only use `match` if it requires Python 3.10 or later. Many projects, especially libraries, support older versions and therefore avoid newer syntax until those versions reach end of life.
- **"Uses it" is ambiguous.** Does one `match` statement anywhere in the codebase count, or does it need to be used regularly?

What can be said more generally:

- Adoption has been relatively **gradual**. Many developers continue to use `if`/`elif` chains or dictionary dispatch, and `match` tends to show up most in code that parses structured data, handles commands or ASTs, or works with nested data shapes.
- Usage has been **growing** as Python 3.8 and 3.9 have reached end of life and more projects set 3.10+ as their minimum version.

If you need actual numbers, some places to look:

- **The JetBrains / Python Software Foundation Python Developers Survey**, which reports on Python version usage (a useful proxy for how many projects *could* use `match`).
- **Analyses of public GitHub code**, for example using GitHub code search, Google BigQuery's public GitHub dataset, or tools that parse the ASTs of PyPI packages to count `match` statements.
- **PyPI download statistics** (via `pypistats` or the BigQuery PyPI dataset), which show Python version distribution among package installs.

Keep in mind that any of these would measure open-source or public code, which may not reflect private production systems.

## YAH output

Python 3.10 added the `match` statement (structural pattern matching, PEP 634), released in October 2021.

I don't know what percentage of production Python projects use it, and I don't know of any study that measures it, so any number I gave you would be a guess. The closest public data I know of is the annual Python Developers Survey from the PSF and JetBrains, which reports which Python versions developers use. That gives an upper bound: a project still on 3.9 or older can't use `match` at all.

## humanizer output

Input: the default output.

The `match` statement (structural pattern matching) was added in Python 3.10, released in October 2021. It came through PEP 634 (specification), PEP 635 (motivation and rationale), and PEP 636 (tutorial).

Here's a quick example:

```python
def handle(command):
    match command.split():
        case ["go", direction]:
            return f"Moving {direction}"
        case ["quit"]:
            return "Goodbye"
        case _:
            return "Unknown command"
```

I don't have a reliable figure for the percentage of production projects using it, and I don't know of an authoritative source that measures it. It's hard to pin down for a few reasons. Most production code lives in private repositories, so no survey can cover it. A project can only use `match` if it requires Python 3.10 or later, and many projects, especially libraries, support older versions and avoid newer syntax until those versions reach end of life. And "uses it" is ambiguous: does one `match` statement anywhere in the codebase count, or does it need to be used regularly?

In general, adoption has been gradual. Many developers still use `if`/`elif` chains or dictionary dispatch, and `match` shows up most in code that parses structured data, handles commands or ASTs, or works with nested data shapes. Usage has been growing as Python 3.8 and 3.9 have reached end of life and more projects set 3.10+ as their minimum version.

If you need actual numbers, three places to look:

- The JetBrains / Python Software Foundation Python Developers Survey reports on Python version usage, a useful proxy for how many projects could use `match`.
- Analyses of public GitHub code, for example using GitHub code search, Google BigQuery's public GitHub dataset, or tools that parse the ASTs of PyPI packages to count `match` statements.
- PyPI download statistics (via `pypistats` or the BigQuery PyPI dataset) show Python version distribution among package installs.

All of these measure open-source or public code, which may not reflect private production systems.

## no-ai-slop output

Input: the default output.

The `match` statement (structural pattern matching) was added in Python 3.10, released in October 2021. It came through PEP 634 (specification), PEP 635 (motivation and rationale), and PEP 636 (tutorial).

```python
def handle(command):
    match command.split():
        case ["go", direction]:
            return f"Moving {direction}"
        case ["quit"]:
            return "Goodbye"
        case _:
            return "Unknown command"
```

I don't have a reliable figure for the share of production projects using it, and I don't know of an authoritative source that measures it. Three things make it hard to pin down:

- Most production code lives in private repositories, so there's no way to survey it.
- A project can only use `match` if it requires Python 3.10 or later. Many libraries support older versions and avoid newer syntax until those versions reach end of life.
- "Uses it" is ambiguous. One `match` anywhere in the codebase might count, or it might need to be used regularly.

Adoption has been gradual. Many developers still use `if`/`elif` chains or dictionary dispatch, and `match` shows up most in code that parses structured data, handles commands or ASTs, or works with nested data. Usage is growing as Python 3.8 and 3.9 reach end of life and more projects set 3.10 as their minimum.

If you need actual numbers, look at:

- The JetBrains / Python Software Foundation Python Developers Survey, which reports Python version usage. That tells you roughly how many projects could use `match`.
- Analyses of public GitHub code, using GitHub code search, Google BigQuery's public GitHub dataset, or tools that parse the ASTs of PyPI packages to count `match` statements.
- PyPI download statistics (via `pypistats` or the BigQuery PyPI dataset), which show Python version distribution among package installs.

All of these measure open-source or public code, which may not reflect private production systems.
