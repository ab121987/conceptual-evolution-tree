const PLOT_MIN = -2;
const PLOT_MAX = 2;
const JITTER_STEP = 38;
const QUESTION_IDS = ["q1", "q2", "q3", "q4", "q5"];
const CONFIDENCE_RANK = { low: 1, medium: 2, high: 3 };
const PAPER_TYPE_COLORS = {
  "agriculture-agroecology": "#6c9a2b",
  "artificial-life": "#19a7ce",
  "bio-design": "#00a878",
  "circular-economy-built-environment": "#b6a000",
  "circular-economy-industrial-ecology": "#72a63a",
  "computer-science": "#2f66d0",
  "design-architecture": "#ff6b35",
  "digital-twins-cyber-physical-systems": "#7b61ff",
  "engineering-materials-science": "#008fc7",
  "multispecies": "#c15bbf",
  "programmable-matter-4d-printing-material-computation": "#f2a900",
  "regenerative-design": "#2f9e44",
  unclassified: "#7a7a72"
};
let markerRecords = [];
let activePaperId = null;
let resetTimer;

const elements = {
  title: document.querySelector("#matrix-title"),
  subtitle: document.querySelector("#matrix-subtitle"),
  framing: document.querySelector("#matrix-framing"),
  plot: document.querySelector("#matrix-plot"),
  contestLayer: document.querySelector("#contest-layer"),
  paperTypeLegend: document.querySelector("#paper-type-legend"),
  detail: document.querySelector("#paper-detail"),
  count: document.querySelector("#paper-count"),
  xName: document.querySelector("#x-axis-name"),
  xStart: document.querySelector("#x-axis-start"),
  xEnd: document.querySelector("#x-axis-end"),
  yName: document.querySelector("#y-axis-name"),
  yStart: document.querySelector("#y-axis-start"),
  yEnd: document.querySelector("#y-axis-end")
};

function calculatePosition(scores) {
  const xRaw = (Number(scores.q1) + Number(scores.q3)) / 2;
  const yRaw = (Number(scores.q2) + Number(scores.q4) + Number(scores.q5)) / 3;

  return {
    xRaw,
    yRaw,
    xPlot: (xRaw - 1) * 2,
    yPlot: (yRaw - 1) * 2
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function toPercent(value) {
  const boundedValue = clamp(value, PLOT_MIN, PLOT_MAX);
  return ((boundedValue - PLOT_MIN) / (PLOT_MAX - PLOT_MIN)) * 100;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

async function fetchJson(filenames) {
  let lastError;

  for (const filename of filenames) {
    try {
      const response = await fetch(`${filename}?v=${Date.now()}`, {
        cache: "no-store"
      });
      if (!response.ok) throw new Error(`${filename}: HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

async function loadData() {
  try {
    const [criteria, papers] = await Promise.all([
      fetchJson(["matrix_criteria.json", "Matrix_Criteria.json"]),
      fetchJson(["papers.json"])
    ]);

    renderPage(criteria, papers);
  } catch (error) {
    showLoadError(error);
  }
}

function renderPage(criteria, papers) {
  document.title = criteria.title;
  elements.title.textContent = criteria.title;
  elements.subtitle.textContent = criteria.subtitle;
  elements.framing.textContent = criteria.framing;
  elements.count.textContent = String(papers.length).padStart(2, "0");

  renderAxes(criteria.axes);
  renderQuadrants(criteria.quadrants);
  renderPaperTypeLegend(papers);
  renderPapers(criteria, papers);
}

function renderAxes(axes) {
  elements.xName.textContent = `X / ${axes.x.name}`;
  elements.xStart.textContent = axes.x.start_label;
  elements.xEnd.textContent = axes.x.end_label;
  elements.yName.textContent = `Y / ${axes.y.name}`;
  elements.yStart.textContent = axes.y.start_label;
  elements.yEnd.textContent = axes.y.end_label;
}

function renderQuadrants(quadrants) {
  const order = ["top_left", "top_right", "bottom_left", "bottom_right"];

  order.forEach((key) => {
    const quadrant = createElement("section", "quadrant");
    quadrant.dataset.quadrant = key;

    const title = createElement("strong", "quadrant-title", quadrants[key].title);
    const description = createElement(
      "p",
      "quadrant-description",
      quadrants[key].description
    );

    quadrant.append(title, description);
    elements.plot.appendChild(quadrant);
  });
}

function renderPapers(criteria, papers) {
  const overlapCounts = new Map();
  markerRecords = [];
  elements.contestLayer.replaceChildren();
  elements.plot.addEventListener("mouseleave", resetInteractionState);
  elements.plot.addEventListener("focusout", scheduleInteractionReset);

  papers.forEach((paper, index) => {
    const assessments = getAssessments(paper);
    const averageScores = getAverageScores(assessments);
    const primaryIndex = getPrimaryAssessmentIndex(assessments);

    assessments.forEach((assessment, assessmentIndex) => {
      const scores = assessments.length > 1 ? assessment.scores : averageScores;
      const position = calculatePosition(scores);
      const overlapKey = `${position.xPlot.toFixed(3)}-${position.yPlot.toFixed(3)}`;
      const overlapIndex = overlapCounts.get(overlapKey) || 0;
      overlapCounts.set(overlapKey, overlapIndex + 1);

      const jitter = getJitter(overlapIndex);
      const marker = createElement("button", "paper-marker");
      const paperType = getPaperType(paper);
      const paperTypeColor = getPaperTypeColor(paperType);
      const markerNumber = assessments.length > 1
        ? `${index + 1}.${assessmentIndex + 1}`
        : String(index + 1).padStart(2, "0");
      const confidence = normalizeConfidence(assessment.confidence);

      marker.type = "button";
      marker.dataset.paperId = paper.id;
      marker.dataset.assessmentId = assessment.assessment_id || "";
      marker.dataset.paperType = paperType;
      marker.classList.add(`confidence-${confidence}`, getReviewerClass(assessment));
      marker.style.setProperty("--marker-color", paperTypeColor);
      marker.style.setProperty("--overlay-color", paperTypeColor);
      if (assessments.length > 1 && assessmentIndex !== primaryIndex) {
        marker.classList.add("is-secondary-assessment");
      }
      setBleedShape(marker, scores);
      marker.style.left = `${toPercent(position.xPlot)}%`;
      marker.style.bottom = `${toPercent(position.yPlot)}%`;
      marker.style.marginLeft = `${jitter.x}px`;
      marker.style.marginBottom = `${jitter.y}px`;
      marker.setAttribute(
        "aria-label",
        `${markerNumber}: ${paper.title}. ${assessment.reviewer_name || "Reviewer"} score. X ${position.xRaw.toFixed(2)} / Y ${position.yRaw.toFixed(2)}.`
      );
      marker.title = `${paper.title} / ${assessment.reviewer_name || "Reviewer"}`;
      marker.appendChild(createElement("span", "marker-index", markerNumber));
      if (assessments.length > 1) {
        marker.appendChild(createElement("span", "contest-skew-glyph"));
      }

      const inspect = () => {
        activatePaper(paper.id, marker);
        showPaperDetail(criteria, paper, marker, markerNumber, position, scores, assessments, assessment);
      };
      marker.addEventListener("mouseenter", inspect);
      marker.addEventListener("focus", inspect);
      marker.addEventListener("click", inspect);
      marker.addEventListener("mouseleave", resetInteractionState);
      marker.addEventListener("blur", scheduleInteractionReset);

      elements.plot.appendChild(marker);
      markerRecords.push({ paper, assessment, marker, position, jitter, scores });
    });
  });

  applyContestSkewGlyphs();
  requestAnimationFrame(drawContestAreas);
}

function renderPaperTypeLegend(papers) {
  if (!elements.paperTypeLegend) return;

  const counts = new Map();
  papers.forEach((paper) => {
    const paperType = getPaperType(paper);
    counts.set(paperType, (counts.get(paperType) || 0) + 1);
  });

  elements.paperTypeLegend.replaceChildren();
  elements.paperTypeLegend.hidden = counts.size === 0;

  [...counts.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([paperType, count]) => {
      const item = createElement("span", "paper-type-item");
      const swatch = createElement("span", "paper-type-swatch");
      swatch.style.background = getPaperTypeColor(paperType);
      item.append(
        swatch,
        createElement("span", "paper-type-label", `${paperType} (${count})`)
      );
      elements.paperTypeLegend.appendChild(item);
    });
}

function getPaperType(paper) {
  return paper.paper_type || paper.primary_research_community || "Unclassified";
}

function getPaperTypeKey(type) {
  return String(type || "Unclassified")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "unclassified";
}

function getPaperTypeColor(type) {
  return PAPER_TYPE_COLORS[getPaperTypeKey(type)] || PAPER_TYPE_COLORS.unclassified;
}

function getAssessments(paper) {
  if (Array.isArray(paper.assessments) && paper.assessments.length) {
    return paper.assessments;
  }

  return [{
    reviewer_name: "Unspecified reviewer",
    reviewer_type: "human",
    submitted_at: "",
    scores: paper.scores || {},
    confidence: paper.confidence || "Not supplied",
    rationale: paper.rationale || ""
  }];
}

function getAverageScores(assessments) {
  const scores = {};

  QUESTION_IDS.forEach((question) => {
    const values = assessments
      .map((assessment) => Number(assessment.scores?.[question]))
      .filter(Number.isFinite);

    scores[question] = values.length
      ? values.reduce((total, value) => total + value, 0) / values.length
      : 0;
  });

  return scores;
}

function getJitter(index) {
  if (index === 0) return { x: 0, y: 0 };

  const angle = index * 2.4;
  const radius = Math.ceil(index / 6) * JITTER_STEP;

  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius
  };
}

function getPrimaryAssessmentIndex(assessments) {
  return assessments.reduce((bestIndex, assessment, index) => {
    const best = assessments[bestIndex];
    const confidenceDelta =
      CONFIDENCE_RANK[normalizeConfidence(assessment.confidence)] -
      CONFIDENCE_RANK[normalizeConfidence(best.confidence)];
    if (confidenceDelta > 0) return index;
    if (confidenceDelta < 0) return bestIndex;

    return getScoreTotal(assessment.scores) > getScoreTotal(best.scores)
      ? index
      : bestIndex;
  }, 0);
}

function getScoreTotal(scores = {}) {
  return QUESTION_IDS.reduce((total, question) => total + (Number(scores[question]) || 0), 0);
}

function getReviewerClass(assessment) {
  if (String(assessment.reviewer_type).toLowerCase() === "ai") return "reviewer-ai";
  if (String(assessment.reviewer_name).trim().toLowerCase() === "adam blaney") {
    return "reviewer-adam";
  }
  return "reviewer-other-human";
}

function activatePaper(paperId, activeMarker) {
  clearTimeout(resetTimer);
  activePaperId = paperId;
  elements.plot.style.setProperty("--active-paper-color", getMarkerColor(activeMarker));

  document.querySelectorAll(".paper-marker").forEach((marker) => {
    const isRelated = marker.dataset.paperId === activePaperId;
    marker.classList.toggle("is-muted", !isRelated);
    marker.classList.toggle("is-related", isRelated);
    marker.classList.toggle("is-active", marker === activeMarker);
  });

  document.querySelectorAll(".contest-area").forEach((area) => {
    area.classList.toggle("is-active", area.dataset.paperId === activePaperId);
  });
}

function scheduleInteractionReset() {
  clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    if (elements.plot.contains(document.activeElement)) {
      return;
    }

    resetInteractionState();
  }, 80);
}

function resetInteractionState() {
  activePaperId = null;
  document.querySelectorAll(".paper-marker").forEach((marker) => {
    marker.classList.remove("is-muted", "is-related", "is-active");
  });
  document.querySelectorAll(".contest-area").forEach((area) => {
    area.classList.remove("is-active");
  });
}

function getMarkerColor(marker) {
  return marker.style.getPropertyValue("--marker-color") || "#ff3d00";
}

function drawContestAreas() {
  const width = elements.plot.clientWidth;
  const height = elements.plot.clientHeight;
  if (!width || !height) return;

  elements.contestLayer.setAttribute("viewBox", `0 0 ${width} ${height}`);
  elements.contestLayer.replaceChildren();
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  elements.contestLayer.appendChild(defs);

  const groups = new Map();
  markerRecords.forEach((record) => {
    const group = groups.get(record.paper.id) || [];
    group.push(record);
    groups.set(record.paper.id, group);
  });

  groups.forEach((records, paperId) => {
    if (records.length < 2) return;

    const boundaryPoints = getContestBoundaryPoints(records, width, height);
    const hull = getConvexHull(boundaryPoints);
    const shape = document.createElementNS("http://www.w3.org/2000/svg", hull.length > 2 ? "polygon" : "polyline");
    const gradientId = `contest-gradient-${safeId(paperId)}`;
    const gradient = createContestGradient(gradientId, boundaryPoints);

    shape.dataset.paperId = paperId;
    shape.classList.add("contest-area");
    if (gradient) {
      defs.appendChild(gradient);
      shape.setAttribute("fill", `url(#${gradientId})`);
    }
    if (paperId === activePaperId) shape.classList.add("is-active");
    shape.setAttribute("points", hull.map((point) => `${point.x},${point.y}`).join(" "));
    if (hull.length === 2) shape.setAttribute("fill", "none");
    elements.contestLayer.appendChild(shape);

  });
}

function applyContestSkewGlyphs() {
  const groups = new Map();
  markerRecords.forEach((record) => {
    const group = groups.get(record.paper.id) || [];
    group.push(record);
    groups.set(record.paper.id, group);
  });

  groups.forEach((records) => {
    if (records.length < 2) return;

    records.forEach((record) => {
      const otherRecords = records.filter((candidate) => candidate !== record);
      setContestSkewShape(record.marker, record.scores, record.position, otherRecords);
    });
  });
}

function setContestSkewShape(marker, scores, position, otherRecords) {
  const basePoints = getScorePolygonPoints(scores);
  const skewedPoints = basePoints.map((point, index) => {
    const angle = (-90 + index * 72) * (Math.PI / 180);
    const unit = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    };
    const pull = Math.max(
      0,
      ...otherRecords.map((record) => {
        const direction = {
          x: (record.position.xPlot - position.xPlot) / 4,
          y: (position.yPlot - record.position.yPlot) / 4
        };
        return direction.x * unit.x + direction.y * unit.y;
      })
    );
    const extension = pull * 34;

    return {
      x: clamp(point.x + unit.x * extension, -18, 118),
      y: clamp(point.y + unit.y * extension, -18, 118)
    };
  });
  const centroid = skewedPoints.reduce((acc, point) => ({
    x: acc.x + point.x / skewedPoints.length,
    y: acc.y + point.y / skewedPoints.length
  }), { x: 0, y: 0 });

  marker.style.setProperty(
    "--contest-skew-polygon",
    skewedPoints.map((point) => `${point.x.toFixed(1)}% ${point.y.toFixed(1)}%`).join(", ")
  );
  marker.style.setProperty("--contest-skew-core-x", `${clamp(centroid.x, 15, 85)}%`);
  marker.style.setProperty("--contest-skew-core-y", `${clamp(centroid.y, 15, 85)}%`);
}

function getRecordCenterPoints(records, width, height) {
  return records.map((record) => {
    const x = (toPercent(record.position.xPlot) / 100) * width + record.jitter.x;
    const y = height - ((toPercent(record.position.yPlot) / 100) * height + record.jitter.y);
    return {
      x: clamp(x, 0, width),
      y: clamp(y, 0, height)
    };
  });
}

function getContestBoundaryPoints(records, width, height) {
  const centers = getRecordCenterPoints(records, width, height);
  const boundaryPoints = [];

  records.forEach((record, index) => {
    const center = centers[index];
    const polygon = getAbsoluteScorePolygon(record.scores, center);

    centers.forEach((otherCenter, otherIndex) => {
      if (index === otherIndex) return;
      boundaryPoints.push(getSupportPoint(polygon, {
        x: otherCenter.x - center.x,
        y: otherCenter.y - center.y
      }));
    });
  });

  return boundaryPoints.length ? boundaryPoints : centers;
}

function getAbsoluteScorePolygon(scores, center) {
  return getScorePolygonPoints(scores).map((point) => ({
    x: center.x + (point.x - 50) * 0.82,
    y: center.y + (point.y - 50) * 0.82
  }));
}

function getSupportPoint(points, direction) {
  const length = Math.hypot(direction.x, direction.y) || 1;
  const unit = {
    x: direction.x / length,
    y: direction.y / length
  };

  return points.reduce((best, point) => {
    const score = point.x * unit.x + point.y * unit.y;
    const bestScore = best.x * unit.x + best.y * unit.y;
    return score > bestScore ? point : best;
  }, points[0]);
}

function createContestGradient(id, points) {
  if (!points.length) return null;

  const center = getPointCenter(points);
  const radius = Math.max(
    36,
    ...points.map((point) => Math.hypot(point.x - center.x, point.y - center.y))
  );
  const gradient = document.createElementNS("http://www.w3.org/2000/svg", "radialGradient");

  gradient.id = id;
  gradient.setAttribute("gradientUnits", "userSpaceOnUse");
  gradient.setAttribute("cx", center.x);
  gradient.setAttribute("cy", center.y);
  gradient.setAttribute("r", radius * 1.65);

  [
    ["0%", "#b9b8b0", "0.5"],
    ["45%", "#b9b8b0", "0.22"],
    ["100%", "#b9b8b0", "0"]
  ].forEach(([offset, color, opacity]) => {
    const stop = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop.setAttribute("offset", offset);
    stop.setAttribute("stop-color", color);
    stop.setAttribute("stop-opacity", opacity);
    gradient.appendChild(stop);
  });

  return gradient;
}

function getPointCenter(points) {
  return points.reduce((acc, point) => ({
    x: acc.x + point.x / points.length,
    y: acc.y + point.y / points.length
  }), { x: 0, y: 0 });
}

function safeId(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "paper";
}

function getConvexHull(points) {
  if (points.length <= 2) return points;

  const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
  const cross = (origin, a, b) =>
    (a.x - origin.x) * (b.y - origin.y) - (a.y - origin.y) * (b.x - origin.x);
  const lower = [];
  const upper = [];

  sorted.forEach((point) => {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0
    ) {
      lower.pop();
    }
    lower.push(point);
  });

  [...sorted].reverse().forEach((point) => {
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0
    ) {
      upper.pop();
    }
    upper.push(point);
  });

  return lower.slice(0, -1).concat(upper.slice(0, -1));
}

function showPaperDetail(criteria, paper, marker, markerNumber, position, scores, assessments, activeAssessment) {
  document.querySelectorAll(".paper-marker.is-active").forEach((activeMarker) => {
    activeMarker.classList.remove("is-active");
  });
  marker.classList.add("is-active");

  elements.detail.replaceChildren();

  const title = createElement("h2", "paper-title", paper.title);
  const meta = createElement("dl", "paper-meta");
  const authors = Array.isArray(paper.authors)
    ? paper.authors.join(", ")
    : paper.authors || "Not supplied";

  addMetaRow(meta, "Record", markerNumber);
  addMetaRow(meta, "Authors", authors);
  addMetaRow(meta, "Year", paper.year ?? "Not supplied");
  addMetaRow(meta, "Source", paper.source || "Not supplied");
  addMetaRow(meta, "Paper type", getPaperType(paper));
  addMetaLinkRow(meta, "Link", paper.doi_or_url);
  addMetaRow(meta, "Assessments", assessments.length);
  addMetaRow(meta, "Position", `X ${position.xRaw.toFixed(2)} / Y ${position.yRaw.toFixed(2)}`);
  addMetaRow(meta, "Reviewer", activeAssessment?.reviewer_name || "Average");
  addMetaRow(meta, "Reviewer type", activeAssessment?.reviewer_type || "mixed");
  addMetaRow(meta, "Confidence", activeAssessment?.confidence || getAggregateConfidence(assessments));

  const rationaleLabel = createElement("span", "meta-label", assessments.length > 1 ? "Selected rationale" : "Rationale");
  const rationale = createElement(
    "p",
    "paper-copy",
    activeAssessment?.rationale || assessments[0]?.rationale || "No rationale supplied."
  );
  const scoresLabel = createElement("span", "meta-label", "Average rubric scores");
  const scoreGrid = createElement("div", "score-grid");

  criteria.questions.forEach((questionObj) => {
    const score = createElement("div", "score");
    score.tabIndex = 0;
    score.title = questionObj.text;
    score.dataset.tooltip = questionObj.text;

    score.append(
      createElement("span", "meta-label", questionObj.id),
      createElement("b", "", formatScore(scores[questionObj.id]))
    );

    scoreGrid.appendChild(score);
  });

  elements.detail.append(title, meta, rationaleLabel, rationale, scoresLabel, scoreGrid);
}

function formatScore(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "–";
  return Number.isInteger(number) ? String(number) : number.toFixed(2);
}

function getAggregateConfidence(assessments) {
  const values = assessments.map((assessment) => assessment.confidence).filter(Boolean);
  return values.length ? values.join(", ") : "Not supplied";
}

function getAggregateConfidenceLevel(assessments) {
  const rank = { low: 1, medium: 2, high: 3 };
  const values = assessments
    .map((assessment) => normalizeConfidence(assessment.confidence))
    .filter((confidence) => rank[confidence]);

  if (!values.length) return "medium";

  return values.reduce((lowest, confidence) => (
    rank[confidence] < rank[lowest] ? confidence : lowest
  ), values[0]);
}

function normalizeConfidence(confidence) {
  const value = String(confidence || "").toLowerCase().trim();
  if (value.startsWith("low")) return "low";
  if (value.startsWith("med")) return "medium";
  if (value.startsWith("high")) return "high";
  return "medium";
}

function setBleedShape(marker, scores) {
  const points = getScorePolygonPoints(scores);
  const center = { x: 50, y: 50 };
  const centroid = points.reduce((acc, point) => ({
    x: acc.x + point.x / points.length,
    y: acc.y + point.y / points.length
  }), { x: 0, y: 0 });
  const maxHorizontal = Math.max(...points.map((point) => Math.abs(point.x - center.x)));
  const maxVertical = Math.max(...points.map((point) => Math.abs(point.y - center.y)));

  marker.style.setProperty(
    "--score-polygon",
    points.map((point) => `${point.x.toFixed(1)}% ${point.y.toFixed(1)}%`).join(", ")
  );
  marker.style.setProperty("--bleed-core-x", `${clamp(centroid.x, 24, 76)}%`);
  marker.style.setProperty("--bleed-core-y", `${clamp(centroid.y, 24, 76)}%`);
  marker.style.setProperty("--bleed-origin-x", `${clamp(100 - centroid.x, 24, 76)}%`);
  marker.style.setProperty("--bleed-origin-y", `${clamp(100 - centroid.y, 24, 76)}%`);
  marker.style.setProperty("--bleed-scale-x", clamp(1 + maxHorizontal / 80, 1, 1.65));
  marker.style.setProperty("--bleed-scale-y", clamp(1 + maxVertical / 80, 1, 1.65));
}

function getScorePolygonPoints(scores) {
  const values = QUESTION_IDS.map((question) => clamp(Number(scores[question]) || 0, 0, 2));
  const center = { x: 50, y: 50 };
  const baseRadius = 18;
  const scoreRadius = 31;

  return values.map((value, index) => {
    const angle = (-90 + index * 72) * (Math.PI / 180);
    const radius = baseRadius + (value / 2) * scoreRadius;

    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius
    };
  });
}

function addMetaRow(list, label, value) {
  list.append(
    createElement("dt", "meta-label", label),
    createElement("dd", "", String(value))
  );
}

function addMetaLinkRow(list, label, value) {
  const linkValue = String(value || "").trim();
  const term = createElement("dt", "meta-label", label);
  const detail = createElement("dd");

  if (!linkValue) {
    detail.textContent = "Not supplied";
  } else {
    const link = createElement("a", "", "Open");
    link.href = normalizeLink(linkValue);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.title = linkValue;
    detail.appendChild(link);
  }

  list.append(term, detail);
}

function normalizeLink(value) {
  if (/^https?:\/\//i.test(value)) return value;
  if (/^10\.\S+/i.test(value)) return `https://doi.org/${value}`;
  return value;
}

function showLoadError(error) {
  elements.title.textContent = "Matrix unavailable";
  elements.detail.replaceChildren();

  const message = createElement(
    "div",
    "status",
    "The JSON files could not be loaded. Open this folder through a local web server rather than directly as a file."
  );
  elements.detail.appendChild(message);
  console.error("Matrix data failed to load:", error);
}

loadData();
