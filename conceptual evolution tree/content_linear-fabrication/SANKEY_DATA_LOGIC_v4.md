# SANKEY DATA LOGIC — LINEAR FABRICATION
Version 4.0 — 2026-07-24

## Purpose
This infrastructure turns the Linear Manufacturing page into a **design-research evidence model** rather than a falsely complete national statistical account.

The renderer is working. The data now carries four levels of certainty:

1. **Source-supported** — reported quantitative value.
2. **Derived** — calculated from compatible source-supported values.
3. **Estimated** — transparent designer estimate using an explicit external ratio/intensity/percentage and UK anchor.
4. **Unresolved / conceptual** — known relationship retained visually without fake magnitude.

## Primary backbone
**Virgin Resources → Extraction → Material Processing → Fabrication / Manufacture → Use / Consumption → End of Use**

`Distribution / Transport` is a secondary service overlay.
`Energy` is a separate input network.

## Effective numeric value
For each CSV row:

- if `quantity` is numeric and `render_quantitative=true`: use `quantity`;
- otherwise, if `estimates` is numeric and `render_quantitative=true`: use `estimates`;
- otherwise, if the relationship is structural: draw a low-opacity/hatched not-to-scale ribbon;
- never invent numbers in JavaScript.

## Estimate rule
An estimate is allowed when the derivation is explicit.

Valid methods include:
- UK total × external/global allocation percentage;
- UK production × international process intensity;
- UK reported range → midpoint;
- source-supported total − source-supported sub-flow;
- UK anchor scaled using relational proportions from the MIT Sankey test data.

Every estimate must expose in its popout:
- `ESTIMATE — NOT DIRECTLY MEASURED`;
- formula/assumption from `methodology_note`;
- `associated_sources`;
- year/geography;
- mapping confidence.

Estimated ribbons **still use proportional width** but must be visually distinct from measured ribbons.

## Default vs drilldown
Default overview should render `primary` and `secondary`.
`drilldown` rows are available interactively but should not all stack into the overview.

This is essential because:
- packaging overlaps plastics/glass/wood/metal;
- cement/concrete can overlap aggregates;
- sector-specific energy/emissions are constituents of broader stage estimates.

## Unit families
Never add or scale together:
- Mt material;
- Mtoe/TWh energy;
- MtCO2e emissions;
- billion tonne-km transport service;
- million m3 volume;
- product counts.

Each compatible unit family gets its own width scale and visual lane logic.

## Node sizing
Node height is geometric, not a sum of physical units, and this rule applies to every node type including Energy, recovery nodes and terminal sinks:
top of highest attached ribbon → bottom of lowest attached ribbon.

Ribbons only enter/exit left/right faces.
Use flat ribbon ends, long tangents and large-radius curves.

## Structural relationships never disappear
The conceptual backbone must remain legible even if a relationship is not yet quantified.

If no primary/secondary quantified stream occupies a backbone link, show a low-opacity hatched unresolved connection.

## Use → End of Use
This relationship is built from final-product classes:
textiles, electronics, furniture, vehicles, plastics, packaging, flat glass, structures and other manufactured products.

Do not include food/agriculture by default.

## End-of-use recovery nodes
Do not collapse reuse and recycling into one visual node.

Render end-of-use recovery as two separate secondary nodes where the CSV supports the distinction:

- **Re Use** — direct reuse, repair or remanufacture routes. Position this in line with and below `Use / Consumption`.
- **Recycling** — material reprocessing, collection-for-recycling, recovery or downcycling routes. Position this in line with and below `Material Processing`.

Rows from `End of Use` to `Reuse` should be routed to **Reuse / Repair**.

Rows from `End of Use` to `Material Processing` that are identified as recycling, recovery, collected material or downcycling should be routed to **Recycling** instead of directly back into the main `Material Processing` backbone node.

Rows from `End of Use` to `Reuse / Recycling` are ambiguous unless the CSV gives a measured split. Do not invent a split. Route them to the closest supported recovery node and expose the ambiguity in the popout/source notes until the CSV separates reuse from recycling.

These recovery ribbons should read as positive outputs from `End of Use` and use green styling. Avoid circular or spiral loop geometry in the default overview. If a later view needs to show material re-entering processing, represent that as a secondary continuation from **Recycling** rather than making the first end-of-use recovery ribbon spiral backwards.

Terminal outputs such as landfill, incineration, export/other treatment, other/uncaptured electrical and electronic waste, waste/losses, atmospheric emissions and material movement service should be placed to the right of `End of Use`. These terminal nodes should use solid white fill with a black border, not dashed node styling. Their labels should sit underneath the relevant node and be centre aligned. Use semantic vertical slots with enough spacing for wrapped labels rather than a uniform auto-stack so `Waste / Losses`, `Atmospheric Emissions` and `Material Movement Service` cannot overlap. `Atmospheric Emissions` should sit in the lower terminal stack around the former `Landfill / Incineration` position to reduce ribbon crossings. Their ribbons should flow outward from `End of Use` into the relevant terminal node rather than spiralling.

To preserve space for these terminal outputs, the main backbone can progressively compact left from `Extraction` onward while `Energy` and `Virgin Resources` remain aligned with the start of the `Linear Fabrication Flows` title.

If recovery nodes or lower flows need the bottom-left diagram space, move the Sankey inspector above the SVG as a long, shallow, fixed-height, scrollable strip rather than covering nodes or ribbons. Do not dynamically resize this inspector on hover/click, because that moves the Sankey diagram during interaction.

## Distribution / Transport
Do not restore Distribution as an empty backbone node.

Show a secondary service layer:
- freight activity;
- transport energy when properly attributable;
- transport CO2 proxy;
- potential transport applied between multiple lifecycle transitions.

## Estimates currently used
The v4 CSV deliberately contains transparent estimates, including:
- steel upstream iron-ore equivalent using MIT ratio scaled to UK steel production;
- steel downstream sector split using MIT proportions scaled to UK demand;
- wood useful-output/residue/downstream split using MIT proportions scaled to UK roundwood;
- cement upstream limestone-equivalent using MIT relationship scaled to GB cement production;
- contemporary plastics arisings proxy using 2024 packaging data and historic packaging share;
- industrial energy stage split using UK 19.5 Mtoe total and MIT stage-energy proportions;
- manufacturing GHG split between processing/fabrication using the same broad stage proxy.

These are **design estimates**, not official UK accounts.

## Popouts
Every quantitative ribbon should show:
- label;
- effective value and unit;
- whether value came from `quantity` or `estimates`;
- data status;
- source/target;
- year/geography;
- source name;
- clickable source URL(s);
- methodology/derivation;
- scope caveat;
- mapping confidence.

## Ribbon style legend
The Linear Manufacturing page should include a compact legend near the Sankey title, not inside the SVG plotting area.

Legend meanings:
- Solid ribbon: directly source-supported.
- Subtly marked ribbon: derived from compatible sourced values.
- Lighter or finely hatched ribbon: informed estimate.
- Pale hatched ribbon: known relationship whose quantity remains unresolved.

The legend should also explain semantic outcome colours when these are visible:
- green: reuse, repair or remanufacture;
- green with amber pattern: recycling or downcycling;
- amber: export, other treatment or uncertain route;
- rust/dark red: waste, losses, emissions or uncontrolled electrical waste;
- grey: unresolved relationship.

The long data-status explanation should be placed beneath the `Linear Fabrication Flows` heading where normal HTML text can wrap. Do not place this sentence as a single SVG text line inside the Sankey view, because it can run off-screen as data or viewport size changes.

## Footer
Use:
**THIS DIAGRAM COMBINES SOURCED, DERIVED AND ESTIMATED QUANTITATIVE EVIDENCE WITH UNRESOLVED OR CONCEPTUAL RELATIONSHIPS. HOVER OVER FLOWS FOR VALUES, ASSUMPTIONS, SCOPE, YEAR, PROVENANCE AND DATA STATUS.**

## Core principle
The overview does not need to enumerate the whole economy.
It should show enough robust and transparently estimated relationships to **paint a defensible picture of linear fabrication**, while allowing later drill-downs into prosthetics, buildings and specific material systems.
