/*
 * @Author: czy0729
 * @Date: 2022-09-09 21:41:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-09 01:06:10
 */
import React from 'react'
import { View } from 'react-native'
import {
  HardwareTextureRootBlurView,
  HardwareTextureBlurView,
  ListView,
  Heatmap
} from '@components'
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
    <HardwareTextureRootBlurView style={_.container.flex}>
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
        scrollEventThrottle={16}
        onScroll={$.onScroll}
      />
      <HardwareTextureBlurView
        style={{
          position: 'absolute',
          zIndex: 1,
          right: 0,
          bottom: 0,
          left: 0,
          height: _.tabBarHeight,
          backgroundColor: _.select('transparent', 'rgba(0, 0, 0, 0.5)'),
          overflow: 'hidden'
        }}
        containerStyle={{
          marginTop: -1
        }}
      />
      <View
        style={{
          position: 'absolute',
          zIndex: 2,
          right: 0,
          bottom: 0,
          left: 0,
          height: 1,
          backgroundColor: _.select('#fff', '#000')
        }}
      />
    </HardwareTextureRootBlurView>
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
