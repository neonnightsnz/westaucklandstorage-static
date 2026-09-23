# Test 1 — Benchmark Record

**Frozen:** 23 September 2026
**Framework version:** the 19-file framework as of 23 Sept 2026 (see `FRAMEWORK-HASH` below)

## Purpose

This is the regression fixture for the website strategy framework. Re-running the
same 342-byte brief against a changed framework and diffing the outputs is how
framework changes get evaluated. Subjective "this SKILL.md looks better" is not
a test.

## How to re-run

1. Copy `website-strategy-framework/` and this `BUSINESS-BRIEF.md` into a clean
   directory.
2. Give an agent the standard instruction:

   > Read website-strategy-framework/AGENTS.md and execute the framework for this
   > business. Do not ask me questions until you have completed all research that
   > can reasonably be done independently.

3. Diff the new `strategy/` against `strategy/` in this folder.

## The fixture

`BUSINESS-BRIEF.md` — 342 bytes, deliberately messy, no website or phone
supplied. The agent must discover the business by research.

Facts the agent has to find on its own:

- The business is real and has a live website
- Its phone number and address
- That it runs two parallel Location-page sets
- That the /hamilton/ set is near-duplicate content

## Regression questions

Ask these of the new output. Answers for this baseline are in the next section.

| # | Question |
|---|---|
| 1 | Did owner questions increase (i.e. did it ask more instead of assuming)? |
| 2 | Did unsupported assumptions increase? |
| 3 | Did it still detect the duplicate location architecture? |
| 4 | Did Stage 12 still reject inappropriate expansion? |
| 5 | Did it preserve the framework untouched? |
| 6 | Did the final plan improve? |
| 7 | Did execution become cheaper or faster? |

## Test 1 results (baseline)

**Outcome: zero interventions.** No correction was required from the human at
any point.

| Metric | Value |
|---|---|
| Elapsed | ~8h45 (see caveat) |
| Tool calls | 51 (17 shell) |
| External site fetches | 5 |
| Output files | 13 |
| Total output | 43,175 bytes |
| Owner questions asked | 11 (6 blocking) |
| Framework files modified | 0 |
| Framework files added | 0 |

**Caveat on elapsed time:** ~26 minutes of the run was a harness failure — a
sub-agent requested escalated network permission and blocked, because a sub-agent
has no approval channel. That is not a framework cost. The remainder was model
latency. **Do not treat 8h45 as the framework's real cost.**

**Caveat on attribution:** the sub-agent stalled; the strategy was completed in
the main session, which already knew the business from the stalled run's research.
A clean re-run will likely take longer and cost more than this baseline suggests.

### Regression answers

1. Owner questions: 11, all genuinely unanswerable by research.
2. Unsupported assumptions: 0 presented as fact. All marked `UNVERIFIED` /
   `ASSUMPTION` / `OPEN`.
3. Duplicate architecture: **detected.** Found both sets (37 + 36 = 73 pages for
   37 suburbs), and measured ~72% content overlap between siblings.
4. Stage 12: **rejected expansion.** Audited existing pages rather than
   generating new ones.
5. Framework preserved: **yes** — 19/19 files byte-identical, 0 added.
6. Plan quality: build-ready, priority-ordered, with explicit dependencies.
7. Cost: see caveats.

### Key findings this fixture should keep reproducing

- Two parallel Location-page sets competing for the same suburbs
- ~470-word pages against a 600-word minimum, ~72% within-set overlap
- Absence from all four independent Hamilton rankings
- Templated homepage copy ("an customer focused solution")
- Brands (Mitsubishi Electric, Daikin) not claimed on the site despite the owner
  naming them

### Known gaps in this baseline

- No search volume data (no keyword tool available) — intent priorities are
  inference, not measurement
- Core Web Vitals field data not captured (HTTP-only checks were possible; a
  browser was not)
- Metadata not checked across all 78 URLs

## Notes for Test 2

Track these, which Test 1 did not capture cleanly:

- Elapsed time, split into model latency vs. tool latency vs. blocked time
- Input and output tokens
- Web/search calls
- Browser/rendering calls
- Sub-agent calls
- Number of human interventions

A framework that produces excellent strategy at prohibitive cost still needs
optimisation. Test 1 proves capability, not efficiency.
