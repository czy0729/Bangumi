/*
 * @Author: czy0729
 * @Date: 2026-09-27 11:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 15:32:00
 *
 * 关系图逻辑: 纯函数均可独立单测, useRelationGraph 负责状态组装
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  EXPAND_STEP,
  FOCUS_WINDOW_RADIUS,
  HEAD_KEEP_COUNT,
  NODES_FOR_SPLIT,
  SCREEN_HEIGHT,
  START_FROM_RIGHT,
  TAIL_KEEP_COUNT
} from './ds'

import type { ScrollView } from 'react-native'
import type { NodeLayout, RelationEdge, RelationGraphProps } from './types'
import type { NodeItem } from '../../types'

/** 中间分段渲染窗口 */
export type RelationWindow = {
  start: number
  end: number
}

/** 按日期升序排序, 无日期排最后 */
export function sortNodesByDate(node: NodeItem[]) {
  return [...node].sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : Infinity
    const db = b.date ? new Date(b.date).getTime() : Infinity
    return da - db
  })
}

/** 总量超过阈值时头尾固定、其余为中间分段; 未超过时全部为中间分段 */
export function splitNodes(sortedNodes: NodeItem[]) {
  const total = sortedNodes.length
  let headNodes: NodeItem[] = []
  let tailNodes: NodeItem[] = []
  let middleNodes = sortedNodes

  if (total > NODES_FOR_SPLIT) {
    const headCount = Math.min(HEAD_KEEP_COUNT, total)
    const tailCount = Math.min(TAIL_KEEP_COUNT, Math.max(0, total - headCount))
    headNodes = sortedNodes.slice(0, headCount)
    tailNodes = tailCount > 0 ? sortedNodes.slice(total - tailCount) : []
    middleNodes = sortedNodes.slice(headCount, total - tailCount)
  }

  return { headNodes, tailNodes, middleNodes }
}

/** 以焦点节点为中心初始化渲染窗口, 不足完整窗口大小时向两侧扩展 */
export function createWindow(middleNodes: NodeItem[], focusId: string | number): RelationWindow {
  let focusIndex = middleNodes.findIndex(n => Number(n.id) === Number(focusId))
  if (focusIndex === -1) focusIndex = 0

  let start = Math.max(0, focusIndex - FOCUS_WINDOW_RADIUS)
  let end = Math.min(middleNodes.length, focusIndex + FOCUS_WINDOW_RADIUS + 1)

  const desiredWindowSize = FOCUS_WINDOW_RADIUS * 2 + 1
  const currentSize = end - start
  if (currentSize < desiredWindowSize) {
    const extra = desiredWindowSize - currentSize
    start = Math.max(0, start - Math.floor(extra / 2))
    end = Math.min(middleNodes.length, end + Math.ceil(extra / 2))
  }

  return { start, end }
}

/** 窗口向顶部 / 底部扩展指定步长 */
export function expandWindow(
  window: RelationWindow,
  middleCount: number,
  direction: 'top' | 'bottom',
  step: number = EXPAND_STEP
): RelationWindow {
  if (direction === 'top') {
    return { start: Math.max(0, window.start - step), end: window.end }
  }

  return { start: window.start, end: Math.min(middleCount, window.end + step) }
}

/** 依据窗口切片出中间渲染节点与上下省略数; 未分割 (无窗口) 时显示全部 */
export function sliceWindow(middleNodes: NodeItem[], window: RelationWindow | null) {
  if (!window) {
    return {
      renderMiddleNodes: middleNodes,
      omittedTopCount: 0,
      omittedBottomCount: 0
    }
  }

  return {
    renderMiddleNodes: middleNodes.slice(window.start, window.end),
    omittedTopCount: window.start,
    omittedBottomCount: middleNodes.length - window.end
  }
}

/** 年份分组 (覆盖全部节点, 无日期归入'未知'), 年份升序 */
export function groupNodesByYear(sortedNodes: NodeItem[]) {
  const nodesByYear: Record<string, NodeItem[]> = {}
  sortedNodes.forEach(n => {
    const year = n.date ? new Date(n.date).getFullYear().toString() : '未知'
    if (!nodesByYear[year]) nodesByYear[year] = []
    nodesByYear[year].push(n)
  })

  return {
    nodesByYear,
    years: Object.keys(nodesByYear).sort((a, b) => Number(a) - Number(b))
  }
}

/** 焦点节点的关联线: 过滤隐藏的关系类型, 截取上限 */
export function getFocusRelations(
  relate: RelationEdge[],
  focusId: string | number,
  hideRelates: string[],
  maxRelations: number
) {
  if (!focusId) return []

  let relations = relate.filter(r => r.src === focusId)
  if (hideRelates.length > 0) {
    const hideRelatesSet = new Set(hideRelates)
    relations = relations.filter(r => !hideRelatesSet.has(r.relate))
  }
  return relations.slice(0, maxRelations)
}

/** 关联线按奇偶分配到左右两侧 */
export function splitRelationsBySide(relations: RelationEdge[]) {
  const leftRelations = relations.filter((_, i) => (START_FROM_RIGHT ? i % 2 === 1 : i % 2 === 0))
  const rightRelations = relations.filter((_, i) => (START_FROM_RIGHT ? i % 2 === 0 : i % 2 === 1))

  return { leftRelations, rightRelations }
}

/** 节点在滚动视图中的目标偏移 (让其落在屏幕中上部) */
export function getScrollOffsetToNode(layout: NodeLayout) {
  return Math.max(layout.centerY - SCREEN_HEIGHT / 2 + 80, 0)
}

/** 组装关系图组件所需的全部状态、派生数据与回调 */
export function useRelationGraph(props: RelationGraphProps) {
  const { data, focusId: initialFocusId, maxRelations = 10, hideRelates = [] } = props
  const { node, relate } = data

  const [focusId, setFocusId] = useState(initialFocusId)
  const [activeRelation, setActiveRelation] = useState<RelationEdge | null>(null)
  const [, forceUpdate] = useState(0)
  const [focusLayoutReady, setFocusLayoutReady] = useState(false)

  const [renderWindow, setRenderWindow] = useState<RelationWindow | null>(null)
  const layoutsRef = useRef<Map<number, NodeLayout>>(new Map())
  const scrollViewRef = useRef<ScrollView>(null)

  // 引用稳定, 供 Node 的 handleLayout useCallback 生效 (后续给 Node 加 memo 的前提)
  const setLayout = useCallback(
    (id: number, x: number, y: number, width: number, height: number) => {
      const next: NodeLayout = {
        left: x,
        right: x + width,
        centerY: y + height / 2,
        height
      }

      // onLayout 可能以相同值重复触发, 内容未变化时跳过, 避免初始化期间逐节点触发全树重渲染
      const prev = layoutsRef.current.get(id)
      if (
        prev &&
        prev.left === next.left &&
        prev.right === next.right &&
        prev.centerY === next.centerY &&
        prev.height === next.height
      ) {
        return
      }

      layoutsRef.current.set(id, next)
      forceUpdate(n => n + 1)
      if (Number(id) === Number(initialFocusId)) {
        setFocusLayoutReady(true)
      }
    },
    [initialFocusId]
  )

  // 数据未变化时避免每次渲染 (含 setLayout 触发的重渲染) 重复排序
  const sortedNodes = useMemo(() => sortNodesByDate(node), [node])
  const { headNodes, tailNodes, middleNodes } = useMemo(
    () => splitNodes(sortedNodes),
    [sortedNodes]
  )
  const { nodesByYear, years } = useMemo(() => groupNodesByYear(sortedNodes), [sortedNodes])

  // 数据异步到达, 需要分割时当次渲染同步初始化窗口, 避免先渲染一帧全部中间节点
  // 节点数回落到阈值内时复位, 否则残留窗口会继续切片
  let currentWindow = renderWindow
  if (currentWindow === null && sortedNodes.length > NODES_FOR_SPLIT) {
    currentWindow = createWindow(middleNodes, focusId)
    setRenderWindow(currentWindow)
  } else if (currentWindow !== null && sortedNodes.length <= NODES_FOR_SPLIT) {
    currentWindow = null
    setRenderWindow(null)
  }

  const { renderMiddleNodes, omittedTopCount, omittedBottomCount } = sliceWindow(
    middleNodes,
    currentWindow
  )

  const handleExpandTop = useCallback(() => {
    setRenderWindow(current =>
      current ? expandWindow(current, middleNodes.length, 'top') : current
    )
  }, [middleNodes.length])

  const handleExpandBottom = useCallback(() => {
    setRenderWindow(current =>
      current ? expandWindow(current, middleNodes.length, 'bottom') : current
    )
  }, [middleNodes.length])

  const focusRelations = useMemo(
    () => getFocusRelations(relate, focusId, hideRelates, maxRelations),
    [relate, focusId, hideRelates, maxRelations]
  )
  const { leftRelations, rightRelations } = useMemo(
    () => splitRelationsBySide(focusRelations),
    [focusRelations]
  )

  const handleRelationPress = useCallback((r: RelationEdge) => {
    setActiveRelation(r)
    const targetLayout = layoutsRef.current.get(Number(r.dst))
    if (targetLayout && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: getScrollOffsetToNode(targetLayout),
        animated: true
      })
    }
  }, [])

  // 焦点节点布局测得后, 首次滚动定位到屏幕中上部
  useEffect(() => {
    if (!initialFocusId || !focusLayoutReady || !scrollViewRef.current) return

    requestAnimationFrame(() => {
      const layout = layoutsRef.current.get(Number(initialFocusId))
      if (!layout) return

      scrollViewRef.current?.scrollTo({
        y: getScrollOffsetToNode(layout),
        animated: true
      })
    })
  }, [focusLayoutReady, initialFocusId])

  return {
    focusId,
    setFocusId,
    activeRelation,
    setActiveRelation,
    setLayout,
    layoutsRef,
    scrollViewRef,
    focusRelations,
    headNodes,
    tailNodes,
    renderMiddleNodes,
    omittedTopCount,
    omittedBottomCount,
    nodesByYear,
    years,
    leftRelations,
    rightRelations,
    handleExpandTop,
    handleExpandBottom,
    handleRelationPress
  }
}
