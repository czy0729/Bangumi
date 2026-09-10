/*
 * @Author: czy0729
 * @Date: 2021-01-24 19:41:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 12:00:00
 */
import React, { useCallback, useMemo, useRef } from 'react'
import { FlatList } from 'react-native'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { FROZEN_FN, FROZEN_OBJECT } from '@constants'
import { Component } from '../component'
import { useHorizontalList } from './hooks'
import Item from './item'
import ScrollViewHorizontal from './scroll-view-horizontal'
import { COMPONENT } from './ds'

export { ScrollViewHorizontal }

import type { ListRenderItemInfo } from 'react-native'
import type { Props as ScrollViewHorizontalProps } from './scroll-view-horizontal/types'
import type { Props as HorizontalListProps, WithId, ItemData, TypeCn } from './types'
export type { HorizontalListProps, WithId, ItemData, TypeCn }

/** 虚拟化窗口大小: 屏幕外保留约 2 屏, 避免大量已解码封面常驻内存 */
const WINDOW_SIZE = 5

/** 每批渲染的最大条目数 */
const MAX_TO_RENDER_PER_BATCH = 6

/** 更新批次的时间间隔（毫秒） */
const UPDATE_CELLS_BATCHING_PERIOD = 40

/** 首屏渲染条目数 */
const INITIAL_NUM_TO_RENDER = 10

/**
 * 通用水平移动列表
 *
 * 由 ScrollView 全量渲染改为 FlatList 虚拟化, 屏幕外条目不再挂载 (及其封面图)
 * 滚动容器仍复用 ScrollViewHorizontal, 保留左右渐隐遮罩与全局滚动锁
 */
export const HorizontalList = observer(
  <T extends WithId = ItemData>({
    style,
    contentContainerStyle,
    data,
    counts = FROZEN_OBJECT,
    width = 60,
    height = 60,
    findCn = false,
    typeCn = '',
    relationTypeCn = '',
    ellipsizeMode = 'tail',
    sortData,
    initialRenderNums,
    showMask,
    maskWidth,
    renderItem,
    renderNums,
    onEndReachedOnce,
    onPress = FROZEN_FN as HorizontalListProps<T>['onPress'],
    onSubPress
  }: HorizontalListProps<T>) => {
    r(COMPONENT)

    // 排序 (没封面图的置后) 仍由 hook 负责; 截取交给 FlatList 虚拟化, 故不传 initialRenderNums
    const { memoData } = useHorizontalList({
      data,
      sortData,
      initialRenderNums: 0,
      scrolled: true
    })

    /** onEndReachedOnce 只允许触发一次 (FlatList 可重复触发) */
    const endReachedRef = useRef(false)

    /**
     * 用户是否真实滑动过
     * - FlatList 在内容不足一屏 (或最后一个 cell 已在渲染窗口内) 时, 布局阶段就会回调 onEndReached
     * - 原实现由 ScrollView 的 onScroll 触发, 必须是真实滚动事件, 这里用 onScrollBeginDrag 保持等价语义
     */
    const scrolledRef = useRef(false)
    const handleScrollBeginDrag = useCallback(() => {
      scrolledRef.current = true
    }, [])

    const handleEndReached = useCallback(() => {
      if (!scrolledRef.current) return
      if (endReachedRef.current) return
      endReachedRef.current = true

      onEndReachedOnce?.()
    }, [onEndReachedOnce])

    /** 滚动容器: 复用项目的横向 ScrollView, 保留左右渐隐遮罩 */
    const renderScrollComponent = useCallback(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (props: any) => (
        <ScrollViewHorizontal
          {...(props as ScrollViewHorizontalProps)}
          animated
          // 固定节流, 与虚拟化组件要求的滚动回调频率一致 (原 ScrollViewHorizontal 的取值)
          scrollEventThrottle={16}
          showMask={showMask}
          maskWidth={maskWidth}
        />
      ),
      [maskWidth, showMask]
    )

    const renderFlatItem = useCallback(
      ({ item, index }: ListRenderItemInfo<T>) => {
        if (renderItem) return <React.Fragment>{renderItem(item, index)}</React.Fragment>

        return (
          <Item
            item={item}
            count={counts[String(item.id)] || 0}
            width={width}
            height={height}
            findCn={findCn}
            ellipsizeMode={ellipsizeMode}
            isFirst={index === 0}
            typeCn={typeCn}
            relationTypeCn={relationTypeCn}
            onPress={onPress}
            onSubPress={onSubPress}
          />
        )
      },
      [
        counts,
        width,
        height,
        findCn,
        ellipsizeMode,
        typeCn,
        relationTypeCn,
        renderItem,
        onPress,
        onSubPress
      ]
    )

    const keyExtractor = useCallback((item: T, index: number) => String(item.id ?? index), [])

    /** 额外数量提示作为列表尾部 */
    const listFooter = useMemo(
      () => (typeof renderNums === 'function' ? renderNums : undefined),
      [renderNums]
    )

    return (
      <Component id='component-horizontal-list'>
        <FlatList
          style={style}
          contentContainerStyle={contentContainerStyle}
          data={memoData as readonly T[]}
          horizontal
          keyExtractor={keyExtractor}
          renderItem={renderFlatItem}
          ListFooterComponent={listFooter}
          initialNumToRender={initialRenderNums || INITIAL_NUM_TO_RENDER}
          maxToRenderPerBatch={MAX_TO_RENDER_PER_BATCH}
          updateCellsBatchingPeriod={UPDATE_CELLS_BATCHING_PERIOD}
          windowSize={WINDOW_SIZE}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.01}
          onScrollBeginDrag={handleScrollBeginDrag}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderScrollComponent={renderScrollComponent}
        />
      </Component>
    )
  }
)

export default HorizontalList
