/*
 * @Author: czy0729
 * @Date: 2025-12-15 20:25:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 20:57:26
 */
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import Lines from './lines'
import Node from './node'
import OmittedHint from './omitted-hint'
import YearSection from './year-section'
import {
  COMPONENT,
  EXPAND_STEP,
  FOCUS_WINDOW_RADIUS,
  HEAD_KEEP_COUNT,
  SCREEN_HEIGHT,
  START_FROM_RIGHT,
  TAIL_KEEP_COUNT
} from './ds'
import { styles } from './styles'

import type { NodeLayout, RelationEdge, RelationGraphProps } from './types'

export default function RelationGraph({
  data,
  focusId: initialFocusId,
  maxRelations = 10
}: RelationGraphProps) {
  r(COMPONENT)

  const { node, relate } = data

  const [focusId, setFocusId] = useState(initialFocusId)
  const [activeRelation, setActiveRelation] = useState<RelationEdge | null>(null)
  const [, forceUpdate] = useState(0)
  const [focusLayoutReady, setFocusLayoutReady] = useState(false)

  const windowRef = useRef<{ start: number; end: number } | null>(null)
  const layoutsRef = useRef<Map<number, NodeLayout>>(new Map())
  const scrollViewRef = useRef<ScrollView>(null)

  const setLayout = (id: number, x: number, y: number, width: number, height: number) => {
    layoutsRef.current.set(id, {
      left: x,
      right: x + width,
      centerY: y + height / 2,
      height
    })
    forceUpdate(n => n + 1)
    if (Number(id) === Number(initialFocusId)) {
      setFocusLayoutReady(true)
    }
  }

  const sortedNodes = [...node].sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : Infinity
    const db = b.date ? new Date(b.date).getTime() : Infinity
    return da - db
  })

  const total = sortedNodes.length
  const headCount = Math.min(HEAD_KEEP_COUNT, total)
  const tailCount = Math.min(TAIL_KEEP_COUNT, Math.max(0, total - headCount))
  const headNodes = sortedNodes.slice(0, headCount)
  const tailNodes = tailCount > 0 ? sortedNodes.slice(total - tailCount) : []
  const middleNodes = sortedNodes.slice(headCount, total - tailCount)

  if (!windowRef.current) {
    let focusIndex = middleNodes.findIndex(n => Number(n.id) === Number(focusId))
    if (focusIndex === -1) focusIndex = 0

    // 默认窗口大小
    let start = Math.max(0, focusIndex - FOCUS_WINDOW_RADIUS)
    let end = Math.min(middleNodes.length, focusIndex + FOCUS_WINDOW_RADIUS + 1)

    // 如果窗口节点数不够 FOCUS_WINDOW_RADIUS*2 + 1，向前或向后扩展
    const desiredWindowSize = FOCUS_WINDOW_RADIUS * 2 + 1
    const currentSize = end - start
    if (currentSize < desiredWindowSize) {
      const extra = desiredWindowSize - currentSize
      start = Math.max(0, start - Math.floor(extra / 2))
      end = Math.min(middleNodes.length, end + Math.ceil(extra / 2))
    }

    windowRef.current = { start, end }
  }

  const { start, end } = windowRef.current
  const renderMiddleNodes = middleNodes.slice(start, end)

  const omittedTopCount = start
  const omittedBottomCount = middleNodes.length - end

  const handleExpandTop = () => {
    if (!windowRef.current) return
    windowRef.current.start = Math.max(0, windowRef.current.start - EXPAND_STEP)
    forceUpdate(n => n + 1)
  }

  const handleExpandBottom = () => {
    if (!windowRef.current) return
    windowRef.current.end = Math.min(middleNodes.length, windowRef.current.end + EXPAND_STEP)
    forceUpdate(n => n + 1)
  }

  // 年份背景覆盖所有节点
  const nodesByYear: Record<string, typeof node> = {}
  sortedNodes.forEach(n => {
    const year = n.date ? new Date(n.date).getFullYear().toString() : '未知'
    if (!nodesByYear[year]) nodesByYear[year] = []
    nodesByYear[year].push(n)
  })
  const years = Object.keys(nodesByYear).sort((a, b) => Number(a) - Number(b))

  const focusRelations = relate.filter(r => r.src === focusId).slice(0, maxRelations)
  const leftRelations = focusRelations.filter((_, i) =>
    START_FROM_RIGHT ? i % 2 === 1 : i % 2 === 0
  )
  const rightRelations = focusRelations.filter((_, i) =>
    START_FROM_RIGHT ? i % 2 === 0 : i % 2 === 1
  )

  const handleRelationPress = (r: RelationEdge) => {
    setActiveRelation(r)
    const targetLayout = layoutsRef.current.get(Number(r.dst))
    if (targetLayout && scrollViewRef.current) {
      const offset = targetLayout.centerY - SCREEN_HEIGHT / 2 + 80
      scrollViewRef.current.scrollTo({
        y: Math.max(offset, 0),
        animated: true
      })
    }
  }

  useEffect(() => {
    if (!initialFocusId || !focusLayoutReady || !scrollViewRef.current) return
    requestAnimationFrame(() => {
      const layout = layoutsRef.current.get(Number(initialFocusId))
      if (!layout) return
      const offset = layout.centerY - SCREEN_HEIGHT / 2 + 80
      scrollViewRef.current?.scrollTo({
        y: Math.max(offset, 0),
        animated: true
      })
    })
  }, [focusLayoutReady, initialFocusId])

  return useObserver(() => (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.container}
      {...SCROLL_VIEW_RESET_PROPS}
    >
      <View style={styles.stage}>
        {/* 年份背景覆盖全部节点 */}
        {years.map((year, index) => (
          <YearSection
            key={year}
            year={year}
            index={index}
            nodes={nodesByYear[year]}
            layoutsRef={layoutsRef}
          />
        ))}

        {/* 顶部固定节点 */}
        {headNodes.map(item => (
          <Node
            key={item.id}
            item={item}
            focusId={focusId}
            activeRelation={activeRelation}
            layoutsRef={layoutsRef}
            setLayout={setLayout}
            setFocusId={setFocusId}
            setActiveRelation={setActiveRelation}
            scrollViewRef={scrollViewRef}
            focusRelations={focusRelations}
          />
        ))}

        {/* 中间窗口顶部省略 */}
        {omittedTopCount > 0 && (
          <OmittedHint position='top' count={omittedTopCount} onPress={handleExpandTop} />
        )}

        {/* 中间窗口节点 */}
        {renderMiddleNodes.map(item => (
          <Node
            key={item.id}
            item={item}
            focusId={focusId}
            activeRelation={activeRelation}
            layoutsRef={layoutsRef}
            setLayout={setLayout}
            setFocusId={setFocusId}
            setActiveRelation={setActiveRelation}
            scrollViewRef={scrollViewRef}
            focusRelations={focusRelations}
          />
        ))}

        {/* 中间窗口底部省略 */}
        {omittedBottomCount > 0 && (
          <OmittedHint position='bottom' count={omittedBottomCount} onPress={handleExpandBottom} />
        )}

        {/* 底部固定节点 */}
        {tailNodes.map(item => (
          <Node
            key={item.id}
            item={item}
            focusId={focusId}
            activeRelation={activeRelation}
            layoutsRef={layoutsRef}
            setLayout={setLayout}
            setFocusId={setFocusId}
            setActiveRelation={setActiveRelation}
            scrollViewRef={scrollViewRef}
            focusRelations={focusRelations}
          />
        ))}

        <Lines
          side='left'
          relations={leftRelations}
          layoutsRef={layoutsRef}
          activeRelation={activeRelation}
          handleRelationPress={handleRelationPress}
        />
        <Lines
          side='right'
          relations={rightRelations}
          layoutsRef={layoutsRef}
          activeRelation={activeRelation}
          handleRelationPress={handleRelationPress}
        />
      </View>
    </ScrollView>
  ))
}
