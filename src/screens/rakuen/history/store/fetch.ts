/*
 * @Author: czy0729
 * @Date: 2024-06-05 19:42:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-05 20:10:12
 */
import { rakuenStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 小组帖子列表 (我的回复跟小组是一个性质的) */
  fetchGroup = () => {
    return rakuenStore.fetchGroup({
      groupId: 'my_reply',
      page: this.state.replyPage
    })
  }
}
