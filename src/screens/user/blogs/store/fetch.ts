/*
 * @Author: czy0729
 * @Date: 2024-09-14 06:52:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-04 07:28:40
 */
import { usersStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  fetchBlogs = (refresh: boolean = false) => {
    return usersStore.fetchBlogs(this.userId, refresh)
  }
}
