# Reference First

Do not design substantial functionality from a blank slate when mature
implementations, specifications, libraries, previous projects, or reference
systems can cheaply reveal established solutions, edge cases, tests, and
architectural patterns.

Direct copying is one possible outcome of this — not the goal. The goal is
to inherit *solved thinking*, whether or not any code ends up copied.

## Process

1. **Check this repository.** Does something equivalent already exist here?
   → REUSE it directly.
2. **Check the project reference registry** (`references/INDEX.md` in this
   project/family) for domain-specific known-good sources — prior projects
   in the same space, their models, safeguards, tests.
3. **Check the global reference registry** (`~/.agents/references/INDEX.md`)
   for general known-good libraries/patterns that aren't project-specific.
4. **Check installed/mature packages.** Is this a solved problem in a
   well-maintained library already in reach?
5. **Search externally** only if 1–4 turn up nothing suitable, with a fixed,
   escalating budget. Stop as soon as implementing locally is clearly
   cheaper than continuing to search.
6. For each candidate found, understand **how** it solves the problem before
   deciding what to do with it:
   - input validation / normalisation
   - core algorithm or data model
   - edge cases it guards against (its tests are often more valuable than
     its source)
   - architecture / decomposition

A found reference may reveal a **constraint**, not just an implementation
(e.g. "this kind of page needs unique local evidence or it shouldn't get a
slug"). When it does, prefer enforcing it as strongly as the target project
allows:

```
BEST → type system prevents the mistake
     → tests/build gate prevents the mistake
     → architecture makes the mistake difficult
     → project AGENTS.md explicitly prohibits it
     → this skill's general procedure
WORST → prose documentation nobody re-reads
```

Don't stop at writing the rule down if the project can enforce it instead.

## Decide the mode of reuse

| Mode | When |
|---|---|
| DEPEND | Mature, actively maintained package fits as-is |
| VENDOR | Need the source under our control/stability, not just the package |
| EXTRACT | Only 50–200 self-contained lines are valuable |
| FORK | Whole application already solves most of the problem |
| ADAPT | Copy, then modify to spec |
| TRANSLATE | Good implementation, wrong language/stack — port the pattern, not the code |
| REFERENCE | Learn the architecture/edge cases, write your own implementation |
| REJECT | Reuse would increase total complexity — write it locally |

**Stop rule:** if no clearly superior reusable reference is found quickly,
implement locally. Do not conduct open-ended research merely to avoid
writing code.

**Complexity rule:** reuse must reduce total system complexity, not merely
reduce how much code the agent has to generate. Estimate useful-code %,
removal-required %, dependency count, and license before committing to
FORK or VENDOR.

## When acquiring something (EXTRACT / VENDOR / FORK / ADAPT)

1. Check license compatibility before copying anything.
2. Acquire into `.scratch/reference/` and run it / its tests before
   modifying, where practical.
3. Classify its contents: KEEP / REMOVE / MODIFY / ADD.
4. Remove unnecessary functionality before adding new functionality.
5. Preserve useful upstream tests; add regression tests for changed
   behaviour.
6. Record provenance in `docs/provenance/<name>.md`:
   - source repository
   - commit/version
   - license
   - files/functions used
   - local modifications
   - why reused

## Only now

Write new implementation code for the gaps that remain after this process —
not before it.
