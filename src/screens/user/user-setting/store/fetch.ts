/*
 * @Author: czy0729
 * @Date: 2024-09-08 13:38:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:08:58
 *
 * 个人资料与预设背景 / 头像数据请求
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
  fetchBgs = async (): Promise<string[]> => {
    try {
      const res = await get<{ data?: string[]; ts?: number } | string[]>('bgs')
      const bgs = Array.isArray(res) ? res : res?.data || []
      this.setState({
        bgs
      })
      this.save()

      return bgs
    } catch {
      return []
    }
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
