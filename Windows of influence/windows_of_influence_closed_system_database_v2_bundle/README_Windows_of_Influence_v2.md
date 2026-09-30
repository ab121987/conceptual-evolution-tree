# Windows of Influence closed-system database — v2

## What changed

Version 2 replaces the earlier **one material property = one whole curve** assumption with an event-based relationship model.

The temporal graph is now organised into:

1. **9 individually addressable relationship curves** (`CRV-01` … `CRV-09`)
2. **significant curve events** such as origin, peak, decline, zero, re-emergence, plateau, bifurcation and capture
3. **2 separate stimulus-impact curves** for local magnetic influence and global gravity
4. **property marker instances** that identify which material properties participate at particular moments
5. **Window Definitions** describing the conceptual relationship condition
6. **Window Instances** that derive red window geometry from the relationship events/segments they are intended to highlight

This means the Windows of Influence boxes should no longer be generated as seven equal or generic timeline rectangles.

## Important modelling principle

**What predominates is not just the property; it is a relationship.**

The graph is not primarily tracking how much of each property exists. It is tracking **when particular material relationships become influential**.

## Coordinate system

- `time_x`: normalised 0–100
- `influence_y`: normalised 0–100
- Y axis = **Extent of influence**
- Coordinates are authored seed tracings from the cleaned reference images and should be refined visually after the first v2 SVG render.

## Recommended runtime CSVs

### Core semantic data
- windows_of_influence_entities_v2.csv
- windows_of_influence_relationships_v2.csv
- windows_of_influence_relationship_states_v2.csv
- windows_of_influence_time_phases_v2.csv
- windows_of_influence_stimulus_events_v2.csv

### V2 temporal graph
- windows_of_influence_relationship_curves_v2.csv
- windows_of_influence_relationship_events_v2.csv
- windows_of_influence_stimulus_curves_v2.csv
- windows_of_influence_stimulus_curve_events_v2.csv
- windows_of_influence_property_markers_v2.csv
- windows_of_influence_window_definitions_v2.csv
- windows_of_influence_window_instances_v2.csv

### Reference / documentation
- windows_of_influence_coordinate_system_v2.csv
- windows_of_influence_hierarchy_logic_v2.csv
- windows_of_influence_lists_v2.csv
- windows_of_influence_how_to_use_v2.csv

### Legacy
- windows_of_influence_property_timeline_v1_LEGACY.csv

The legacy Property Timeline is retained for provenance but should **not** drive the v2 temporal graph.

## Diagnostic colours

The relationship curve sheet includes diagnostic colours from the cleaned colour-coded reference image. They are there to help distinguish the nine trajectories while reconstructing the graph. They are **not intended as the final webpage colour palette**.

## Bifurcation

`CRV-04` contains an explicit bifurcation event. After `CRV04-E04`, render branches `A` and `B` from the exact same event coordinate.

## Window 6

`WIN-06` deliberately has three spatial instances (`WIN-06-A`, `WIN-06-B`, `WIN-06-C`). One conceptual Window of Influence can therefore identify several relationship regions at different extents of influence.
