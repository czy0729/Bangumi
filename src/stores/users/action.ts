/*
 * @Author: czy0729
 * @Date: 2023-04-25 14:05:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-25 14:24:16
 */
import { getTimestamp } from '@utils'
import { UserId } from '@types'
import userStore from '../user'
import Fetch from './fetch'

export default class Actions extends Fetch {
  /** 若登录了, 而且在 2 天内没更新过好友列表, 请求好友列表, 用于帖子楼层标记是否好友 */
  updateFriendsMap = () => {
    if (userStore.isLogin) {
      const { _loaded } = this.myFriendsMap
      if (!_loaded || getTimestamp() - _loaded > 2 * 60 * 60 * 24) {
        this.fetchFriends()
      }
    }
  }

  /** 更新用户简短信息 */
  updateUsersInfo = async (item: {
    avatar: string
    userId: UserId
    userName: string
  }) => {
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
