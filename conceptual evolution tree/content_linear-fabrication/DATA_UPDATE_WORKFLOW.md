# Linear Fabrication Data Update Workflow

## Current stage
Use speculative visual weights first to test whether the Sankey communicates the argument.

## Future real-world database
1. Keep UK manufacturing as the parent scope.
2. Add nested case studies for industries or artefacts.
3. Use the source registry to identify evidence.
4. Build a curated evidence table with:
   `record_id, scope_id, parent_scope_id, metric, value, unit, geography, sector, sic_code, reference_year, source_id, source_record_id_or_table, data_status, uncertainty, last_verified, transformation_note`
5. Generate Sankey JSON from that curated evidence.
6. Preserve annual snapshots rather than overwriting history.
7. Automate updates where stable APIs or repeatable annual downloads allow it.

The long-lived asset is the evidence database plus provenance. The Sankey is one generated view of that infrastructure.
