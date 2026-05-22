/*
 * @Author: czy0729
 * @Date: 2021-11-30 04:24:34
 * @Last Modified by: imagebuilder1837
 * @Last Modified time: 2026-05-22 07:08:42
 */
import React from 'react'
import { FlatList, SectionList } from 'react-native'
import { observer } from 'mobx-react'
import EnteringExiting from '../entering-exiting'
import { AnimatedFlatList, AnimatedSectionList } from './ds'

import type { ListProps } from './types'

function List<ItemT>({
  connectRef,
  animated,
  skipEnteringExitingAnimations,
  sectionKey,
  sections,
  data,
  ...other
}: ListProps<ItemT>) {
  const passProps: any = {
    ref: connectRef,
    removeClippedSubviews: true,
    overScrollMode: 'always',
    ...other,
    alwaysBounceHorizontal: false,
    alwaysBounceVertical: false,
    legacyImplementation: false
  }
  let Component: any

  if (skipEnteringExitingAnimations) {
    passProps.data = data
    Component = EnteringExiting
  } else if (sections) {
    passProps.sections = sections
    Component = animated ? AnimatedSectionList : SectionList
  } else {
    passProps.data = data
    Component = animated ? AnimatedFlatList : FlatList
  }

  return <Component {...passProps} />
}

export default observer(List)
