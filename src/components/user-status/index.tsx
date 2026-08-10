/*
 * @Author: czy0729
 * @Date: 2020-10-29 15:04:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 14:42:08
 */
import React from 'react'
import { observer } from 'mobx-react'
import { systemStore, userStore } from '@stores'
import { r } from '@utils/dev'
import UserStatusView from './user-status-view'
import { getUserStatus } from './utils'
import { COMPONENT } from './ds'

export { getUserStatus }

import type { Props as UserStatusProps } from './types'
export type { UserStatusProps }

/** 给用户头像包裹，显示用户最近的在线状态 */
export const UserStatus = observer(
  ({ style, last, userId, mini = false, children }: UserStatusProps) => {
    r(COMPONENT)

    // 传了 last 直接短路, 不读任何 store; 否则从 userStore 按 userId 取在线时间
    const lastTS = last || (systemStore.setting.onlineStatus ? userStore.onlines(userId) : 0)

    // 无在线记录时不用包一层徽标, 原样渲染 children 即可
    if (!lastTS) return <>{children}</>

    return (
      <UserStatusView lastTS={lastTS} style={style} mini={mini}>
        {children}
      </UserStatusView>
    )
  }
)

export default UserStatus
