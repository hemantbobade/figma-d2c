---
mode: agent
description: Fetch a Figma node using all three MCP tools and produce a structured DESIGN SUMMARY. Use this before any Figma-to-SDS conversion.
---

# Skill: figma-fetch

Fetch the Figma design at the given node URL using all three MCP tools in sequence, then produce a structured DESIGN SUMMARY.

## Instructions

1. Call `get_design_context` on the Figma node — extract component tree, annotations, variants, hidden nodes, codeDependencies
2. Call `get_screenshot` on the Figma node — visually understand layout, hierarchy, and visual intent
3. Call `get_variable_defs` on the Figma node — extract all design tokens (colors, spacing, typography, radius, shadows)

Then produce the following DESIGN SUMMARY — do **NOT** write any code:

---

## DESIGN SUMMARY FORMAT

```
Screen Name: <name of screen/frame>

Visual Overview:
- <1-2 sentence description of what this screen does and looks like>

Layout Structure:
- Direction: <horizontal / vertical / grid>
- Top-level sections: <list main regions e.g. Header, Hero, Content Grid, Footer>

Sections (repeat for each):
  Section: <name>
  ├── Layout: <Flex row/column / Grid / Section>
  ├── Components: <list all Figma components found>
  ├── codeDependencies: <list any codeDependencies returned by get_design_context>
  ├── Tokens Used:
  │   ├── Colors: <e.g. --sds-color-background-default-default>
  │   ├── Spacing: <e.g. 400, 800, 1600>
  │   └── Typography: <e.g. heading, body, small>
  ├── Annotations:
  │   ├── data-content-annotations: <exact text if present>
  │   └── data-interaction-annotations: <exact text if present>
  └── Hidden Nodes: <list nodes with hidden={true} and what prop they likely map to>

Design Tokens Summary:
  Colors: <list all unique color tokens>
  Spacing: <list all unique spacing values>
  Typography: <list all unique type styles>
  Radius: <list border radius tokens>
  Shadows: <list shadow tokens>

Responsive Notes:
  - <any breakpoint or mobile/desktop differences observed>

Questions / Gaps:
  - <anything ambiguous or missing that needs clarification>
```

## Rules
- Do NOT write TSX or CSS
- Do NOT skip annotations — they contain critical behavior requirements
- Hidden nodes (`hidden={true}`) are toggled props, not absent components — always note them
- If `get_design_context` returns `codeDependencies`, list them explicitly — they map directly to SDS component imports
