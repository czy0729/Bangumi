/*
 * @Author: czy0729
 * @Date: 2024-09-13 01:01:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-05 05:54:14
 */
import { userStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 新短信参数 */
  fetchPMParams = () => {
    return userStore.fetchPMParams({
      userId: this.userId
    })
  }

  /** 短信详情 */
  fetchPMDetail = () => {
    return userStore.fetchPMDetailV2({
      id: this.id
    })
  }
}
