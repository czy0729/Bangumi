/*
 * @Author: czy0729
 * @Date: 2024-09-13 01:01:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-07 22:30:38
 */
import { userStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 新短信参数 */
  fetchPMParams = () => {
    return userStore.fetchPMParams(this.userId)
  }

  /** 短信详情 */
  fetchPMDetail = (threadId?: string) => {
    return userStore.fetchPMDetail(this.id, threadId)
  }
}
