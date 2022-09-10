/*
 * @Author: czy0729
 * @Date: 2022-09-09 21:41:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-10 08:12:58
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { WSA, MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import Header from '../header'
import ListItem from '../list-item'
import { Ctx } from '../types'

function List({ isFocused }, { $ }: Ctx) {
  const { home, dragging } = $.state
  return (
    <PaginationList2
      connectRef={$.connectRef}
      keyExtractor={keyExtractor}
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      data={home.list}
      limit={2}
      ListHeaderComponent={<Header />}
      renderItem={renderItem}
      scrollToTop={isFocused || WSA}
      scrollEnabled={!dragging}
    />
  )
}

export default obc(List)

function keyExtractor(item: { type: any }) {
  return item.type
}

function renderItem({ item }) {
  return (
    <View>
      <ListItem {...item} />
      <Heatmap
        id='发现.跳转'
        from={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item.type)}
      />
    </View>
  )
}
