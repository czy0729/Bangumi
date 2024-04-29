/*
 * @Author: czy0729
 * @Date: 2024-04-30 01:43:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-30 01:54:30
 */
import { systemStore, usersStore } from '@stores'
import { INIT_USER_INFO } from '@stores/user/init'
import { titleCase } from '@utils'
import { SUBJECT_TYPE } from '@constants'
import { UserId } from '@types'

/** 判断是否需要更新条目里特别关注用户的信息 */
export function updateTrackUserInfo(userInfo: typeof INIT_USER_INFO) {
  if (!userInfo?.username || !userInfo?.avatar?.medium || !userInfo?.nickname) return

  let flag = false
  SUBJECT_TYPE.forEach(item => {
    if (flag) return

    const userIds = systemStore.setting[`comment${titleCase(item.label)}`] as UserId[]
    if (userIds?.length && userIds.findIndex(i => i === userInfo.username) !== -1) flag = true
  })
  if (!flag) return

  usersStore.updateUsersInfo({
    avatar: userInfo.avatar.medium,
    userId: userInfo.username,
    userName: userInfo.nickname
  })
}
