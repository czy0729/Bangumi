/*
 * @Author: czy0729
 * @Date: 2021-11-30 04:24:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-02-12 06:55:15
 */
import React from 'react'
import { FlatList, SectionList, Animated } from 'react-native'
import { observer } from 'mobx-react'

const ASectionList = Animated.createAnimatedComponent(SectionList)
const AFlatList = Animated.createAnimatedComponent(FlatList)

/**
 * overScrollMode='never'
 * https://reactnative.dev/blog/2021/09/01/preparing-your-app-for-iOS-15-and-android-12#overscroll-effect
 */
function List({ connectRef, animated, sectionKey, sections, data, ...other }) {
  if (sections) {
    if (animated)
      return (
        <ASectionList
          ref={connectRef}
          sections={sections}
          {...other}
          overScrollMode='never'
        />
      )
    return (
      <SectionList
        ref={connectRef}
        sections={sections}
        {...other}
        overScrollMode='never'
      />
    )
  }

  if (animated)
    return <AFlatList ref={connectRef} data={data} {...other} overScrollMode='never' />
  return <FlatList ref={connectRef} data={data} {...other} overScrollMode='never' />
}

export default observer(List)
