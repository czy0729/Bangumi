/*
 * @Author: czy0729
 * @Date: 2021-11-30 04:24:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-30 05:00:48
 */
import React from 'react'
import { FlatList, SectionList, Animated } from 'react-native'
import { observer } from 'mobx-react'

const ASectionList = Animated.createAnimatedComponent(SectionList)
const AFlatList = Animated.createAnimatedComponent(FlatList)

function List({ connectRef, animated, sectionKey, sections, data, ...other }) {
  if (sections) {
    if (animated)
      return <ASectionList ref={connectRef} sections={sections} {...other} />
    return <SectionList ref={connectRef} sections={sections} {...other} />
  }

  if (animated) return <AFlatList ref={connectRef} data={data} {...other} />
  return <FlatList ref={connectRef} data={data} {...other} />
}

export default observer(List)
