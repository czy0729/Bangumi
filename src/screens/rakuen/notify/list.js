/*
 * @Author: czy0729
 * @Date: 2020-09-22 16:15:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-10 22:05:38
 */
import React from 'react'
import { ListView } from '@components'
import { ItemNotify, ItemPM } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

const event = {
  id: '电波提醒.跳转'
}

function List({ id, title }, { $, navigation }) {
  let props
  if (title === '提醒') {
    props = {
      renderItem: ({ item, index }) => {
        const nextItem = $[id].list[index + 1]
        if (
          nextItem &&
          `${nextItem.userId}|${nextItem.title}|${nextItem.message}|${nextItem.message2}` ===
            `${item.userId}|${item.title}|${item.message}|${item.message2}`
        )
          return null

        return (
          <ItemNotify navigation={navigation} index={index} event={event} {...item} />
        )
      },
      onHeaderRefresh: $.fetchNotify
    }
  } else {
    props = {
      renderItem: ({ item, index }) => (
        <ItemPM
          navigation={navigation}
          index={index}
          event={event}
          onRefresh={key => $.fetchPM(true, key)}
          {...item}
        />
      ),
      onHeaderRefresh: () => key => $.fetchPM(true, key),
      onFooterRefresh: () => key => $.fetchPM(true, key)
    }
  }
  return (
    <ListView
      key={id}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$[id]}
      {...props}
    />
  )
}

export default obc(List)

function keyExtractor(item, index) {
  return String(index)
}
