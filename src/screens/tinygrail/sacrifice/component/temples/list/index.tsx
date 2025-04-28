/*
 * @Author: czy0729
 * @Date: 2024-03-08 15:57:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:24:54
 */
import React from 'react'
import { Flex } from '@components'
import { useStore } from '@stores'
import { formatNumber, getTimestamp, lastDate } from '@utils'
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
    const { templesSort } = $.state

    // 构建用户最后活跃时间映射
    const lastActiveMap = $.users.list.reduce((acc, user) => {
      acc[user.name] = user.lastActiveDate
      return acc
    }, {})

    // 获取排序后的角色列表
    let list = [...$.charaTemple.list].sort((a, b) => {
      if (templesSort === '剩余资产') {
        return b.assets - a.assets
      }

      if (templesSort === '星之力') {
        return b.userStarForces - a.userStarForces
      }

      if (templesSort === '损耗量') {
        return b.sacrifices - b.assets - (a.sacrifices - a.assets)
      }

      if (templesSort === '最近活跃') {
        return (lastActiveMap[b.name] || b.lastActive || '').localeCompare(
          lastActiveMap[a.name] || a.lastActive || ''
        )
      }

      // 按星之力 (>=1000) 降序排序
      const aStars = a.userStarForces >= 1000 ? a.userStarForces : 0
      const bStars = b.userStarForces >= 1000 ? b.userStarForces : 0
      return bStars - aStars
    })

    // 确保当前用户可见
    if (!list.some(item => item.name === $.hash)) {
      const myTemple = $.charaTemple.list.find(item => item.name === $.hash)
      myTemple && list.unshift(myTemple)
    }

    // 折叠状态下只显示前 9 项
    if (!$.state.expand) {
      list = list.slice(0, 9)
    }

    return (
      <Flex style={styles.temples} wrap='wrap' align='start'>
        {list.map(item => {
          const lastActive = lastActiveMap[item.name] || item.lastActive || ''
          let extra = ''
          if (templesSort === '损耗量') {
            const amount = item.sacrifices - item.assets
            if (amount) extra = `已损耗 ${formatNumber(amount, 0)}`
          } else if (templesSort === '最近活跃') {
            extra = lastDate(getTimestamp(lastActive))
          }

          return (
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
              lastActive={lastActive}
              extra={extra}
              event={EVENT}
            />
          )
        })}
      </Flex>
    )
  })
}

export default List
