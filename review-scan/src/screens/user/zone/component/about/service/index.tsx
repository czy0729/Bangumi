/*
 * @Author: czy0729
 * @Date: 2024-04-09 08:03:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:00:53
 */
import React from 'react'
import { View } from 'react-native'
import { Divider, Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { NetworkServiceItem } from '@stores/users/types'
import { info, open, stl } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Service() {
  const { $ } = useStore<Ctx>()
  const data: NetworkServiceItem[] = [...($.users.networkService || [])]
  if ($.isAdvance) {
    data.unshift({
      label: 'VIP',
      value: '高级会员',
      color: _.colorWarning,
      href: ''
    })
  }

  if ($.users.disconnectUrl) {
    data.unshift({
      label: '好友',
      value: $.state.friendStatus || '查询时间',
      color: _.colorMain,
      href: ''
    })
  }

  if (!data.length) return null

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
            <Text
              size={11}
              bold
              onPress={() => {
                if (item.label === 'VIP') {
                  info('本标签只会在高级会员之间显示', 3)
                } else if (item.label === '好友') {
                  $.logFriendStatus()
                } else if (item.href) {
                  open(item.href)
                }
              }}
            >
              {item.value}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Divider />
    </>
  )
}

export default ob(Service, COMPONENT)
