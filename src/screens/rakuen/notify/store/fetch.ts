/*
 * @Author: czy0729
 * @Date: 2024-10-08 16:55:20
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-10-08 16:55:20
 */
import { rakuenStore, userStore } from '@stores'
import { PMKeys } from '../types'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 电波提醒 */
  fetchNotify = () => {
    return rakuenStore.fetchNotify(true)
  }

  /** 短信 */
  fetchPM = (refresh: boolean = false, key?: PMKeys) => {
    return userStore.fetchPM(refresh, key)
  }
}
