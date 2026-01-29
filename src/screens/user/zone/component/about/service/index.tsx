/*
 * @Author: czy0729
 * @Date: 2024-04-09 08:03:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-19 05:45:40
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Divider, Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { info, open, stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'
import type { Item } from './types'

function Service() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const baseItems: Item[] = [
      {
        label: '词云',
        value: '查询成分',
        color: _.colorPrimary,
        path: 'WordCloud',
        params: {
          userId: $.username
        }
      },
      {
        label: '照片墙',
        value: '查看收藏',
        color: _.colorSub,
        path: 'Milestone',
        params: {
          userId: $.username
        }
      }
    ]

    const extraItems: Item[] = []
    if ($.isAdvance) {
      extraItems.push({
        label: 'VIP',
        value: '高级会员',
        color: _.colorWarning
      })
    }

    if ($.users.disconnectUrl) {
      extraItems.push({
        label: '好友',
        value: $.state.friendStatus || '查询时间',
        color: _.colorMain
      })
    }

    const data: Item[] = [...extraItems, ...baseItems, ...($.users.networkService || [])]

    const handlePress = useCallback((item: Item) => {
      switch (item.label) {
        case 'VIP':
          info('本标签只会在高级会员之间显示', 3)
          break

        case '好友':
          $.logFriendStatus()
          break

        default:
          if (item.path) {
            navigation.push(item.path, item.params)
          } else if (item.href) {
            open(item.href)
          }
      }
    }, [])

    return (
      <>
        <Flex style={styles.service} wrap='wrap'>
          {data.map(item => (
            <Flex key={item.label} style={styles.item}>
              <View
                style={stl(
                  styles.badge,
                  item.color && {
                    backgroundColor: item.color
                  }
                )}
              >
                <Text size={9} type='__plain__' bold shadow>
                  {item.label}
                </Text>
              </View>
              <Text size={11} bold onPress={() => handlePress(item)}>
                {item.value}
              </Text>
            </Flex>
          ))}
        </Flex>
        <Divider />
      </>
    )
  })
}

export default Service
