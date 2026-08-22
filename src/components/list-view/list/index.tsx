/*
 * @Author: czy0729
 * @Date: 2021-11-30 04:24:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-22 07:05:23
 */
import { FlatList, SectionList } from 'react-native'
import { observer } from 'mobx-react'
import EnteringExiting from '../entering-exiting'
import { useEstimatedItemHeight } from '../hooks/useEstimatedItemHeight'
import { AnimatedFlatList, AnimatedSectionList } from './ds'

import type { BaseProps, ListProps } from './types'

function List<ItemT>({
  connectRef,
  animated,
  skipEnteringExitingAnimations,
  sectionKey,
  sections,
  data,
  estimatedItemHeight,
  itemHeightKey,
  ...other
}: ListProps<ItemT>) {
  // hook 必须在所有条件 early return 之前调用，enabled 内部已做守卫
  // 进出场动画列表同样支持实测高度缓存, heightProps 会透传给 EnteringExiting
  const heightProps = useEstimatedItemHeight({
    enabled: !!estimatedItemHeight && !sections,
    dataLength: (data as ItemT[])?.length ?? 0,
    estimate: estimatedItemHeight ?? 0,
    resetKey: itemHeightKey,
    header: other.ListHeaderComponent
  })

  const baseProps = {
    ...other,
    ref: connectRef,
    removeClippedSubviews: true,
    overScrollMode: 'always',
    alwaysBounceHorizontal: false,
    alwaysBounceVertical: false,
    legacyImplementation: false
  } as BaseProps<ItemT>

  if (skipEnteringExitingAnimations) {
    return (
      <EnteringExiting
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(baseProps as any)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(heightProps as any)}
        data={data}
        skipEnteringExitingAnimations={skipEnteringExitingAnimations}
        renderItem={other.renderItem}
      />
    )
  }

  if (sections) {
    const SectionComponent = animated ? AnimatedSectionList : SectionList
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <SectionComponent {...(baseProps as any)} sections={sections} />
  }

  const ListComponent = animated ? AnimatedFlatList : FlatList

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <ListComponent {...(baseProps as any)} data={data} {...heightProps} />
}

export default observer(List)
