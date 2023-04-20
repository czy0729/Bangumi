/*
 * @Author: czy0729
 * @Date: 2022-09-09 21:41:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-11 19:40:47
 */
import React from 'react'
import { View } from 'react-native'
import { ListView, Heatmap } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { WSA, MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import Header from '../header'
import ListItem from '../list-item'
import { Ctx } from '../types'

function List({ isFocused }, { $ }: Ctx) {
  const { live2D } = systemStore.setting
  const { home, dragging } = $.state
  return (
    <ListView
      ref={$.forwardRef}
      keyExtractor={keyExtractor}
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      data={home}
      ListHeaderComponent={<Header />}
      showFooter={!live2D}
      renderItem={renderItem}
      scrollToTop={isFocused || WSA}
      scrollEnabled={!dragging}
      scrollEventThrottle={32}
      onScroll={$.onScroll}
    />
  )
}

export default obc(List)

function keyExtractor(item: { type: any }) {
  return item.type
}

function renderItem({ item, index }) {
  return (
    <View>
      <ListItem {...item} index={index} />
      <Heatmap
        id='发现.跳转'
        from={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item.type)}
      />
    </View>
  )
}
