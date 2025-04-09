/*
 * @Author: czy0729
 * @Date: 2024-03-08 15:57:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:24:54
 */
import React from 'react'
import { Flex } from '@components'
import { useStore } from '@stores'
import { desc } from '@utils'
import { useMount, useObserver } from '@utils/hooks'
import ItemTemple from '@screens/tinygrail/_/item-temple'
import { Ctx } from '../../../types'
import { EVENT } from '../ds'
import { memoStyles } from './styles'

function List() {
  const { $ } = useStore<Ctx>()
  useMount(() => {
    $.fetchQueueUnique([$.fetchUsers])
  })

  return useObserver(() => {
    const styles = memoStyles()
    let list = $.charaTemple.list
      .slice()
      .sort((a, b) =>
        desc(
          a.userStarForces >= 1000 ? a.userStarForces : 0,
          b.userStarForces >= 1000 ? b.userStarForces : 0
        )
      )
      // 自己的排最前
      .sort((a, b) => {
        let _a = 0
        let _b = 0
        if (a.name === $.hash) _a += 1
        if (b.name === $.hash) _b += 1
        return _b - _a
      })

    const map = {}
    $.charaTemple.list.forEach(item => {
      if (!map[item.cover]) {
        map[item.cover] = list.length
        list.push({
          ...item,
          // @ts-expect-error
          count: 1
        })
        return
      }

      // @ts-expect-error
      list[map[item.cover]].count += 1
    })

    // 保证能看见自己
    const myTemple = $.charaTemple.list.find(item => item.name === $.hash)
    if (myTemple && !list.find(item => item.name === $.hash)) {
      list.unshift(myTemple)
    }

    if (!$.state.expand) list = list.filter((_item, index) => index < 9)

    // 活跃时间
    const lastActiveMap = {}
    $.users.list.forEach(item => {
      lastActiveMap[item.name] = item.lastActiveDate
    })

    return (
      <Flex style={styles.temples} wrap='wrap' align='start'>
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
            userStarForces={item.userStarForces}
            lastActive={lastActiveMap[item.name]}
            event={EVENT}
          />
        ))}
      </Flex>
    )
  })
}

export default List
