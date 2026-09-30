# UK LINEAR FABRICATION — ESTIMATION METHODOLOGY
Version 2.0 — 2026-07-24

## Why estimates are included
This is a design-research Sankey. Hard UK data are fragmented across material, energy, emissions, product and waste datasets.

Rather than make missing relationships invisible, v4 uses a transparent hierarchy:

**reported → derived → estimated → unresolved**

## Estimate types

### 1. MIT relational scaling
Use a relationship/proportion in the MIT global Sankey and scale it using a UK anchor.

Examples:
- iron-ore equivalent from UK crude-steel production;
- steel allocation to construction/machinery/transport/other;
- wood output/residue split;
- cement limestone-equivalent;
- broad industry-energy stage shares.

### 2. International intensity × UK production
Example:
UK crude steel × World Steel global energy/CO2 intensity.

### 3. Historical ratio × current UK anchor
Example:
2024 plastic-packaging waste ÷ 2019 packaging share of total plastic arisings.

### 4. Midpoint of published range
Example:
10–11 Mt steel scrap/year → 10.5 Mt midpoint estimate.

### 5. Compatible arithmetic derivation
Example:
packaging arising − packaging recycled = other treatment/remainder.

## Mandatory transparency
Any estimate must populate:
- `estimates`;
- `associated_sources`;
- `data_status`;
- `methodology_note`;
- `mapping_confidence`.

The popout must explain the formula and must never describe an estimate as measured.

## Visual distinction
Suggested:
- reported: solid family colour;
- derived: solid + subtle marker;
- estimated: lighter tint and/or fine hatch;
- unresolved: low-opacity hatched not-to-scale;
- conceptual: annotation only.

## Scientific/design boundary
The aim is not to claim a complete UK physical input-output model.
The aim is to reveal the **relative scale, branching, loss, energy demand and end-of-use structure** of linear fabrication with enough evidence to be useful, while making uncertainty legible.
