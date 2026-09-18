# Frontend design refinement

Applied the `frontend-design` skill from https://github.com/anthropics/skills. Read the complete generated instructions from a temporary file. The supporting-files directory was `C:/Users/isaac/AppData/Local/Temp/skills-use-IE5Qnd/frontend-design`.

## Design plan

The audience is local boat, caravan and vehicle owners arriving through organic search and Google Maps. The page's job is to explain the yard, its price and limitations, then help an owner enquire or call.

Keep six existing palette anchors: navy `#082E54`, marine blue `#145693`, working blue `#128BFB`, pale blue `#A5D2FD`, paper `#F5F8FA` and ink `#12283D`. Retain Bebas Neue for the yard-sign headings and IBM Plex Sans for readable body text. Existing muted text and border tokens remain in use.

Keep the existing section order, column proportions, responsive grids and left alignment. The real boat photograph and condensed headline carry the identity. Secondary cards should be quiet enough to scan without competing with the photograph or enquiry action.

```text
[logo                         navigation / phone]
[headline + quote CTA          boat photograph]
[existing three-column cards and split sections]
[contact copy                  enquiry form]
```

## Critique before implementation

The earlier pass gave the information cards generic soft shadows and added photo scaling on focus. Existing global CSS also rounded every photograph, including images that meet the edges of split sections. Those treatments were less consistent with the saved reference's working-yard photography and flat geometry.

Revise those details rather than replace the layout. Keep the bright primary buttons, visible focus rings, actual photography and blue headline emphasis. The user's selected reference takes precedence over the skill's general advice against coloured headline phrases. Do not introduce a new font, decorative gradient, stock image, section or animation sequence.

## Changes

- Removed homepage information-card shadows. Interactive service cards now respond with a blue border.
- Removed service-photo zoom on hover and focus. Button feedback and FAQ state changes remain.
- Made homepage photograph corners square, matching the reference and the edges of split sections.
- Increased desktop hero top padding to give the text more clearance below the navigation.
- Set the hero proof line in sentence case with normal tracking for easier reading.
- Made outlined-button background and text switch together, avoiding a transitional dark-text-on-dark-background state.

All changes live in the homepage's scoped CSS. Existing elements, copy, routes, arrays, loops, form attributes and scripts are unchanged by this pass. The shared form retains its established contrast, labels and focus treatment.

## Verification scope

Use targeted viewport screenshots at 1440px and 390px. Compare the hero against the saved reference, inspect the revised card treatment and check outlined-button keyboard focus contrast. Check horizontal page overflow and run the repository build and site checks. Do not submit the form. Follow `browser-efficiency-rules.md` and stop after two unsuccessful browser attempts.
