# SANKEY DATA LOGIC — Linear Fabrication
Version 3.0 — estimate-enabled evidence model

## Data hierarchy
Each flow may contain either a sourced `quantity`, a design `estimates` value, or neither.

Rendering priority:
1. `quantity` present -> SOURCE-SUPPORTED / DERIVED quantitative ribbon.
2. no quantity but `estimates` present -> ESTIMATED quantitative ribbon.
3. neither -> unresolved relationship / placeholder / annotation according to data_status.

Never overwrite the source-supported `quantity` with an estimate.

## New estimate columns
- `estimates`: numeric estimate in the row's `unit`.
- `associated_sources`: one or more sources supporting the scaling assumption or benchmark.

The existing `methodology_note`, `scope_note`, `mapping_confidence`, `data_status` and provenance fields explain how the estimate was derived.

## Visual distinction
Estimated ribbons must be visibly distinguishable from source-supported ribbons while remaining quantitative. Use a consistent secondary colour, tint, pattern or edge treatment. Do not make estimates look identical to hard data.

Suggested visual hierarchy:
- source-supported quantity: primary solid ribbon colour;
- derived from source-supported values: same family colour with subtle hatch/mark;
- designer estimate: distinct estimate tint or patterned overlay;
- unresolved relationship: low-opacity structural connector;
- conceptual annotation: non-width-bearing annotation.

Hover/popout must state `SOURCE-SUPPORTED`, `DERIVED`, or `ESTIMATE` and show the associated source link(s).

## Estimate methods allowed
Estimates may be created from:
- scaling a global flow by a documented UK share;
- applying a global material/output ratio to a UK production figure;
- applying a global sector allocation share to a UK total;
- applying a global energy/emissions intensity to a UK production quantity;
- taking the midpoint of a reported range;
- deriving a remainder from compatible values in the same dataset.

Every estimate must preserve the equation in `methodology_note`.

## Scientific/design rule
The diagram is a design/research model, not a certified national material balance. Estimates are permitted to fill important structural gaps provided they are explicitly marked and sourced.

Do not combine incompatible units. Do not hide uncertainty. Do not present an estimate as measured UK data.

## Backbone
Virgin Resources -> Extraction -> Material Processing -> Fabrication / Manufacture -> Use / Consumption -> End of Use

Distribution / Transport remains a secondary service overlay. Energy remains a separate input family. Emissions and terminal outcomes can branch from relevant stages.

## Output label layout rule
Terminal/output sink labels such as Atmospheric Emissions, Other Treatment / Export and Other Treatment / Losses must remain inside the SVG view. Do not let right-side output labels run off-canvas.

When a sink label contains multiple words, render it as a stacked multiline SVG label with one word per line where needed, for example:

Atmospheric  
Emissions

Labels should be vertically centre-aligned with their corresponding sink node, positioned beside that node, and generated from layout bounds rather than one-off manual x/y tweaks. If future data adds more terminal outputs, the sink column and label wrapping rules should scale from the overall Sankey view dimensions.

## MIT benchmark role
`mit_sankey_test_flows.csv` may be used as a global benchmark for proportions/ratios where a UK relationship is missing. The global value itself is not copied directly. It must be scaled using a UK anchor value and the calculation recorded.
