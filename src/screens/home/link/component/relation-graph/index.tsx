/*
 * @Author: czy0729
 * @Date: 2025-12-15 20:25:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 15:32:00
 *
 * 关系图: 布局与渲染逻辑见 ./hooks
 */
import { ScrollView, View } from 'react-native'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { useRelationGraph } from './hooks'
import Lines from './lines'
import Node from './node'
import OmittedHint from './omitted-hint'
import YearSection from './year-section'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { RelationGraphProps } from './types'
import type { NodeItem } from '../../types'

function RelationGraph(props: RelationGraphProps) {
  r(COMPONENT)

  const {
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
  } = useRelationGraph(props)

  const node = (item: NodeItem) => (
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
  )

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.container}
      onScroll={props.onScroll}
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
        {headNodes.map(node)}

        {/* 中间窗口顶部省略 */}
        {omittedTopCount > 0 && (
          <OmittedHint position='top' count={omittedTopCount} onPress={handleExpandTop} />
        )}

        {/* 中间窗口节点 */}
        {renderMiddleNodes.map(node)}

        {/* 中间窗口底部省略 */}
        {omittedBottomCount > 0 && (
          <OmittedHint position='bottom' count={omittedBottomCount} onPress={handleExpandBottom} />
        )}

        {/* 底部固定节点 */}
        {tailNodes.map(node)}

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
  )
}

export default observer(RelationGraph)
