/*
 * @Author: czy0729
 * @Date: 2024-03-08 15:57:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 18:46:53
 */
import React from 'react'
import { Flex } from '@components'
import { obc } from '@utils/decorators'
import ItemTemple from '@screens/tinygrail/_/item-temple'
import { Ctx } from '../../../types'
import { EVENT } from '../ds'
import { memoStyles } from './styles'

function List(props, { $ }: Ctx) {
  if (!$.state.showTemples) return null

  const styles = memoStyles()
  let list = []
  if ($.state.expand) {
    // 自己的排最前
    list = $.charaTemple.list.slice().sort((a, b) => {
      let _a = 0
      let _b = 0
      if (a.name === $.hash) _a += 1
      if (b.name === $.hash) _b += 1
      return _b - _a
    })
  }

  const map = {}
  $.charaTemple.list.forEach(item => {
    if (!map[item.cover]) {
      map[item.cover] = list.length
      list.push({
        ...item,
        count: 1
      })
      return
    }
    list[map[item.cover]].count += 1
  })

  // 保证能看见自己
  const myTemple = $.charaTemple.list.find(item => item.name === $.hash)
  if (myTemple && !list.find(item => item.name === $.hash)) {
    list.unshift(myTemple)
  }

  if (!$.state.expand) list = list.filter((item, index) => index < 15)

  // 活跃时间
  const lastActiveMap = {}
  $.users.list.forEach(item => {
    lastActiveMap[item.name] = item.lastActiveDate
  })

  return (
    <Flex style={styles.temples} wrap='wrap'>
      {list.map(item => (
        <ItemTemple
          key={item.nickname}
          assets={item.assets}
          avatar={item.avatar}
          cover={item.cover}
          level={item.level}
          userId={item.name}
          nickname={item.nickname}
          sacrifices={item.sacrifices}
          refine={item.refine}
          lastActive={lastActiveMap[item.name]}
          event={EVENT}
        />
      ))}
    </Flex>
  )
}

export default obc(List)
