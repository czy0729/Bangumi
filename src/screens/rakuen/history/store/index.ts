/*
 * @Author: czy0729
 * @Date: 2024-06-04 15:35:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-01 11:52:03
 */
import { rakuenStore } from '@stores'
import Action from './action'
import { NAMESPACE } from './ds'

/** 本地帖子页面状态机 */
class ScreenRakuenHistory extends Action {
  init = async () => {
    const state = await this.getStorage(NAMESPACE)
    await rakuenStore.init('topic')
    await rakuenStore.init('cloudTopic')

    this.setState({
      ...state,
      _loaded: true
    })

    rakuenStore.getFavor()
    this.fetchGroup()
    this.fetchCollectRank()

    return true
  }
}

export default ScreenRakuenHistory
