/*
 * @Author: czy0729
 * @Date: 2022-09-09 21:41:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-11 21:04:48
 */
import React from 'react'
import { View } from 'react-native'
import { ListView, Heatmap } from '@components'
import { BlurViewRoot, BlurViewBottomTab } from '@_'
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
    <BlurViewRoot>
      <ListView
        ref={$.forwardRef}
        keyExtractor={keyExtractor}
        style={_.container.flex}
        contentContainerStyle={_.container.bottom}
        data={home}
        ListHeaderComponent={<Header />}
        showFooter={!live2D && !dragging}
        renderItem={renderItem}
        scrollToTop={isFocused || WSA}
        scrollEnabled={!dragging}
        scrollEventThrottle={4}
        onScroll={$.onScroll}
      />
      <BlurViewBottomTab />
    </BlurViewRoot>
  )
}

export default obc(List)

function keyExtractor(item: { type: any }) {
  return item.type
}

function renderItem({ item, index }) {
  return (
    <View key={item.type}>
      <ListItem {...item} index={index} />
      <Heatmap
        id='发现.跳转'
        from={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item.type)}
      />
    </View>
  )
}
