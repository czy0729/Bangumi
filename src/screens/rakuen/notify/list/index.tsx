/*
 * @Author: czy0729
 * @Date: 2020-09-22 16:15:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-20 05:20:58
 */
import React from 'react'
import { ListView } from '@components'
import { ItemNotify, ItemPM } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { ListEmpty } from '@types'
import { Ctx, TabsKey } from '../types'

const EVENT = {
  id: '电波提醒.跳转'
} as const

let repeat: number = 0

function List({ id }: { id: TabsKey }, { $, navigation }: Ctx) {
  const props: {
    renderItem?: any
    onHeaderRefresh?: any
    onFooterRefresh?: any
  } = {}
  if (id === 'notify') {
    props.renderItem = ({ item, index }) => {
      const nextItem = $[id].list[index + 1]
      if (
        nextItem &&
        `${nextItem.userId}|${nextItem.title}|${nextItem.message}|${nextItem.message2}` ===
          `${item.userId}|${item.title}|${item.message}|${item.message2}`
      ) {
        repeat += 1
        return null
      }

      const _item = {
        ...item,
        repeat
      }
      repeat = 0

      return <ItemNotify navigation={navigation} event={EVENT} {..._item} />
    }
    props.onHeaderRefresh = $.fetchNotify
  } else {
    props.renderItem = ({ item }) => (
      <ItemPM
        navigation={navigation}
        event={EVENT}
        {...item}
        onRefresh={() => $.fetchPM(true, id)}
      />
    )
    props.onHeaderRefresh = () => $.fetchPM(true, id)
    props.onFooterRefresh = () => $.fetchPM(false, id)
  }

  return (
    <ListView
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$[id] as ListEmpty}
      {...props}
    />
  )
}

export default obc(List)

function keyExtractor(item, index) {
  return String(index)
}
