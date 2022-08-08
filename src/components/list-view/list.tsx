/*
 * @Author: czy0729
 * @Date: 2021-11-30 04:24:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-08 12:26:37
 */
import React from 'react'
import { FlatList, SectionList, Animated } from 'react-native'
import { observer } from 'mobx-react'
import { Fn, ListEmpty } from '@types'
import { ListProps } from './types'

type PassProps = {
  ref?: Fn
  data?: ListEmpty
  sections?: any

  /** https://reactnative.dev/blog/2021/09/01/preparing-your-app-for-iOS-15-and-android-12#overscroll-effect */
  overScrollMode: 'never'

  /** https://reactnative.dev/docs/scrollview#alwaysbouncehorizontal-ios */
  alwaysBounceHorizontal: false

  /** https://reactnative.dev/docs/scrollview#alwaysbouncevertical-ios */
  alwaysBounceVertical: false
}

const ASectionList = Animated.createAnimatedComponent(SectionList)
const AFlatList = Animated.createAnimatedComponent(FlatList)

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
    alwaysBounceVertical: false
  }

  if (sections) {
    passProps.sections = sections
    Component = animated ? ASectionList : SectionList
  } else {
    passProps.data = data
    Component = animated ? AFlatList : FlatList
  }

  return <Component {...passProps} />
}

export default observer(List)
