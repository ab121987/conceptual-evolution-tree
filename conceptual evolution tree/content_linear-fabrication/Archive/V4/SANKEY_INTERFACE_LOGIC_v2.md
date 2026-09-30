# SANKEY INTERFACE LOGIC — LINEAR FABRICATION
Version 2.0

## Status

This version supersedes `SANKEY_INTERFACE_LOGIC_v1.md`.

It is written for the current implementation in which:

- `Re Use` is a separate recovery node positioned beneath `Use / Consumption`;
- `Recycling` is a separate recovery node positioned beneath `Material Processing`;
- end-of-use outcomes have semantic colours;
- ribbon evidence status is visually encoded;
- the inspector can be pinned;
- labels use measured word wrapping;
- the SVG viewBox is recalculated after layout.

Do not revert any of those changes.

---

## 1. Current recovery structure is authoritative

Preserve the current recovery-node logic from `SANKEY_DATA_LOGIC_v4.md` and the latest HTML.

### Re Use

Route direct reuse, repair and remanufacture evidence from:

`End of Use → Re Use`

Position the recovery node beneath and vertically aligned with:

`Use / Consumption`

Use positive green styling.

### Recycling

Route recycling, recovery, collection-for-recycling and downcycling evidence from:

`End of Use → Recycling`

Position the recovery node beneath and vertically aligned with:

`Material Processing`

Use conditional-positive green/amber styling where appropriate.

### Important

Do not collapse Re Use and Recycling into one node.

Do not restore the old direct return-loop presentation from End of Use to Material Processing or Use.

Do not invent a measured split for ambiguous `Reuse / Recycling` evidence.

Do not invent new continuation quantities from Re Use to Use or Recycling to Material Processing unless the CSV explicitly contains those records. Their position and labels may communicate the stage at which recovered value re-enters the system.

---

## 2. Extraction must have an atmospheric-output relationship

The current CSV contains an extraction-stage atmospheric-emissions relationship whose quantity remains unresolved.

This relationship must remain visible in the default diagram as:

`Extraction → Atmospheric Emissions`

It is a known relationship, not a quantified ribbon.

### Rendering

- preserve it even though `render_quantitative=false`;
- recognise `default_visibility=structural` or `measurement_role=structural_required`;
- render it as a pale but clearly visible hatched/dashed ribbon;
- minimum visible stroke approximately 3–4 px;
- give it a generous transparent hit target;
- place it in its own stack slot so it is not hidden underneath Processing or Fabrication emissions;
- do not animate it as though it were measured;
- do not use proportional width;
- do not invent a quantity in JavaScript.

### Inspector content

Title:

`Extraction → Atmospheric Emissions`

Value line:

`Quantity unresolved · not to scale`

Badge:

`KNOWN RELATIONSHIP — QUANTITY UNRESOLVED`

Plain-language text:

> The current evidence model recognises atmospheric emissions associated with extraction, but does not yet assign a defensible UK stage quantity.

Display the source name and link already stored in the CSV. Keep the source-mapping limitation inside `Method and assumptions`.

A later evidence pass may replace this structural relationship with a sourced or transparently estimated quantity. That is not part of the current interface pass.

---

## 3. Preserve the current evidence-status hierarchy

- source-supported = solid;
- derived = subtle pattern;
- estimated = lighter/fine pattern with proportional width;
- unresolved = pale hatch, not to scale.

Do not use one universal estimate colour that removes the material/energy/emissions/transport family distinction.

When selected, estimated flows must show:

`ESTIMATE — NOT DIRECTLY MEASURED`

---

## 4. Preserve and refine the current interface work

The latest HTML already contains:

- semantic end-state colours;
- pin/unpin interaction;
- a concise panel structure;
- word-based label wrapping;
- collision checking;
- dynamic viewBox fitting.

Refine these functions rather than replacing the renderer.

### Inspector placement

The inspector must not obscure the diagram.

On desktop, place it outside the SVG plotting area in a two-column wrapper.

On narrow screens, stack it above or below the SVG.

Do not position it as an absolute overlay inside `.sankey-frame`.

### Sources

Use recognisable source titles. Avoid:

- `View source`;
- `Associated source 1`;
- `Associated source 2`.

Where a source title is missing, derive a short label from the domain.

### Label and viewport lifecycle

- restore base label positions before each collision pass;
- wrap text before collision testing;
- use one debounced `ResizeObserver`;
- remove unmanaged repeated resize listeners;
- fit all ribbons, loops, nodes, labels, annotations and leaders into the viewBox;
- use `preserveAspectRatio="xMidYMid meet"`;
- do not crop content with `overflow:hidden`.

---

## 5. Runtime validation

Log and verify:

- `extractionAtmosphericRelationshipPresent`;
- `extractionAtmosphericRelationshipRendered`;
- `extractionAtmosphericValueBasis`;
- `extractionAtmosphericRecordId`;
- `reUseNodePresent`;
- `recyclingNodePresent`;
- count of `End of Use → Re Use` records/ribbons;
- count of `End of Use → Recycling` records/ribbons;
- any ambiguous `Reuse / Recycling` records and how they were routed;
- unresolved structural rows suppressed by quantified rows;
- unresolved label collisions.

Do not silently drop the extraction atmospheric relationship.

---

## 6. Exclusions

Do not add in this pass:

- ecological counterflows;
- stewardship inputs;
- resource-based economies;
- forest ledgers/blockchain;
- case-study comparisons;
- material passports;
- new quantitative estimates;
- new CSV rows;
- new routes or pages.

This remains an interface and rendering correction pass.
