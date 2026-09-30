# SANKEY DATA LOGIC — Linear Fabrication

## Purpose

This file tells Codex how to interpret flow data and render the **Linear Manufacturing** Sankey.

The diagram is not a decorative network. It is a data-driven flow system.

The seven conceptual stages are:

1. Virgin Resources
2. Extraction
3. Material Processing
4. Fabrication / Manufacture
5. Distribution
6. Use / Consumption
7. End of Use

These are the main transformation stages used to organise a much more detailed economy.

---

## What was learned from the downloaded MIT Sankey source code

The downloaded `impactclimate.mit.edu.zip` is useful.

The relevant implementation is:

`wp-content/themes/mcsc/js/sankey/app.js`

and its Sankey-specific stylesheet is:

`wp-content/themes/mcsc/js/sankey/style.css`

The MIT implementation does the following:

- loads a `nodes.csv` file to define node columns/order;
- loads a `flows.csv` file containing individual Source → Target flow records;
- creates one SVG path for each flow record;
- calculates flow thickness from `Quantity`;
- calculates each node's size from its incoming/outgoing flow totals;
- uses cubic Bézier curves for normal forward flows;
- uses custom arc routing for return/looping flows and losses;
- supports optional `Dummy 1`, `Dummy 2`, `Dummy 3` "Holder" nodes to route a flow through intermediate positions;
- uses hover tooltips to show source, target, flow ID and quantity.

In the source code, the key logic is effectively:

`flow thickness = quantity × visual scale`

and:

`node flow value = max(total incoming, total outgoing)`

The original MIT nodes are rectangular bars.

This is close to the logic required here.

### Important difference for our version

We will use **rounded rectangular transformation nodes**.

We must also be stricter than the MIT test diagram about incompatible units:
material mass and energy must remain separate quantitative families.

Do not add `Mt + Mtoe`, `tonnes + kWh`, or any other incompatible units to create a single physical quantity.

---

# 1. Keep `mit_sankey_test_flows.csv` unchanged for the first test

Do **not** rewrite its values yet.

Use it as a reference/test dataset to prove that:

- quantities control ribbon thickness;
- flows split and join correctly;
- loops can return to earlier stages;
- terminal flows end;
- tooltips expose the underlying records.

The CSV may contain note rows before the real header.

Find the row containing:

`Source, Target, ID, Quantity, Type, Unit, Reference`

and ignore blank/note rows above it.

Required columns:

- `Source`
- `Target`
- `ID`
- `Quantity`
- `Type`
- `Unit`
- `Reference`

Optional future columns:

- `Color`
- `Dummy 1`
- `Dummy 2`
- `Dummy 3`
- `Source URL`
- `Data Status`

If `Color` is absent, assign colour from the flow family/type in code.

If Dummy/Holder columns are absent, route the ribbon automatically.

---

# 2. One data record becomes one addressable ribbon

A row such as:

`Oil and gas extraction → Oil refining | Crude oil feedstocks | 4446 | Energy | mtoe`

means:

- source = Oil and gas extraction
- target = Oil refining
- identity = Crude oil feedstocks
- quantity = 4446
- family = Energy
- unit = mtoe

The renderer creates an individually addressable SVG ribbon/path object for that flow.

The ribbon must retain a reference to its source data record so hover/click can retrieve:

- Source
- Target
- ID
- Quantity
- Type
- Unit
- Reference
- future Source URL
- future Data Status

---

# 3. Ribbon width must come from data

Do not give every connection the same width.

For compatible flows:

`ribbon thickness ∝ Quantity`

Example:

- Extraction → Processing = 80 Mt
- Extraction → Waste = 15 Mt
- Extraction → Other losses = 5 Mt

The node receives/handles 100 Mt of material.

It divides visually into:

- 80% continuing material ribbon;
- 15% waste branch;
- 5% other-loss branch.

The branch is not a decorative line attached to the node.

It is an outgoing ribbon whose thickness is determined by its own quantity.

---

# 4. Transformation-node logic

The seven main stages are transformation nodes.

At each transformation node:

**incoming flows**
→ are received
→ transformed / redistributed
→ split into outgoing flows.

A node may receive:

- material;
- energy;
- recovered material;
- other compatible inputs.

It may output:

- continuing useful material;
- waste;
- emissions;
- recovered material;
- terminal losses.

The dataset defines the relationships.

Codex must not invent output relationships merely to make the diagram look balanced.

---

# 5. Node shape and size

Use rounded rectangles, not circles.

The diagram reads left to right.

The long dimension of each main transformation node should scale to the size of the **main compatible throughflow bundle**, normally material mass.

Recommended logic:

`node material length = max(total incoming material thickness, total outgoing material thickness)`

Energy ribbons attach through a separate port/lane.

Do **not** calculate:

`material mass + energy = node size`

because these have incompatible units.

The rectangle should visually span the material ribbons that enter/leave it, while leaving clear attachment positions for energy and other flow families.

Use a small corner radius.

---

# 6. Material and energy are separate quantitative families

## Material

Typical units:

- Mt
- kt
- t

Material is the main continuous backbone.

It can:

- continue;
- split into products;
- split into waste;
- loop through reuse/recycling;
- terminate in landfill/losses.

## Energy

Typical units:

- Mtoe
- PJ
- TJ
- GWh
- kWh

Energy enters transformation stages as a separate family.

Energy can enter:

- extraction;
- material processing;
- fabrication/manufacture;
- distribution;
- use/consumption where appropriate;
- recovery/recycling.

Its amount and type depend on evidence.

Do not assume every stage uses the same energy mix.

Do not add energy ribbon thickness to material ribbon thickness.

## Emissions

Typical units:

- MtCO2e
- ktCO2e
- tCO2e
- tonnes of specific pollutants

These are outputs/terminal flows.

## Contextual impacts

Examples:

- hectares of land disturbed;
- water use;
- biodiversity indicators;
- social/labour metrics.

These must not be treated as tonnes of material.

Use a separate visual family or annotation unless a robust, compatible quantitative dataset exists.

---

# 7. Mapping detailed MIT categories to the seven-stage overview

Use:

`linear_fabrication_stage_mapping.json`

The mapping is a **test mapping**, not a final scientific classification.

Its purpose is to demonstrate how detailed economic flows can be reorganised around:

Virgin Resources
→ Extraction
→ Material Processing
→ Fabrication / Manufacture
→ Distribution
→ Use / Consumption
→ End of Use

Do not force every detailed MIT node into a category if the mapping is ambiguous.

Log unmapped nodes during development.

---

# 8. Aggregation and "Other"

The modern economy contains too many flows to label every one on the overview.

For the seven-stage view:

1. preserve every original CSV row in memory;
2. map its Source and Target to conceptual stages;
3. group only compatible records;
4. aggregate small flows into `Other` where necessary for legibility.

Never aggregate across incompatible units.

Examples of valid aggregation:

- several material flows measured in Mt between the same two mapped stages;
- several energy flows measured in Mtoe between the same two mapped stages.

Invalid aggregation:

- Mt material + Mtoe energy;
- tonnes waste + hectares habitat loss.

The `Other` ribbon should be expandable/inspectable later so underlying records are not lost.

---

# 9. Branch ordering

When a node splits:

- continuing/high-volume ribbons should remain visually central;
- smaller terminating/output ribbons should be ordered toward the outer edge of the bundle;
- this makes branches legible and reduces crossing.

Example:

A 100 Mt material ribbon splits into:

- 80 Mt continuing;
- 15 Mt waste;
- 5 Mt loss.

Arrange the 20 Mt of terminating flows at an outer edge before they peel away.

Do not select arbitrary lines from the centre of the bundle.

For ribbon rendering, this means controlling the vertical stacking order of outgoing links.

---

# 10. Ribbon geometry

Each ribbon is an individually addressable SVG path.

For a normal left-to-right flow, use a smooth cubic Bézier path.

Conceptually:

`M sourceX,sourceY`
`C controlX1,sourceY controlX2,targetY targetX,targetY`

For loops/returns, use dedicated routed control points or arc segments.

The precise spline/control points are rendering concerns.

The DATA controls:

- whether the ribbon exists;
- its source;
- its target;
- its quantity;
- its family;
- whether it continues, terminates or loops.

The rendering code controls:

- Bézier control points;
- curvature;
- vertical ordering;
- collision avoidance.

---

# 11. Tooltips / provenance

Every ribbon should be hoverable.

For the current MIT test data, show:

- ID / flow name
- Source
- Target
- Quantity
- Unit
- Type
- Reference

For future UK data, also support:

- Reference year
- Geography
- Source URL
- Data Status
- Method / uncertainty note

If the value is speculative, say so explicitly.

Do not present speculative visual weights as measured data.

---

# 12. Distribution is currently a synthetic stage

Do not automatically treat the MIT node `Transportation` as equivalent to our `Distribution` stage.

In the MIT dataset, Transportation is largely an end-use sector.

For a future UK manufacturing model, Distribution should be populated from freight/logistics evidence.

For the present test:

- allow Distribution to remain partially or fully synthetic;
- do not invent quantitative freight flows merely to fill the stage.

---

# 13. What Codex should prove in the first test

Before introducing UK data, the implementation should prove:

1. CSV quantities produce proportional ribbon widths.
2. Transformation nodes are rounded rectangles.
3. Main material-node size follows material throughflow.
4. Energy remains a separate quantitative ribbon family.
5. Multiple incoming flows join correctly.
6. Multiple outgoing flows split correctly.
7. Small branches are ordered to the outer edge.
8. Terminal flows end.
9. Return/recycling flows can loop to an earlier stage.
10. Hover exposes the original data record.
11. Detailed MIT flows can be mapped/aggregated into the seven-stage conceptual structure.
12. Unmapped/ambiguous records are reported rather than guessed.

Only after this works should the MIT test values be replaced with UK manufacturing data.
