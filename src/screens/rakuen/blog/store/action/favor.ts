/*
 * @Author: czy0729
 * @Date: 2026-10-23 11:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 11:00:00
 *
 * 收藏动作: 本地收藏状态与云端收藏快照
 */
import { rakuenStore } from '@stores'
import { update } from '@utils/kv'
import Reply from './reply'

export default class Favor extends Reply {
  /** 设置收藏 */
  setFavor = async () => {
    const key = `blog/${this.blogId}` as const
    const value = !this.isFavor
    const result = await rakuenStore.setFavorV2(key, value)
    if (result?.code === 200) {
      if (value) {
        const data = {
          avatar: this.avatar,
          userId: this.userId,
          userName: this.userName,
          title: this.title,
          group: '',
          time: this.time
        }

        update(`favor_${key.replace('/', '_')}`, data)
      }
    }
  }
}
