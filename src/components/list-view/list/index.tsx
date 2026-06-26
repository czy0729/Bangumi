/*
 * @Author: czy0729
 * @Date: 2021-11-30 04:24:34
 * @Last Modified by: imagebuilder1837
 * @Last Modified time: 2026-06-26 18:00:00
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
        {...(baseProps as any)}
        data={data}
        skipEnteringExitingAnimations={skipEnteringExitingAnimations}
        renderItem={other.renderItem}
      />
    )
  }

  if (sections) {
    const SectionComponent = animated ? AnimatedSectionList : SectionList
    return <SectionComponent {...(baseProps as any)} sections={sections} />
  }

  const ListComponent = animated ? AnimatedFlatList : FlatList
  return <ListComponent {...(baseProps as any)} data={data} />
}

export default observer(List)
