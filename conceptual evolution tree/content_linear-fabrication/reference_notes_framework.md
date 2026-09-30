# Reference Notes — Linear Fabrication Sankey

## Purpose
These references guide the visual language and conceptual framing. They should not be copied literally.

The diagram should frame a problem condition: conventional linear fabrication tends to extract matter, stabilise it, impose predetermined form, move it through use, and terminate it as waste.

## `Linear Fabrication.png`
Use as a conceptual/content reference only.

Carry forward:
- extract → make → consume → dispose
- land degradation
- resource extraction
- intensive production
- long transportation
- imposed form
- rigid / linear processes
- overconsumption
- damage / decline / end-of-life
- hazardous and non-recyclable outputs
- lack of recovery infrastructure
- exploitation and toxicity

Do not copy the collage aesthetic.

## `Mycelia Fabric_Cardboard to Mycelium Based Products_2022.gif`
Use as the primary visual and animation precedent.

Desired qualities:
- elegant network of smooth, continuous flows
- many thin parallel strands rather than a default chunky Sankey
- clear directionality
- restrained monochrome base drawing
- colour used selectively to animate or identify active streams
- loops and recirculation legible through path geometry
- composition reads as a designed system map, not only a chart

Important difference:
The precedent demonstrates circularity and productive reuse. The Linear Fabrication Sankey should show:
- dominant one-way throughput
- branching waste streams
- dead ends
- weak or marginal recovery loops
- consequences leaving the apparent boundary of the product system

## EPFL Circular Gangbuk / Sewoon studio
Use as a systems-thinking precedent.

Relevant framing:
- material flows can be mapped across production, distribution, use, waste and re-entry
- a Sankey can connect material systems to wider spatial, social and ecological consequences
- the diagram can expose where flows are interrupted, redirected or re-entered

For this project, the emphasis is the problem condition rather than successful circularity.

## `Carbon Cycle.png`
Use as a future conceptual contrast, not as a style reference for this first diagram.

## Tree / ecology references
Files:
- `01_Tree Section.png`
- `02_Tree Nutrient Transport.png`
- `03_Tree Fungi Relationship.png`
- `The choice_Azzurra Pini.jpeg`

Reserve these for the later ecological relationship Sankey.

## OXMAN — ALEF
ALEF is relevant because it explicitly works across molecular and ecosystem scales and studies chemical signalling, bVOCs, sensing, engineered biological communication and polycultures.

It is not accurate to describe ALEF as only monitoring. The supplied text also describes active gas-phase induction, engineered bacteria, biochemical communication networks and possible bioremediation responses.

The useful distinction is:
ALEF links scales through measurement, simulation, sensing and engineered biochemical signalling.

The conceptual evolution work here is interested in whether scales can be related through ongoing stimulus modulation and reciprocal response, so that interaction itself becomes the connective mechanism between materials, bodies, ecologies and governance.

For the later ecological Sankey, the goal is therefore not merely to show data collected at several scales, but relationships formed and continuously renegotiated across scales through stimuli, response and exchange.

## Core contrast

### Linear Fabrication
- matter treated as passive resource
- predetermined form imposed
- interaction narrowed or removed after fabrication
- fixed product boundaries
- prescribed lifecycle
- dominant one-way throughput
- waste and harms externalised
- weak closure

### Ecological Relationships
- matter remains active and responsive
- form emerges through ongoing environmental interaction
- stimuli continuously modify growth and behaviour
- boundaries are open and relational
- multiple timescales coexist
- resources, signals and matter circulate
- relationships may be reciprocal and mutually beneficial
- interaction can cross scales

The Linear Fabrication Sankey should establish the first condition clearly before the ecological diagram is developed.

## Energy as a second input

Show energy entering the system alongside material.

Represent energy as a supporting network feeding:
- extraction
- material processing
- fabrication / manufacture
- distribution
- recycling / recovery

Current source categories:
- electricity
- natural gas
- petroleum fuels
- other fuels / process heat

Electricity is an energy carrier rather than a primary source; its environmental impact depends on the generation mix.

The purpose is not to imply that recycling is always more energy-intensive than virgin production. It is to show that material-loop closure still requires energy for collection, sorting, transport and reprocessing.

This opens a later research question around:
- reducing virgin material throughput
- reducing the energy required to transform and repeatedly reform matter
- low-energy fabrication
- adaptive, living or bio-fabricated material systems

For now, all energy values in `linear_fabrication_data_energy.json` are speculative visual weights only.

# Data longevity and update architecture

The website-facing Sankey JSON is **not** the master database.

Use three layers:

1. **Source layer** — original ONS, Defra, Environment Agency, DESNZ, WRAP, API, XLSX/CSV and project-specific datasets.
2. **Curated evidence database** — cleaned records with metric, value, unit, geography, sector/SIC code, reference year, source ID, uncertainty and last verified date.
3. **Visualisation layer** — Sankey-ready nodes and links generated from the curated evidence database.

## Nested system boundaries

Use UK manufacturing as the parent framework, then nest case studies beneath it.

Example:

`uk_manufacturing`
→ `medical_devices`
→ `prosthetic_socket_case_study_01`

Each future record should support `scope_id` and `parent_scope_id`.

## Update model

Do not hard-code one year's values as permanent website truth.

Every real-world value should carry:
`data_status, unit, geography, reference_year, source_ids, source_record_id_or_table, last_verified`

Future refresh methods may include:
- API
- annual dataset discovery
- scheduled download and transform
- static research snapshot
- manual project-specific update

A future update script should check `linear_fabrication_source_registry.json`, detect newer releases, ingest or flag them, validate units/years/system boundaries, regenerate the Sankey JSON, and preserve older snapshots.

## Accounting rule

Do not combine datasets simply because they are all labelled “UK”. Material-flow, waste, energy and emissions datasets can use different years, geographies, industry classifications and accounting boundaries.

Where exact balancing is impossible, use selected quantitative anchors, clearly labelled estimates, or speculative visual weights.
