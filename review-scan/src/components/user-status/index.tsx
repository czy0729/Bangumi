/*
 * @Author: czy0729
 * @Date: 2020-10-29 15:04:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 04:06:17
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { systemStore, userStore } from '@stores'
import { getTimestamp, stl } from '@utils'
import { r } from '@utils/dev'
import { D, D3, D7 } from '@constants'
import { Component } from '../component'
import { Flex } from '../flex'
import { getUserStatus } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as UserStatusProps } from './types'

export { UserStatusProps, getUserStatus }

/** 给用户头像包裹，显示用户最近的在线状态 */
export const UserStatus = observer(
  ({ style, last, userId, mini = false, children }: UserStatusProps) => {
    r(COMPONENT)

    const lastTS = last || (systemStore.setting.onlineStatus ? userStore.onlines(userId) : 0)
    if (!lastTS) return children

    const now = getTimestamp()
    const distance = now - lastTS
    if (distance > D7) return children

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
                distance >= D3 ? styles.badgeDisabled : distance >= D && styles.badgeWarning
              )}
            />
          </Flex>
        </View>
      </Component>
    )
  }
)

export default UserStatus
