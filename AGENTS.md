# Agent instructions

## Expo HAS CHANGED

Read the exact versioned docs at <https://docs.expo.dev/versions/v57.0.0/> before writing any code.

## Prefer self-documenting code over comments

Before writing a comment, try to make it unnecessary. Name the value, extract a named constant, or split out a well-named function instead.

Only write a comment when it carries information the code itself cannot:

- Why a non-obvious decision was made, especially when a simpler-looking alternative would be wrong.
- A constraint that comes from outside the file, such as a platform quirk, an upstream bug, or an API contract.

Never write a comment that restates the code, labels a section, or repeats what a well-named identifier already says.

## Keep each comment on one line

Never hard-wrap a comment across several lines, however long it gets. Prettier does not reflow comments, so a wrapped comment has to be rewrapped by hand every time it is edited, and the diffs touch lines that did not change. Let the editor soft-wrap instead.

If a comment is long enough that this feels wrong, the fix is to shorten it, not to wrap it.
