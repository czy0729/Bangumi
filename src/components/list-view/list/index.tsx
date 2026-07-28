/*
 * @Author: czy0729
 * @Date: 2021-11-30 04:24:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-28 14:43:28
 */
import React from 'react'
import { FlatList, SectionList } from 'react-native'
import { observer } from 'mobx-react'
import EnteringExiting from '../entering-exiting'
import { AnimatedFlatList, AnimatedSectionList } from './ds'

import type { BaseProps, ListProps } from './types'

function List<ItemT>({
  connectRef,
  animated,
  skipEnteringExitingAnimations,
  sectionKey,
  sections,
  data,
  ...other
}: ListProps<ItemT>) {
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
  return <ListComponent {...(baseProps as any)} data={data} />
}

export default observer(List)
