Refine the EXISTING Sankey on the EXISTING page for `000 - Linear Manufacturing`.

Do not create a new page/route and do not alter the homepage or conceptual evolution tree.

Read these files first:
- uk_linear_fabrication_flows_v2.csv
- linear_fabrication_stage_mapping_v2.json
- SANKEY_DATA_LOGIC_v2.md
- uk_linear_fabrication_data_audit_v2.json
- UK_DATA_REQUIREMENTS_v2.md
- linear_fabrication_source_registry_v2.json

Keep `mit_sankey_test_flows.csv` only as a renderer/test precedent. Do not use MIT/global quantities in the UK view.

PRIMARY BACKBONE:
Virgin Resources → Extraction → Material Processing → Fabrication / Manufacture → Use / Consumption → End of Use

Remove Distribution from the primary backbone. Retain `Distribution / Transport` only as a secondary service overlay. Do not invent a transport quantity.

Keep Energy as a separate input network.

Use the CSV as source of truth:
- width-bearing ribbon only if `render_quantitative=true`;
- never mix incompatible units;
- never sum different `balance_group` values by default;
- respect `contributes_to_stage_balance`;
- preserve year/geography/source/data status in hover popouts.

Implement `is_final_product_end_of_use=true` logic so valid product-specific records create Use / Consumption → End of Use ribbons. Render current evidence streams separately; do not sum different years/geographies into one claimed total.

Do not create fake values for missing backbone relationships. Make gaps explicit.

Prepare stage-output attachment points for Atmospheric Emissions, Land Disturbance, Habitat Loss and Species Loss, but only render quantitative ribbons where valid data exists.

Preserve the improved geometry:
- rounded rectangle nodes;
- ribbons only left/right faces;
- geometric-envelope node height;
- flat ribbon terminations;
- long horizontal tangents;
- large-radius loop curves;
- no hard kinks;
- terminal sinks as low-opacity colour zones + hatch + generous hover target.

Use this footer:
THIS DIAGRAM COMBINES SOURCED QUANTITATIVE EVIDENCE WITH UNRESOLVED OR CONCEPTUAL RELATIONSHIPS. HOVER OVER FLOWS FOR VALUES, SCOPE, YEAR, PROVENANCE AND DATA STATUS.

Create/update a runtime audit reporting:
records parsed, rendered quantitative rows, evidence-only rows, placeholders, stage relationships present, missing backbone relationships, unit families, balance groups, Use→End product classifications, Distribution/Transport status and emissions mapping status.

Do not silently fill gaps with invented data.
