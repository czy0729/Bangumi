/*
 * @Author: czy0729
 * @Date: 2024-03-08 17:58:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-14 15:34:37
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { formatNumber, getTimestamp, lastDate, toFixed } from '@utils'
import { useMount, useObserver } from '@utils/hooks'
import TinygrailAvatar from '@tinygrail/_/avatar'
import TinygrailRank from '@tinygrail/_/rank'
import { Ctx } from '../../../types'
import { EVENT } from '../ds'
import { memoStyles } from './styles'

function List() {
  const { $, navigation } = useStore<Ctx>()
  useMount(() => {
    $.fetchQueueUnique([$.fetchUsers, $.fetchCharaPool])
  })

  return useObserver(() => {
    const styles = memoStyles()
    const { usersSort, showUsers } = $.state

    // 获取排序后的董事会列表
    let list = [
      ...$.users.list.map((item: any, index: number) => ({
        ...item,
        index
      }))
    ]

    if (usersSort === '最近活跃') {
      list = list.sort((a, b) => (b.lastActiveDate || '').localeCompare(a.lastActiveDate || ''))
    }

    if (!showUsers) {
      list = list.slice(0, 3)
    }

    return (
      <Flex style={_.mt.sm} wrap='wrap' align='start'>
        {list.map(item => {
          const showAmount = !!item.balance
          return (
            <Flex key={item.nickName} style={styles.item}>
              {$.state.showUsers && (
                <View style={styles.user}>
                  <TinygrailAvatar
                    navigation={navigation}
                    src={item.avatar}
                    size={showAmount ? 46 : 36}
                    userId={item.name}
                    name={item.nickName}
                    last={item.lastActiveDate}
                    event={EVENT}
                  />
                </View>
              )}
              <Flex.Item>
                <Flex style={_.mt.xs}>
                  <TinygrailRank style={styles.rank} value={item.lastIndex} />
                  <Flex.Item>
                    <Text type='tinygrailPlain' size={11} bold numberOfLines={1}>
                      {item.nickName}
                    </Text>
                  </Flex.Item>
                </Flex>
                <Text style={_.mt.xs} type='tinygrailText' size={10} bold numberOfLines={1}>
                  {usersSort === '最近活跃'
                    ? `${lastDate(getTimestamp(item.lastActiveDate))} · `
                    : ''}
                  {item.balance
                    ? `+${formatNumber(item.balance, 0)} (${toFixed(
                        (item.balance / $.total) * 100,
                        2
                      )}%)`
                    : `#${item.index + 1}`}
                </Text>
                {showAmount && (
                  <View style={styles.progress}>
                    <View
                      style={[
                        styles.progressBar,
                        {
                          width: `${Math.max(0.04, item.balance / ($.total || 10000)) * 100}%`
                        }
                      ]}
                    />
                  </View>
                )}
              </Flex.Item>
            </Flex>
          )
        })}
      </Flex>
    )
  })
}

export default List
