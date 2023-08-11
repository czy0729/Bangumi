/*
 * @Author: czy0729
 * @Date: 2021-11-30 04:24:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-11 17:53:34
 */
import React from 'react'
import { FlatList, SectionList } from 'react-native'
import { observer } from 'mobx-react'
import { AnimatedSectionList, AnimatedFlatList } from './ds'
import { ListProps, PassProps } from './types'

function List({
  connectRef,
  animated,
  sectionKey,
  sections,
  data,
  ...other
}: ListProps) {
  let Component
  const passProps: PassProps = {
    ref: connectRef,
    ...other,
    overScrollMode: 'never',
    alwaysBounceHorizontal: false,
    alwaysBounceVertical: false,
    removeClippedSubviews: true
  }

  if (sections) {
    passProps.sections = sections
    Component = animated ? AnimatedSectionList : SectionList
  } else {
    passProps.data = data
    Component = animated ? AnimatedFlatList : FlatList
  }

  return <Component {...passProps} />
}

export default observer(List)
