# Sankey V3 Snapshot

Snapshot purpose: preserve the current Linear Manufacturing Sankey implementation so it can be restored if later iterations move in an unwanted direction.

Snapshot date: 2026-07-27

## Existing page / route

The Sankey is embedded in the existing conceptual evolution homepage file:

`conceptual evolution tree/HomePage_Conceptual Evolution Tree_Rev A.html`

It appears only on the existing project view for:

`000 - Linear Manufacturing`

Do not recreate this as a separate page or route when restoring.

## Live V3 data dependencies

The current Sankey uses:

- `content_linear-fabrication/uk_linear_fabrication_flows_v3.csv`
- `content_linear-fabrication/linear_fabrication_stage_mapping_v3.json`
- `content_linear-fabrication/SANKEY_DATA_LOGIC_v3.md`
- `content_linear-fabrication/UK_ESTIMATE_LAYER_SUMMARY_v1.md`
- `content_linear-fabrication/linear_fabrication_annotations_framework.json`
- `content_linear-fabrication/linear_fabrication_source_registry_v2.json`
- `content_linear-fabrication/uk_linear_fabrication_data_audit_v2.json`

MIT/global data is retained only as renderer/test precedent. The UK view must not directly use MIT/global quantities unless a row in the UK CSV explicitly records a UK-scaled estimate and its method.

## Current model

This is the UK Evidence V3 / estimate-enabled ribbon model.

Rendering priority:

1. Use `quantity` when present.
2. If `quantity` is empty, use `estimates` when present.
3. If neither is present, do not render a width-bearing ribbon.

Rows render only when:

- `render_quantitative=true`
- `excluded_from_default_scope` is not true
- the resolved render value from `quantity` or `estimates` is greater than zero

Do not silently fill missing relationships with invented data.

## Primary backbone

The primary material backbone is:

`Virgin Resources -> Extraction -> Material Processing -> Fabrication / Manufacture -> Use / Consumption -> End of Use`

`Distribution / Transport` is removed from the primary backbone and retained only as a secondary service overlay for future work.

`Energy` remains a separate input network and is never arithmetically combined with material mass.

## Current visual rules

- Rounded rectangular transformation nodes.
- Ribbons enter and exit only from left/right node faces.
- Node height is calculated from the geometric envelope of attached ribbons.
- Node width remains narrow and consistent.
- Ribbon ends are flat/flush at node faces.
- Normal flows use long horizontal tangents.
- Return/loop flows use large-radius curves with no hard kinks.
- Wide low-opacity white hover strokes sit above fine/dashed flow paths to make interaction easier.
- Terminal/output nodes use solid white fill with a black border, matching other nodes.
- Terminal/output labels wrap into stacked multiline SVG text and are vertically centre-aligned with their nodes.
- Right-side sink labels must stay inside the SVG view using layout bounds, not one-off x/y nudges.

Examples of wrapped sink labels:

```text
Atmospheric
Emissions
```

```text
Other
Treatment
Export
```

```text
Other
Treatment
Losses
```

## Estimate visual logic

Estimate-based ribbons remain width-proportional but must not look identical to source-supported values.

Current implementation:

- source-supported quantity: solid family ribbon
- derived value: subtle dashed/marked treatment
- estimate: dashed/tinted treatment

Hover popouts must identify the value basis as:

- `SOURCE-SUPPORTED`
- `DERIVED`
- `ESTIMATE`
- `MIXED`

## Hover / provenance rules

Hover popouts should preserve and display, where available:

- value and unit
- value basis
- flow family
- unit family
- data status
- reference year
- geography
- source name
- source URL
- methodology note
- scope note
- product class
- balance group
- associated sources

## Runtime audit

The browser console should report a runtime audit including:

- records parsed
- rendered quantitative rows
- estimate-rendered rows
- source/quantity-rendered rows
- evidence-only rows
- placeholder rows
- stage relationships present
- missing backbone relationships
- unit families
- balance groups
- Use -> End product classifications
- Distribution / Transport status
- emissions mapping status
- impact attachment points

## Current expected V3 data shape

At the time of this snapshot, the v3 CSV produced approximately:

- `39` parsed rows
- `25` rendered quantitative rows
- `13` estimate-based rendered rows

Current rendered relationships included:

- `Virgin Resources -> Extraction`
- `Extraction -> Material Processing`
- `Material Processing -> Fabrication / Manufacture`
- `Fabrication / Manufacture -> Use / Consumption`
- `Use / Consumption -> End of Use`
- `End of Use -> Material Processing`
- `Energy -> Material Processing`
- `Material Processing -> Atmospheric Emissions`
- `End of Use -> Other Treatment / Export`
- `End of Use -> Other Treatment / Losses`

## Restore notes

To restore this iteration:

1. Restore the V3 data files listed above.
2. Restore the Sankey-related functions and CSS inside `HomePage_Conceptual Evolution Tree_Rev A.html`.
3. Ensure the loader points to:
   - `uk_linear_fabrication_flows_v3.csv`
   - `linear_fabrication_stage_mapping_v3.json`
4. Keep the route/page behavior unchanged: click `000 - Linear Manufacturing` from the existing conceptual evolution tree.
5. Run a JavaScript syntax check on the HTML script block.
