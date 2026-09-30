# Stage 1 text fields

## Flow CSV additions

- `display_title` — plain-language name of the specific material, energy, emission or recovery stream.
- `what_is_represented` — concise explanation of what the quantity or unresolved relationship actually represents.
- `ecological_impact` — short, cautious interpretation of likely ecological benefit, harm or uncertainty.
- `recovery_process` — controlled visual category; most forward flows are `Not applicable`.
- `hover_summary` — short, pipe-separated text for a compact ribbon hover summary.
- `source_display` — source title with the data year or temporal basis included.

The field `what_it_means` is intentionally omitted.

## Node CSV

Nodes use:
- `node_id`
- `display_title`
- `what_is_represented`
- `hover_summary`

Nodes do not use popouts. Hover or click updates the fixed information box above the Sankey.
Connected ribbon values are calculated from the flow CSV at runtime and must not be blindly combined across incompatible units, years, geographies or overlapping balance groups.
