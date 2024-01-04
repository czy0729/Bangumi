/*
 * @Author: czy0729
 * @Date: 2022-09-09 21:41:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:39:37
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap, ListView } from '@components'
import { BlurViewBottomTab, BlurViewRoot } from '@_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE, WSA } from '@constants'
import { SubjectTypeCn } from '@types'
import ListItem from '../component/list-item'
import { Ctx } from '../types'
import HeaderComponent from '../header-component'
import { COMPONENT } from './ds'

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
        ListHeaderComponent={<HeaderComponent />}
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

export default obc(List, COMPONENT)

function keyExtractor(item: { type: any }) {
  return item.type
}

function renderItem({ item, index }) {
  return (
    <View key={item.type}>
      <ListItem {...item} index={index} />
      <Heatmap id='发现.跳转' from={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item.type)} />
    </View>
  )
}
