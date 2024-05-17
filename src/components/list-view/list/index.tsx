/*
 * @Author: czy0729
 * @Date: 2021-11-30 04:24:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-17 11:42:36
 */
import React from 'react'
import { FlatList, SectionList } from 'react-native'
import { observer } from 'mobx-react'
import EnteringExiting from '../entering-exiting'
import { AnimatedFlatList, AnimatedSectionList } from './ds'
import { ListProps } from './types'

function List<ItemT>({
  connectRef,
  animated,
  skipEnteringExitingAnimations,
  sectionKey,
  sections,
  data,
  ...other
}: ListProps<ItemT>) {
  let Component: any
  const passProps: any = {
    ref: connectRef,
    removeClippedSubviews: true,
    ...other,
    overScrollMode: 'always',
    alwaysBounceHorizontal: false,
    alwaysBounceVertical: false,
    legacyImplementation: false
  }

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
