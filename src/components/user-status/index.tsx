/*
 * 给用户头像包裹，显示用户最近的在线状态
 * @Author: czy0729
 * @Date: 2020-10-29 15:04:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-19 14:21:18
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { getTimestamp } from '@utils'
import { systemStore, userStore } from '@stores'
import { Flex } from '../flex'
import { getUserStatus } from './utils'
import { D1_TS, D3_TS } from './ds'
import { memoStyles } from './styles'
import { Props as UserStatusProps } from './types'

export { UserStatusProps, getUserStatus }

export const UserStatus = observer(
  ({ style, last, userId, mini = false, children }: UserStatusProps) => {
    const { onlineStatus } = systemStore.setting
    const lastTS = last || (onlineStatus ? userStore.onlines(userId) : 0)
    if (!lastTS) return children

    const ts = getTimestamp()
    const distance = ts - lastTS
    if (distance > D3_TS) return children

    const styles = memoStyles()
    return (
      <View>
        {children}
        <Flex
          style={[styles.wrap, mini && styles.wrapMini, style]}
          justify='center'
          // @ts-ignore
          pointerEvents='none'
        >
          <View
            style={[
              styles.badge,
              mini && styles.badgeMini,
              distance >= D1_TS && styles.badgeWarning
            ]}
          />
        </Flex>
      </View>
    )
  }
)
