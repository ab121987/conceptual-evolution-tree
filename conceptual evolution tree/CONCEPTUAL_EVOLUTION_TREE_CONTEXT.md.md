# CONCEPTUAL_EVOLUTION_TREE_CONTEXT.md

## Purpose

This website is not a portfolio of finished projects.

It is a living map of design explorations, showing how artefacts mutate, branch, and generate concepts across scales, timeframes, and open/closed systems.

The website should help organise a body of design research practice where artefacts are used to generate concepts, not prove artefacts.

---

## Core Position

I make artefacts to generate concepts, not to prove artefacts.

The artefacts documented in this website may include diagrams, webpages, films, zines, sensor systems, databases, speculative interfaces, animations, talks, and prototypes.

These artefacts are not necessarily finished tools or validated systems. They are thinking devices that help reveal tensions, open questions, and future research trajectories.

---

## Website Aim

The first aim is to create a conceptual evolution tree.

The tree should show how projects, artefacts, and concepts evolve from one another.

Each node represents one project, artefact, exploration, or conceptual step.

Each branch represents a mutation, continuation, divergence, or conceptual development.

---

## Data Source

Use the exported CSV from the Excel database as the primary data source.

Each row in the CSV represents one project or exploration.

The key fields are:

- project_id
- project_title
- parent_project_id
- mutation
- status
- system_condition
- scale_of_interaction
- temporal_character
- relational_type
- artefact_type
- concept_tags
- what_it_helped_me_think
- what_question_it_opened
- possible_next_mutation
- webpage_slug

If exact column names differ slightly, infer the nearest match, but do not invent missing data.

---

## Tree Logic

Use `parent_project_id` to create the tree structure.

If `parent_project_id` is empty or marked as NA, treat the project as a root node.

If multiple projects share the same parent, show them as branches.

The tree should prioritise conceptual lineage over chronology.

---

## Visual Encoding

Suggested visual logic:

- Node = project / artefact / exploration
- Branch = mutation or conceptual development
- Node colour = system condition
- Node outline = artefact type
- Node size = status or presentation priority if available
- Hover panel = reflective notes
- Click = open project page if webpage_slug exists

Do not overcomplicate the first version.

---

## Hover Information

On hover, show:

- project title
- mutation
- system condition
- scale of interaction
- temporal character
- what it helped me think
- what question it opened
- possible next mutation

---

## Important Constraint

Do not build the full website yet.

The first task is only to test whether the CSV can generate a simple conceptual evolution tree homepage.

The website should remain lightweight, editable, and easy to expand.

---

## Research Framing

This tree is not a project management tool.

It is a designerly orientation device.

It helps show how research thinking evolves through making, reflection, mutation, and branching.

The aim is to make the development of concepts visible.

---
## Reference Resources

This is a link to a phylogentic tree, explaining the traditional structure and visual nature of the

https://www.digitalatlasofancientlife.org/learn/systematics/phylogenetics/reading-trees/

We are re appropriating this mapping strategy to suit our conceptual evolution of work and concepts.