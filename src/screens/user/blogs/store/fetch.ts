/*
 * @Author: czy0729
 * @Date: 2024-09-14 06:52:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 14:43:56
 *
 * 用户日志页请求
 */
import { usersStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 获取用户日志 */
  fetchBlogs = (refresh: boolean = false) => {
    return usersStore.fetchBlogs(this.userId, refresh)
  }
}
