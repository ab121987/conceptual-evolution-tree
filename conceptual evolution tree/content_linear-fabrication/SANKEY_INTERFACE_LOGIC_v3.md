# SANKEY INTERFACE LOGIC — LINEAR FABRICATION
Version 3.0

## Status

This version supersedes `SANKEY_INTERFACE_LOGIC_v2.md`.

It is written for the latest fine-tuned implementation in:

`HomePage_Conceptual Evolution Tree_Rev A.html`

The current layout choices are deliberate and must be preserved.

## Current source-of-truth files

Use:

- `uk_linear_fabrication_flows_v4.csv`
- `linear_fabrication_stage_mapping_v4.json`
- `SANKEY_DATA_LOGIC_v4.md`
- `linear_fabrication_annotations_framework.json`
- the current HTML implementation

Do not use `linear_fabrication_data_framework.json` as the active Sankey dataset. It is a legacy speculative framework with older backbone/node assumptions and can conflict with the current UK v4 model.

## Preserve the current layout

Keep the current fine-tuned arrangement:

- Energy and Virgin Resources aligned at the left;
- progressively compacted primary backbone;
- Re Use beneath Use / Consumption;
- Recycling beneath Material Processing;
- terminal sinks positioned in explicit semantic vertical slots;
- Atmospheric Emissions in the lower terminal stack;
- labels beneath recovery and sink nodes;
- inspector above the SVG as a long, shallow, fixed-height strip.

Do not replace these with automatic equal-spacing or a right-side inspector.

## Recovery nodes

Preserve:

- `End of Use → Re Use`
- `End of Use → Recycling`

Do not merge the nodes.
Do not restore direct spiral loops to Use or Material Processing.
Do not invent continuation quantities from the recovery nodes unless the CSV explicitly supplies them.

## Extraction atmospheric output

The current CSV contains a structural unresolved relationship:

`Extraction → Atmospheric Emissions`

It must remain visible.

Render it:

- at a fixed non-quantitative structural width;
- pale/hatched;
- not to scale;
- without an animated pulse that implies measurement;
- with a generous hit target;
- in its own stack position at Atmospheric Emissions.

Inspector status:

`KNOWN RELATIONSHIP — QUANTITY UNRESOLVED`

Inspector value:

`Quantity unresolved · not to scale`

Do not expose the internal structural layout value as data.

## Canonical evidence badges

The inspector badge must use canonical readable wording based on `value_basis`, not raw CSV status strings.

Use:

- `SOURCE-SUPPORTED`
- `DERIVED FROM SOURCED VALUES`
- `ESTIMATE — NOT DIRECTLY MEASURED`
- `KNOWN RELATIONSHIP — QUANTITY UNRESOLVED`

Raw `data_status` belongs inside `Method and assumptions`.

## Sources

Primary source links should use `source_name`.

Associated-source links should use a recognisable title or domain, not:

- `View source`
- `Associated source 1`
- `Associated source 2`

## Inspector behaviour

Preserve the current long, shallow inspector above the SVG.

- fixed height;
- internal scrolling;
- no height change on hover or click;
- hover/focus updates;
- click pins/unpins;
- Escape clears;
- method remains collapsed by default.

Do not move it over the SVG or into a right-side column.

## Viewport and resize

Preserve dynamic safe-viewBox fitting and measured word wrapping.

Replace repeated anonymous window resize listeners with one managed, debounced `ResizeObserver`.

Before each layout pass:

- restore base label coordinates;
- wrap labels;
- resolve collisions;
- fit the entire diagram;
- include ribbons, recovery nodes, sink nodes, labels and annotations.

Do not alter the hand-tuned node coordinates unless a specific collision cannot otherwise be resolved.

## Exclusions

Do not add:

- ecological counterflows;
- stewardship branches;
- case-study comparisons;
- material passports;
- new estimates;
- new CSV rows;
- new pages or routes.

This is a final interface-hardening pass around the current layout.
