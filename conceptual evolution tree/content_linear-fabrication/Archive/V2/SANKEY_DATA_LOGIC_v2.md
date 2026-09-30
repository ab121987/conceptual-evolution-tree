# SANKEY DATA LOGIC — Linear Fabrication
Version 2.0 — 2026-07-24

## Primary structure
The default scope is designed/manufactured **objects, products and structures**.

Primary material backbone:

**Virgin Resources → Extraction → Material Processing → Fabrication / Manufacture → Use / Consumption → End of Use**

Food, agriculture, food waste, green/garden waste and primary food/feed biomass are excluded by default.

`Energy` is a separate input network.

`Distribution / Transport` is a **secondary service overlay**, not a primary material-transformation node. It can operate between multiple stage transitions and later carry freight activity, fuel/electricity inputs and CO2 outputs.

## Data priority
Use `uk_linear_fabrication_flows_v2.csv` for the UK view.
Keep `mit_sankey_test_flows.csv` only as a renderer/test precedent.
Do not mix MIT/global quantities into the UK view.

## One row = one evidence flow
Ribbon width is proportional to `quantity` only when `render_quantitative=true`.

Never invent missing quantities.

Never sum incompatible units or different `balance_group` values by default.

A quantitative ribbon can be a **selected evidence stream** without implying that the whole stage is balanced.

## Use / Consumption → End of Use
This relationship is built from final-product classifications.

A row can create a Use→End flow when:
- it is material/product evidence;
- `is_final_product_end_of_use=true`;
- it identifies a valid `product_class`;
- it represents discard, waste generation, collection or another end-of-use transition;
- provenance/year/geography are retained.

Examples: textiles, WEEE/electrical goods, furniture, recreation/sport products when available, vehicles, packaging (secondary), demolition-only structure flows, other manufactured products.

Do not sum a 2017 England furniture estimate, a 2022 UK textile estimate and a 2024 England WEEE proxy into one claimed current UK total.

## Distribution / Transport
Remove it from the main backbone.

Treat it as a service process that may act between:
- resources/extraction;
- extraction/processing;
- processing/fabrication;
- fabrication/use;
- use/end-of-use.

Future quantitative families:
- tonne-km;
- fuel/electricity;
- CO2/CO2e.

Do not use all-transport totals as manufacturing-distribution quantities.

## Energy
Energy remains a separate flow family. Stage allocation must come from evidence.
Do not force energy into every stage until a mapping exists.

## CO2 / GHG
ONS provides CO2/GHG by SIC industry group. Map SIC activities to conceptual stages before generating stage emissions ribbons.
Do not divide total UK emissions arbitrarily and do not double count the same emissions via multiple methods.

## Land / habitat / species
Keep as placeholders/annotations until robust stage-specific metrics exist.
Possible future land unit: ha/km².
Do not invent quantitative widths.

## Built structures
Aggregate C&D waste mixes construction-stage and demolition/end-of-life flows. Do not assign all C&D tonnage to Use→End.
Use demolition/end-of-life-specific evidence when available.

## Aggregation
Aggregate only compatible rows sharing unit family, year, geography, methodology, balance_group and stage relationship.
Use `Other` only within those constraints.

## Nodes and routing
- rounded rectangular transformation nodes;
- ribbons connect only to left/right faces;
- node height follows the geometric envelope of attached ribbons;
- flat/flush terminations;
- long horizontal entry/exit tangents;
- large-radius loop curves;
- terminal sinks are low-opacity colour zones with hatch + larger hover target, not thin dashed hover-only lines.

## Data-status footer
For the current mixed model use:

**THIS DIAGRAM COMBINES SOURCED QUANTITATIVE EVIDENCE WITH UNRESOLVED OR CONCEPTUAL RELATIONSHIPS. HOVER OVER FLOWS FOR VALUES, SCOPE, YEAR, PROVENANCE AND DATA STATUS.**

The infrastructure files are the source of truth; do not rely on prompt-only logic.
