# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read this

Read `CONTEXT.md` at the repo root when it exists.

If it doesn't exist, proceed silently. Don't flag its absence or suggest creating it upfront. The `/domain-modeling` skill creates it lazily when terms or decisions actually get resolved.

## Use the glossary's vocabulary

When your output names a domain concept in an issue title, refactor proposal, hypothesis, or test name, use the term as defined in `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, either you're inventing language the project doesn't use or there's a real gap to note for `/domain-modeling`.
