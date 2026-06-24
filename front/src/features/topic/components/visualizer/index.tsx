// components/visualizer/index.tsx
//
// D3 그래프 — 데이터가 바뀔 때 전체 SVG를 파괴/재생성(selectAll("*").remove())하지 않고,
// 노드 id를 키로 한 enter/update/exit 데이터 조인으로 변경분만 부분 갱신한다.
//  - svg 프레임·defs(필터)·zoom·레이어·forceSimulation 은 마운트 1회만 생성해 재사용.
//  - data/currentPath 변경 시에는 .data(..., key).join(...) 으로 추가/제거 노드만 DOM 반영,
//    기존 노드는 좌표를 보존해 튐 없이 유지하고 simulation 을 재가열만 한다.

import { useRef, useEffect } from "react";
import * as d3 from "d3";
import { ViewData } from "@/shared/lib/data-transformer";
import { useQuestionTreeContext } from "@/features/topic/contexts/conversation/breadcrumb/question-tree-context";
import { cn } from "@/shared/lib/utils";
import { GRAPH_CONFIG } from "@/constants/ui-constants";

interface InteractiveD3GraphProps {
  data: ViewData;
  onNodeClick: (question: ViewData) => void;
}

type GNode = d3.HierarchyNode<ViewData> & d3.SimulationNodeDatum;
type GLink = d3.HierarchyLink<ViewData>;

export function InteractiveD3Graph({
  data,
  onNodeClick,
}: InteractiveD3GraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentPath } = useQuestionTreeContext();

  const onNodeClickRef = useRef(onNodeClick);
  useEffect(() => {
    onNodeClickRef.current = onNodeClick;
  }, [onNodeClick]);

  // 데이터 변경에도 파괴하지 않고 재사용하는 지속 인스턴스
  const simulationRef = useRef<d3.Simulation<GNode, GLink> | null>(null);
  const layersRef = useRef<{
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
    g: d3.Selection<SVGGElement, unknown, null, undefined>;
    linkLayer: d3.Selection<SVGGElement, unknown, null, undefined>;
    nodeLayer: d3.Selection<SVGGElement, unknown, null, undefined>;
  } | null>(null);
  // 노드 id -> 좌표: 갱신 시 기존 노드 위치를 복원해 튐 방지
  const positionsRef = useRef<Map<string, { x: number; y: number }>>(new Map());
  // 줄기 색상 스케일은 1회 생성해 갱신에도 색 할당이 안정적으로 유지되게 함
  const colorScaleRef = useRef<d3.ScaleOrdinal<string, string>>(
    d3.scaleOrdinal<string, string>(d3.schemeTableau10)
  );

  const glassContainerClass = cn(
    "w-full h-full rounded-[26px] overflow-hidden",
    "bg-white/60 dark:bg-black/60",
    "backdrop-blur-2xl",
    "border border-white/40 dark:border-white/10",
    "shadow-2xl shadow-black/10",
    "transition-all duration-300 ease-out"
  );

  // 줄기(root 바로 아래 자식) 탐색
  const getStem = (d: GNode): GNode => {
    let stem = d;
    while (stem.depth > 1) stem = stem.parent! as GNode;
    return stem;
  };
  // 노드 색: root는 회색, 그 외는 줄기색을 깊이만큼 어둡게
  const getNodeColor = (d: GNode): string => {
    if (d.depth === 0) return "#6b7280"; // gray-500
    const stem = getStem(d);
    const baseColor = d3.color(colorScaleRef.current(stem.data.id));
    if (!baseColor) return "#9ca3af"; // gray-400 (fallback)
    const darkeningFactor = (d.depth - 1) * 0.4;
    return baseColor.darker(darkeningFactor).toString();
  };

  // 1) 마운트 1회: svg 프레임·defs·zoom·레이어·시뮬레이션·tick 구성
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // 필터 정의는 1회만 (매 갱신마다 재생성하던 중복을 제거)
    const defs = svg.append("defs");

    const dropShadow = defs
      .append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");
    dropShadow
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 3)
      .attr("result", "blur");
    dropShadow
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", 2)
      .attr("dy", 2)
      .attr("result", "offsetBlur");
    const feMergeShadow = dropShadow.append("feMerge");
    feMergeShadow.append("feMergeNode").attr("in", "offsetBlur");
    feMergeShadow.append("feMergeNode").attr("in", "SourceGraphic");

    const strongShadow = defs
      .append("filter")
      .attr("id", "strong-shadow")
      .attr("height", "150%");
    strongShadow
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 5);
    strongShadow.append("feOffset").attr("dx", 4).attr("dy", 4);
    const feMergeStrong = strongShadow.append("feMerge");
    feMergeStrong.append("feMergeNode");
    feMergeStrong.append("feMergeNode").attr("in", "SourceGraphic");

    const g = svg.append("g");
    const linkLayer = g.append("g").attr("class", "links");
    const nodeLayer = g.append("g").attr("class", "nodes");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([GRAPH_CONFIG.ZOOM.MIN, GRAPH_CONFIG.ZOOM.MAX])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    svg.call(zoom).on("dblclick.zoom", null);

    const simulation = d3
      .forceSimulation<GNode>()
      .force(
        "link",
        d3
          .forceLink<GNode, GLink>()
          .id((d) => d.data.id)
          .distance((d) =>
            (d.source as GNode).depth === 0
              ? GRAPH_CONFIG.LINK.DISTANCE.ROOT
              : GRAPH_CONFIG.LINK.DISTANCE.DEFAULT
          )
          .strength(GRAPH_CONFIG.LINK.STRENGTH)
      )
      .force(
        "charge",
        d3.forceManyBody().strength(GRAPH_CONFIG.FORCE.CHARGE_STRENGTH)
      )
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3
          .forceCollide<GNode>()
          .radius((d) =>
            d.depth === 0
              ? GRAPH_CONFIG.FORCE.COLLISION_RADIUS.ROOT
              : GRAPH_CONFIG.FORCE.COLLISION_RADIUS.DEFAULT
          )
      );

    // tick: 매번 현재 조인된 셀렉션을 조회해 위치만 갱신
    simulation.on("tick", () => {
      linkLayer
        .selectAll<SVGLineElement, GLink>("line")
        .attr("x1", (d) => (d.source as GNode).x!)
        .attr("y1", (d) => (d.source as GNode).y!)
        .attr("x2", (d) => (d.target as GNode).x!)
        .attr("y2", (d) => (d.target as GNode).y!);
      nodeLayer
        .selectAll<SVGGElement, GNode>("g.node")
        .attr("transform", (d) => `translate(${d.x},${d.y})`);
    });
    // 좌표 보존: 다음 데이터 갱신 때 기존 노드를 같은 자리에 두기 위해 위치를 저장
    simulation.on("tick.save", () => {
      const positions = positionsRef.current;
      nodeLayer.selectAll<SVGGElement, GNode>("g.node").each((d) => {
        if (d.x != null && d.y != null)
          positions.set(d.data.id, { x: d.x, y: d.y });
      });
    });

    simulationRef.current = simulation;
    layersRef.current = { svg, g, linkLayer, nodeLayer };

    return () => {
      simulation.stop();
      svg.selectAll("*").remove();
      simulationRef.current = null;
      layersRef.current = null;
    };
  }, []);

  // 2) data/currentPath 변경: 노드 id 키 기반 enter/update/exit 데이터 조인
  useEffect(() => {
    const layers = layersRef.current;
    const simulation = simulationRef.current;
    if (!layers || !simulation || !containerRef.current) return;
    const { svg, linkLayer, nodeLayer } = layers;

    // 컨테이너 크기 변화 반영
    const { width, height } = containerRef.current.getBoundingClientRect();
    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);
    (simulation.force("center") as d3.ForceCenter<GNode>)
      .x(width / 2)
      .y(height / 2);

    const root = d3.hierarchy(data, (d) => d.children);
    const nodes = root.descendants() as GNode[];
    const links = root.links() as GLink[];

    // 기존 노드는 직전 좌표 복원, 새 노드만 시뮬레이션이 배치
    const positions = positionsRef.current;
    nodes.forEach((n) => {
      const prev = positions.get(n.data.id);
      if (prev) {
        n.x = prev.x;
        n.y = prev.y;
      }
    });

    const baseRadius = GRAPH_CONFIG.NODE.RADIUS.DEFAULT;
    const rootRadius = GRAPH_CONFIG.NODE.RADIUS.ROOT;

    // --- LINK: 키(소스>타깃 id) 기반 조인 — 변경 없는 링크는 DOM 유지 ---
    linkLayer
      .selectAll<SVGLineElement, GLink>("line")
      .data(
        links,
        (d) => `${(d.source as GNode).data.id}>${(d.target as GNode).data.id}`
      )
      .join((enter) =>
        enter
          .append("line")
          .attr("stroke", "rgba(156, 163, 175, 0.4)")
          .attr("stroke-width", 1.5)
      );

    // --- NODE: 키(id) 기반 조인 — 신규만 append, 삭제만 remove, 나머지 유지 ---
    const node = nodeLayer
      .selectAll<SVGGElement, GNode>("g.node")
      .data(nodes, (d) => d.data.id)
      .join((enter) => {
        const gEnter = enter
          .append("g")
          .attr("class", "node")
          .style("cursor", "pointer")
          .style("isolation", "isolate");
        gEnter.append("circle");
        gEnter
          .append("text")
          .attr("text-anchor", "middle")
          .attr("pointer-events", "none")
          .style("text-shadow", "0 1px 3px rgba(255,255,255,0.8)");
        return gEnter;
      });

    // enter+update 공통: 데이터 변경(색·반지름·라벨)을 반영
    node
      .select<SVGCircleElement>("circle")
      .attr("r", (d) => (d.depth === 0 ? rootRadius : baseRadius))
      .attr("fill", (d) => getNodeColor(d))
      .style("filter", (d) =>
        d.depth === 0 ? "url(#strong-shadow)" : "url(#drop-shadow)"
      );

    node
      .select<SVGTextElement>("text")
      .attr("dy", (d) => `${(d.depth === 0 ? rootRadius : baseRadius) + 18}px`)
      .attr("fill", (d) => (d.depth === 0 ? "#000000" : "#1f2937"))
      .attr("font-size", (d) => (d.depth === 0 ? "16px" : "12px"))
      .attr("font-weight", (d) => (d.depth === 0 ? "700" : "600"))
      .text((d) => {
        const text = d.data.questionText;
        const maxLength = d.depth === 0 ? 25 : 15;
        return text.length <= maxLength
          ? text
          : text.substring(0, maxLength) + "...";
      });

    // 배지(즐겨찾기/자식 보유)는 데이터 변경 시 다시 평가 — 기존 배지만 제거 후 필요한 노드에 재부착
    node.select("g.badge").remove();
    const badgeGroup = node
      .filter((d) => d.data.favorite || d.data.children.length > 0)
      .append("g")
      .attr("class", "badge")
      .attr("transform", (d) => {
        const r = d.depth === 0 ? rootRadius : baseRadius;
        const angle = -Math.PI / 4;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        return `translate(${x}, ${y})`;
      });

    badgeGroup.each(function (d) {
      const group = d3.select(this);
      if (d.data.favorite) {
        const starPath =
          "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";
        group
          .append("path")
          .attr("d", starPath)
          .attr("transform", "translate(-11, -11) scale(0.9)")
          .attr("fill", "#f59e0b")
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 1)
          .style("filter", "url(#drop-shadow)");
      }
    });

    // --- 마우스 인터랙션 (최신 콜백·색을 반영하려고 매 갱신 재바인딩) ---
    node
      .on("mouseover", function (event, d) {
        const subtreeNodeIds = new Set(d.descendants().map((n) => n.data.id));
        nodeLayer
          .selectAll<SVGGElement, GNode>("g.node")
          .select("circle")
          .transition()
          .duration(GRAPH_CONFIG.TRANSITION.DURATION.DEFAULT)
          .attr("fill", (n) => {
            if (subtreeNodeIds.has(n.data.id)) {
              if (n.data.id === d.data.id) {
                const color = d3.color(getNodeColor(n));
                return color ? color.brighter(0.7).toString() : "#fff";
              }
              return getNodeColor(n);
            }
            const originalColor = d3.color(getNodeColor(n));
            if (!originalColor) return "#374151";
            const hsl = d3.hsl(originalColor);
            hsl.s = 0.05;
            hsl.l = 0.35;
            return hsl.toString();
          });

        d3.select(this)
          .select<SVGCircleElement>("circle")
          .transition()
          .duration(GRAPH_CONFIG.TRANSITION.DURATION.FAST)
          .attr(
            "r",
            (d.depth === 0 ? rootRadius : baseRadius) +
              GRAPH_CONFIG.NODE.RADIUS.HOVER_INCREASE
          );
      })
      .on("mouseout", function () {
        nodeLayer
          .selectAll<SVGGElement, GNode>("g.node")
          .select("circle")
          .transition()
          .duration(GRAPH_CONFIG.TRANSITION.DURATION.DEFAULT)
          .attr("fill", (n) => getNodeColor(n))
          .attr("r", (n) => (n.depth === 0 ? rootRadius : baseRadius));
      })
      .on("click", function (event, d) {
        onNodeClickRef.current(d.data);
      });

    // --- 드래그 ---
    const drag = d3
      .drag<SVGGElement, GNode>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });
    node.call(drag);

    // 시뮬레이션에 새 노드/링크를 적용하고 재가열(전체 재생성 대신 부분 갱신)
    simulation.nodes(nodes);
    (simulation.force("link") as d3.ForceLink<GNode, GLink>).links(links);
    simulation.alpha(0.3).restart();
  }, [data, currentPath]);

  return (
    <div ref={containerRef} className={glassContainerClass}>
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
}
