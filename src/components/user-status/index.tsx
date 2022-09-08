/*
 * 给用户头像包裹，显示用户最近的在线状态
 * @Author: czy0729
 * @Date: 2020-10-29 15:04:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-08 19:02:45
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { getTimestamp } from '@utils'
import { Flex } from '../flex'
import { memoStyles } from './styles'
import { systemStore, userStore } from '@stores'
import { UserId } from '@types'

const D1_TS = 24 * 60 * 60
const D3_TS = 3 * D1_TS

export const UserStatus = observer(
  ({ style, last, userId, mini = false, children }) => {
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

/** 获取用户当前在线状态 */
export function getUserStatus(userId: UserId) {
  const { onlineStatus } = systemStore.setting
  const lastTS = onlineStatus ? userStore.onlines(userId) : 0
  if (!lastTS) return false

  const ts = getTimestamp()
  const distance = ts - lastTS
  if (distance > D3_TS) return false

  if (distance >= D1_TS) return 'Warning'

  return 'Success'
}
