/*
 * @Author: czy0729
 * @Date: 2024-10-08 16:55:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-03 19:18:18
 */
import { rakuenStore, usersStore, userStore } from '@stores'
import { PMKeys } from '../types'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 电波提醒 */
  fetchNotify = async () => {
    const { list } = await rakuenStore.fetchNotify(true)
    if (list?.length) usersStore.autoUpdateAvatars(list)

    return true
  }

  /** 短信 */
  fetchPM = async (refresh: boolean = false, key?: PMKeys) => {
    const { list } = await userStore.fetchPM(refresh, key)
    if (list?.length) usersStore.autoUpdateAvatars(list)

    return true
  }
}
