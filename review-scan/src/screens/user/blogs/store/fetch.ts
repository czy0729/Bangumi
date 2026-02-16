/*
 * @Author: czy0729
 * @Date: 2024-09-14 06:52:38
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-09-14 06:52:38
 */
import { usersStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  fetchBlogs = (refresh: boolean = false) => {
    return usersStore.fetchBlogs(
      {
        userId: this.userId
      },
      refresh
    )
  }
}
