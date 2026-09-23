# Agent instructions

Use this file as the starting point for project-specific instructions. Replace the placeholders below when adapting this template for a client project.

## Project overview

- Project name: [client/project name]
- Purpose: [what this project does]
- Primary audience: [who uses it]
- Important constraints: [known constraints]

## Development

- Install: [command]
- Develop: [command]
- Test: [command]
- Build: [command]

## Agent skills

### Issue tracker

Issues are tracked as local markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default triage labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

This is a single-context project. Read `CONTEXT.md` and consult `docs/adr/` for architectural decisions. See `docs/agents/domain.md`.

## Project-specific instructions

[Add conventions, workflows, and constraints for this project.]

## Engineering approach

Before designing substantial new functionality, follow the
Reference First skill.

Prefer proven implementations, established patterns, tests and
existing project code over designing from a blank slate.

Project-specific implementation and architecture rules in this
repository still take precedence.
