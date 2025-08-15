/*
 * @Author: czy0729
 * @Date: 2024-10-01 17:26:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-01 18:04:28
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Iconfont, UserStatus } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as UserStatusAvatarProps } from './types'

export { UserStatusAvatarProps }

/** 用户状态头像, 支持显示特别关注 */
export const UserStatusAvatar = ob(
  ({ style, navigation, like, userId, userName, avatar, size, event }: UserStatusAvatarProps) => {
    const styles = memoStyles()
    if (like) {
      return (
        <View style={style}>
          <Avatar
            navigation={navigation}
            userId={userId}
            name={userName}
            src={avatar}
            size={size}
            event={event}
          />
          <Iconfont style={styles.favor} name='md-favorite' color={_.colorMain} size={12} />
        </View>
      )
    }

    return (
      <View style={style}>
        <UserStatus userId={userId}>
          <Avatar
            navigation={navigation}
            userId={userId}
            name={userName}
            src={avatar}
            size={size}
            event={event}
          />
        </UserStatus>
      </View>
    )
  },
  COMPONENT
)

export default UserStatusAvatar
