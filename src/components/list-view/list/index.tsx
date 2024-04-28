/*
 * @Author: czy0729
 * @Date: 2021-11-30 04:24:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-12 18:38:00
 */
import React from 'react'
import { FlatList, SectionList } from 'react-native'
import { observer } from 'mobx-react'
import { AnimatedFlatList, AnimatedSectionList } from './ds'
import { ListProps } from './types'

function List({ connectRef, animated, sectionKey, sections, data, ...other }: ListProps) {
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
