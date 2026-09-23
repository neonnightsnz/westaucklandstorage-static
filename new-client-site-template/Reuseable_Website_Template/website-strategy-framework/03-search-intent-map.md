# Stage 3: Search Intent Map

**Goal:** translate real customer searches into page decisions, one row at a
time.

## Step 1: Gather the raw searches

Sources, in order of value:

1. Google Business Profile questions and message history
2. Phone-call and email enquiries ("how do I…", "do you…")
3. Reviews — the problem and the words used to describe it
4. Google Search Console queries, if the site has history
5. Google autocomplete and "People also ask"
6. The owner's own description of what customers ask
7. Competitor service and location page titles

## Step 2: Classify each search

| Intent | Example | Typical page |
|---|---|---|
| Informational | "How does a lithium battery system work?" | Advice article |
| Commercial investigation | "Best marine electrician for solar installation" | Comparison / pillar page |
| Transactional | "Book a marine electrical inspection" | Service page |
| Navigational | "Maritime Electrical phone number" | Contact page |
| Local service | "Marine electrician Auckland" | Service + location page |
| Urgent local | "Emergency electrician near me" | Urgent service page |

## Step 3: Build the map

One row per important search topic:

| Query grouping | Intent | Customer problem | Page type | Target URL | Priority |
|---|---|---|---|---|---|
| | | | | | |

Rules:

- Group near-duplicate queries into one topic — do not make one page per query.
- **Do not create a page because a keyword exists.** Create it only when it
  answers a real need or supports a genuine service.
- Where two topics share the same intent and customer, combine them into one
  stronger page rather than two thin ones.

## Step 4: Decide page vs. section

Ask: *could this be a section on an existing page?* For a local trade business
the answer is usually yes. Split into a new page only when the service, the
customer need, or the intent is **meaningfully different**.

## Step 5: Urgent vs. considered

Flag which topics are urgent. Urgent intent must lead with a phone number and
be reachable in one tap — not a multi-field form.

## Step 6: Spot repeating patterns (programmatic candidates)

Review the completed map for rows that share a structure with only the variable
changing. These are candidates for Stage 12 — **but only if the demand is real.**

| Pattern | Variable | Example |
|---|---|---|
| "[service] in [location]" | location | "marine electrician Auckland" |
| "[service] for [audience]" | audience | "marine electrician for boat owners" |
| "[X] vs [Y]" | competitor | "brand A vs brand B battery" |
| "what is [term]" | term | "what is a lithium battery system" |
| "[type] examples" | type | "marine rewiring examples" |

For each candidate pattern, note:

- **Valid combinations:** how many genuinely exist for this business?
- **Per-combination demand:** does anyone actually search this specific term,
  or only the generic head term?
- **Data available:** what makes each page different from the others?
- **Data tier:** proprietary › product-derived › user-generated › licensed ›
  public. Public data alone produces thin pages.

Do not proceed to Stage 12 on pattern alone. A pattern with no per-combination
demand or no differentiating data is a doorway-page factory.

## Step 7: Check for cannibalisation

Before finalising, scan the map for two rows that would compete for the same
query and intent. Common collisions:

- A generic service page and a location service page both targeting
  "[service] [city]"
- Two overlapping service pages ("electrical inspections" vs "electrical
  safety checks")
- A blog post and a service page chasing the same informational query

Where you find a collision, decide which page owns the query and make the other
support it (a section, an internal link, or a different angle). Two pages
targeting one intent split authority and usually both underperform.

## Output

A prioritised intent map covering the top 10–20 searches, each assigned to a
page type and a target URL — with programmatic candidate patterns flagged and
cannibalisation resolved.

---
Next: `04-sitemap-framework.md`
