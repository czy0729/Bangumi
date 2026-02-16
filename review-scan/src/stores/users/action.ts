/*
 * @Author: czy0729
 * @Date: 2023-04-25 14:05:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 07:08:00
 */
import { getTimestamp } from '@utils'
import { D3 } from '@constants'
import { UserId } from '@types'
import userStore from '../user'
import Fetch from './fetch'

export default class Actions extends Fetch {
  autoUpdateAvatars = async (
    list: any[],
    userIdKey: string = 'userId',
    avatarIdKey: string = 'avatar'
  ) => {
    if (!list?.length) return false

    const key = 'avatars'
    await this.init(key)

    const data: Record<UserId, string> = {}
    list.forEach(item => {
      const userId = item?.[userIdKey]
      const avatar = item?.[avatarIdKey]
      if (userId && avatar) {
        if (avatar.includes('/l/000/')) {
          data[userId] = avatar.split('/l/000/')?.[1]
        } else if (avatar.includes('/l/icon.jpg')) {
          data[userId] = 'icon.jpg'
        }
      }
    })

    const { avatars } = this.state
    Object.entries(data).forEach(([userId, avatar]) => {
      if (avatars[userId] === avatar) delete data[userId]
    })

    if (Object.keys(data).length) {
      this.setState({
        [key]: {
          ...avatars,
          ...data
        }
      })
      this.save(key)
    }

    return true
  }

  /** 若登录了, 而且在若干天内没更新过好友列表, 请求好友列表, 用于帖子楼层标记是否好友 */
  updateFriendsMap = () => {
    if (userStore.isLogin) {
      const { _loaded } = this.myFriendsMap
      if (!_loaded || getTimestamp() - _loaded > D3) {
        this.fetchFriends()
      }
    }
  }

  /** 更新用户简短信息 */
  updateUsersInfo = async (item: { avatar: string; userId: UserId; userName: string }) => {
    const key = 'usersInfo'
    await this.init(key)

    this.setState({
      [key]: {
        [item.userId]: {
          ...item,
          _loaded: getTimestamp()
        }
      }
    })
    this.save(key)
  }
}
