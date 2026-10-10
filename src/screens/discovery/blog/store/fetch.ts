/*
 * @Author: czy0729
 * @Date: 2024-08-09 03:17:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 日志数据获取
 */
import { discoveryStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 全站日志 */
  fetchBlog = () => {
    return discoveryStore.fetchBlog({
      type: this.type,
      page: this.state.currentPage[this.type]
    })
  }
}
