# SANKEY INTERFACE LOGIC — LINEAR FABRICATION
Version 1.0

## Purpose

This file defines the interface and readability rules for the existing Linear Fabrication Sankey.

It is deliberately separate from:

- `uk_linear_fabrication_flows_v4.csv` — evidence and flow records;
- `linear_fabrication_stage_mapping_v4.json` — stage, status and rendering categories;
- `SANKEY_DATA_LOGIC_v4.md` — quantitative and estimation logic.

This interface file should remain the source of truth for:

- data-status legibility;
- information-panel behaviour;
- source links;
- plain-language explanations;
- outcome colours;
- label wrapping;
- collision avoidance;
- fitting the complete diagram inside its viewing window.

Do not add ecological counterflows or comparative case studies during this interface pass.

---

## 1. Preserve the current page framing

Keep the current two-paragraph framing text exactly as supplied by the user.

Do not add the legend explanation to the second “how to read” paragraph. The visual ribbon legend already performs that role.

The compact reading instruction remains:

> Ribbon width represents quantity within a compatible flow family. Material, energy, emissions and transport use separate scales and should not be compared directly. Select a flow to view its value, year, scope, method and source.

---

## 2. Data-status distinction

The diagram already distinguishes:

- source-supported;
- derived;
- estimated;
- unresolved.

Make the distinction unmistakable without replacing the existing flow-family colour logic.

### Recommended hierarchy

**Source-supported**
- solid ribbon;
- family colour retained;
- panel badge: `SOURCE-SUPPORTED`.

**Derived**
- solid ribbon with a subtle repeating marker or centreline;
- panel badge: `DERIVED FROM SOURCED VALUES`.

**Estimated**
- proportional ribbon width remains active;
- use a lighter tint and/or restrained fine pattern;
- do not make the ribbon so faint that it becomes visually secondary;
- panel badge: `ESTIMATE — NOT DIRECTLY MEASURED`.

**Unresolved**
- low-opacity hatched or dashed relationship;
- explicitly not to scale;
- panel badge: `KNOWN RELATIONSHIP — QUANTITY UNRESOLVED`.

Do not use a wholly different ribbon colour for estimates if that destroys the existing distinction between material, energy, emissions and transport families.

A small status word may appear beside a selected flow label or in the fixed information panel. Do not add “ESTIMATE” permanently beside every ribbon because that will overcrowd the diagram.

---

## 3. Source and provenance behaviour

Every quantitative flow must retain and expose:

- `source_name`;
- `source_url`;
- `associated_sources`;
- `source_record`;
- `reference_year`;
- `geography`;
- `data_status`;
- `methodology_note`;
- `scope_note`;
- `mapping_confidence`.

Do not label every source link generically as `View source`.

Use the recognisable source title when available, for example:

- `WRAP — Textiles Market Situation Report 2024 ↗`
- `Office for National Statistics — Greenhouse gas emissions ↗`
- `Department for Transport — Freight statistics ↗`

For `associated_sources`, use the source title or website domain rather than:

- `Associated source 1`
- `Associated source 2`

All source URLs open in a new tab.

---

## 4. Replace the moving tooltip with a fixed information panel

The current floating tooltip follows the pointer and obscures the Sankey. Replace it with a fixed information panel outside the SVG drawing area.

### Layout

Use a responsive wrapper such as:

- desktop: diagram + fixed panel in a two-column grid;
- narrow screen: diagram followed by panel below.

The panel must not overlap the SVG.

A reasonable desktop panel width is approximately 300–340 px.

### Interaction

- Hovering a ribbon or node updates the panel.
- Clicking a ribbon or node pins the current selection.
- Clicking it again, clicking a clear button, or pressing Escape unpins it.
- When pinned, hovering elsewhere must not replace the selection.
- Keyboard focus should behave like hover.

### Initial panel state

Show a short instruction:

> Select a flow to inspect its quantity, evidence status, scope and source.

### Concise information hierarchy

The default panel should show only:

1. FLOW TITLE
2. VALUE · UNIT · YEAR · GEOGRAPHY
3. STATUS BADGE
4. one short plain-language explanation
5. recognisable clickable source title(s)
6. collapsed `Method and assumptions` disclosure

The disclosure may contain:

- calculation/derivation;
- scope caveat;
- balance group;
- mapping confidence;
- original source record;
- additional associated sources.

Do not print raw CSV field names in the default view.

Do not concatenate all metadata into one paragraph.

---

## 5. Plain-language panel text

Generate readable sentences rather than database fragments.

### Source-supported example

**USED TEXTILES GENERATED**

`1.45 Mt · UK · 2022`

`SOURCE-SUPPORTED`

> Estimated quantity of used textile products entering collection, reuse or disposal pathways.

**Source**  
WRAP — Textiles Market Situation Report 2024 ↗

### Estimated example

**IRON ORE-EQUIVALENT INPUT**

`5.33 Mt · 2024 estimate`

`ESTIMATE — NOT DIRECTLY MEASURED`

> UK crude-steel output scaled using the iron-ore-to-steel relationship in the global MIT flow model.

**Sources**  
UK steel evidence ↗  
MIT global material-flow model ↗

### Unresolved example

**ENERGY INPUT — END OF USE**

`Quantity unresolved`

`KNOWN RELATIONSHIP — NOT TO SCALE`

> Collection, sorting, reuse and recycling require energy, but this overview does not yet assign a defensible UK quantity to this stage.

---

## 6. Explain abbreviations

Visible labels should not require specialist abbreviations.

Replace:

- `WEEE`

with:

- `Electrical and electronic waste`

or:

- `Uncaptured electrical and electronic waste`.

The full term may appear once in a method note:

> Waste Electrical and Electronic Equipment (WEEE)

Apply the same rule to other abbreviations where a plain-language label is practical.

Allow familiar units such as:

- Mt;
- MtCO₂e;
- TWh;
- Mtoe;

but explain them in an accessible unit note or panel help if needed.

---

## 7. Semantic colours for End-of-Use outcomes

Outcome colour describes whether material value is retained, conditionally retained, displaced or lost.

It is separate from the evidence-status pattern.

### Retains form/value — positive

Examples:

- Direct Reuse
- Repair
- Remanufacture
- Component Reuse

Treatment:
- green family;
- solid or source-status pattern as appropriate.

### Retains material but requires further transformation — conditionally positive

Examples:

- Reuse / Recycling
- Recycling to Material Processing
- Downcycling

Treatment:
- green base with amber edge, marker or hatch;
- panel explanation that energy and material-quality losses may still occur.

### Outcome uncertain or displaced — caution

Examples:

- Export / Other Treatment
- Other Treatment

Treatment:
- amber.

### Terminal loss or externalised harm — negative

Examples:

- Waste / Losses
- Other Treatment / Losses
- Landfill
- Landfill / Incineration
- Uncaptured Electrical and Electronic Waste
- Atmospheric Emissions

Treatment:
- rust / dark red family.

### Quantity or outcome unresolved

Treatment:
- neutral grey hatch.

Do not classify `Use / Consumption` itself as inherently harmful. The negative distinction applies to disposal, value destruction and externalised impacts.

---

## 8. Text wrapping

Do not split every word into its own line.

Wrap node and annotation labels at word boundaries using measured SVG text width.

### Rules

- main stage label maximum width: approximately 150–180 px;
- sink/output label maximum width: approximately 120–150 px;
- annotations: approximately 140–170 px;
- maximum lines normally 2–3;
- use `<tspan>` elements;
- preserve complete words;
- permit explicit break opportunities at `/`, `&`, `→` and long compound phrases;
- use a line-height around 1.05–1.15em.

Examples:

`FABRICATION /`
`MANUFACTURE`

`UNCAUGHT ELECTRICAL`
`AND ELECTRONIC WASTE`

Do not produce one word per line unless the label is exceptionally narrow.

---

## 9. Collision and boundary logic

Collision handling must occur after text wrapping.

### Include in collision tests

- stage labels;
- output-node labels;
- visible flow labels;
- annotation labels;
- information leaders;
- node rectangles.

### Priorities

1. main stage labels;
2. selected/active label;
3. outcome labels;
4. value labels;
5. primary annotations;
6. secondary annotations.

### Resolution order

1. vertical nudge;
2. horizontal nudge;
3. alternate-side placement;
4. short leader line;
5. hide a low-priority permanent label and retain it through the information panel.

### Important safeguards

- Reset labels to their base positions before rerunning collision resolution.
- Do not repeatedly add displacement on every resize.
- Clamp every final label box to the safe SVG content bounds.
- Log unresolved collisions during development.
- Text must not overlap text or node rectangles.
- Ribbon overlap is permitted.

---

## 10. Fit the entire Sankey into its viewing window

The current fixed `viewBox="0 0 1240 620"` and `overflow: hidden` can crop loops and labels.

Create a single root SVG group containing all visible Sankey layers:

- ribbons;
- animation pulses;
- nodes;
- labels;
- annotations;
- sink zones;
- leader lines.

After rendering, wrapping and collision resolution:

1. call `getBBox()` on the root content group;
2. add 24–32 px safe padding;
3. set the SVG viewBox to the padded content bounds;
4. set `preserveAspectRatio="xMidYMid meet"`;
5. centre and scale the complete diagram proportionally;
6. rerun after resize using `ResizeObserver`.

The frame may retain a maximum desktop size, but the diagram must scale to fit inside it.

Suggested CSS:

- `width: 100%`;
- `max-width: 1240px`;
- `aspect-ratio: 2 / 1` or a ratio derived from the content;
- no fixed `min-height` that forces cropping;
- avoid `overflow: hidden` unless fitting has already guaranteed all content is inside the viewBox.

The bounds calculation must include return loops and output labels, not only the six main transformation nodes.

---

## 11. Keep the current Sankey structure unchanged in this pass

Do not change:

- CSV data;
- ribbon quantities;
- stage relationships;
- material/energy/emissions scales;
- current loops;
- primary Sankey geometry unless required for fitting;
- framing text;
- page route.

Do not add:

- ecological counterflows;
- speculative stewardship ribbons;
- future-system branches;
- material passports;
- comparative “best/worst” case studies.

These belong to a later iteration.

---

## 12. Acceptance checks

The interface pass is complete when:

1. estimates are immediately identifiable through pattern and an explicit status badge;
2. source-supported, derived, estimated and unresolved flows remain distinct;
3. source titles and links are recognisable;
4. the floating tooltip no longer obscures the Sankey;
5. the information panel is concise and plain-language;
6. methodology is collapsed by default;
7. clicking pins/unpins a selection;
8. `WEEE` is replaced by plain language;
9. positive, conditional, uncertain and harmful end states are semantically coloured;
10. labels wrap at word boundaries;
11. labels do not overlap nodes or one another;
12. the complete diagram, including loops and labels, remains inside the responsive viewBox;
13. resize does not cause cumulative label drift;
14. no ecological counterflows or case studies are added in this pass.
