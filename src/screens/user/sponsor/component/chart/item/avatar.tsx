/*
 * @Author: czy0729
 * @Date: 2022-09-07 02:44:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 色块内头像
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { UserStatus } from '@components'
import { Avatar } from '@_'
import { USERS_MAP } from '../../../ds'
import { getSponsorAvatar } from '../../../utils'

import type { AvatarProps } from './types'

/** 色块内的头像, 面积足够大时才渲染 */
function ItemAvatar({ data, size, marginBottom, style }: AvatarProps) {
  return (
    <View
      style={{
        marginBottom
      }}
      pointerEvents='none'
    >
      <UserStatus style={style} userId={USERS_MAP[data]?.i || data} mini={size < 32}>
        <Avatar src={getSponsorAvatar(data)} size={size} errorToHide />
      </UserStatus>
    </View>
  )
}

export default observer(ItemAvatar)
