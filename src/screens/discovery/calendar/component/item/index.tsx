/*
 * @Author: czy0729
 * @Date: 2023-03-13 02:53:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 17:45:00
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import { cnjp } from '@utils'
import { getCurrentHi, getItemTime, getShowPrevDay, getTime } from '../../utils'
import ItemGrid from './item-grid'
import ItemLine from './item-line'
import Line from './line'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { ItemView, Props } from './types'

function Item({ item, section }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const items = item.items
  const showPrevDay = getShowPrevDay()
  const current = getCurrentHi()
  const linePosition = section?.index === (showPrevDay ? 1 : 0)
  let renderLine = false

  return (
    <Flex wrap='wrap' align='start'>
      {items.map((item, index) => {
        const prevItem = items[index - 1]
        const prevTime = prevItem ? getTime(prevItem, prevItem.id) : ''

        const time = getItemTime(item, index, items)
        const passProps: ItemView = {
          subjectId: item.id,
          images: item.images,
          name: cnjp(item.name_cn, item.name),
          desc: cnjp(item.name, item.name_cn),
          rank: item.rank,
          score: item.rating?.score,
          total: item.rating?.total,
          time,
          prevTime,
          index: item.index
        }

        if (!$.isList) return <ItemGrid key={item.id} {...passProps} />

        // 当前时间在番组播放之前
        if (linePosition && !renderLine && parseInt(time) > current) {
          renderLine = true
          return (
            <View key={item.id} style={_.container.block}>
              <Line />
              <ItemLine {...passProps} />
            </View>
          )
        }

        // 当前时间之后已没有未播放番组
        if (linePosition && !renderLine && index === items.length - 1) {
          return (
            <View key={item.id} style={_.container.block}>
              <ItemLine {...passProps} />
              <Line />
            </View>
          )
        }

        return <ItemLine key={item.id} {...passProps} />
      })}
    </Flex>
  )
}

export default observer(Item)
