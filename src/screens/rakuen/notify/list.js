/*
 * @Author: czy0729
 * @Date: 2020-09-22 16:15:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-12 18:33:41
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import { ItemNotify, ItemPM } from '@screens/_'

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
        ) {
          return null
        }

        return (
          <ItemNotify
            navigation={navigation}
            index={index}
            event={event}
            {...item}
          />
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
    <ListView key={id} keyExtractor={keyExtractor} data={$[id]} {...props} />
  )
}

List.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(List)

function keyExtractor(item, index) {
  return String(index)
}
