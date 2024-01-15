/*
 * @Author: czy0729
 * @Date: 2020-10-29 15:04:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:46:03
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { systemStore, userStore } from '@stores'
import { getTimestamp, stl } from '@utils'
import { r } from '@utils/dev'
import { Component } from '../component'
import { Flex } from '../flex'
import { getUserStatus } from './utils'
import { COMPONENT, D1_TS, D3_TS, D7_TS } from './ds'
import { memoStyles } from './styles'
import { Props as UserStatusProps } from './types'

export { UserStatusProps, getUserStatus }

/** 给用户头像包裹，显示用户最近的在线状态 */
export const UserStatus = observer(
  ({ style, last, userId, mini = false, children }: UserStatusProps) => {
    r(COMPONENT)

    const { onlineStatus } = systemStore.setting
    const lastTS = last || (onlineStatus ? userStore.onlines(userId) : 0)
    if (!lastTS) return children

    const ts = getTimestamp()
    const distance = ts - lastTS
    if (distance > D7_TS) return children

    const styles = memoStyles()
    return (
      <Component id='component-user-status'>
        <View>
          {children}
          <Flex
            style={stl(styles.wrap, mini && styles.wrapMini, style)}
            justify='center'
            pointerEvents='none'
          >
            <View
              style={stl(
                styles.badge,
                mini && styles.badgeMini,
                distance >= D3_TS ? styles.badgeDisabled : distance >= D1_TS && styles.badgeWarning
              )}
            />
          </Flex>
        </View>
      </Component>
    )
  }
)
