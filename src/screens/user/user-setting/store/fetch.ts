/*
 * @Author: czy0729
 * @Date: 2024-09-08 13:38:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 13:43:18
 */
import { userStore } from '@stores'
import { getTimestamp } from '@utils'
import { randomAvatars } from '@utils/user-setting'
import { ONLINE_BGS_URL } from '../ds'
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
    const bgs =
      (await fetch(`${ONLINE_BGS_URL}?t=${getTimestamp()}`).then(response => response.json())) || []
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
