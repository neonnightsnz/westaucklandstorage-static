---
name: Astro Replit workflow
description: Astro 7 detects agent environments and backgrounds its dev server unless explicitly told to stay foreground.
---

Astro 7 should run in the Replit web workflow with `ASTRO_DEV_BACKGROUND=1` set on the command; otherwise the CLI backgrounds the server, the workflow finishes, and the preview loses port 5000.

**Why:** Astro 7 auto-detects agent environments and uses its background server mode, which conflicts with Replit workflow port tracking.

**How to apply:** Keep the web workflow command prefixed with `ASTRO_DEV_BACKGROUND=1` and keep Astro on Node 22+.