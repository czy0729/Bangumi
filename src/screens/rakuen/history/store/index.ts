/*
 * @Author: czy0729
 * @Date: 2024-06-04 15:35:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 06:01:44
 */
import { rakuenStore } from '@stores'
import { queue } from '@utils'
import Action from './action'
import { NAMESPACE } from './ds'

import type { STATE } from './ds'

/** 本地帖子页面状态机 */
export default class ScreenRakuenHistory extends Action {
  init = async () => {
    // topic 分桶后需读回全部桶才能拿到已浏览帖子 key, 并发 16 加速批量懒读
    await rakuenStore.init('cloudTopic')
    await queue(
      Array.from({ length: 1000 }, (_, i) => () => rakuenStore.init(`topic${i}` as const)),
      16
    )
    const storageData = await this.getStorageOnce<typeof STATE>(NAMESPACE)

    this.setState({
      ...storageData,
      _loaded: true
    })

    rakuenStore.getFavor()
    this.fetchGroup()
    this.fetchCollectRank()

    return true
  }
}
