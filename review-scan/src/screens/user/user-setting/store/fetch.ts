/*
 * @Author: czy0729
 * @Date: 2024-09-08 13:38:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-09 21:22:39
 */
import { userStore } from '@stores'
import { get } from '@utils/kv'
import { randomAvatars } from '@utils/user-setting'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 个人资料 */
  fetchUserSetting = async () => {
    const data = await userStore.fetchUserSetting()
    const { nickname = '', sign_input = '' } = data
    this.setState({
      nickname,
      sign_input
    })
    this.save()

    return data
  }

  /** 预设背景 */
  fetchBgs = async () => {
    const { data: bgs } = await get('bgs')
    this.setState({
      bgs
    })
    this.save()

    return bgs
  }

  /** 随机头像 */
  fetchAvatars = async () => {
    const avatars = randomAvatars()
    this.setState({
      avatars
    })
    this.save()

    return avatars
  }
}
