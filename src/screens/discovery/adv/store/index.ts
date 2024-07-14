/*
 * @Author: czy0729
 * @Date: 2024-07-14 16:05:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-14 16:07:20
 */
import { collectionStore } from '@stores'
import { init } from '@utils/subject/adv'
import Action from './action'
import { NAMESPACE } from './ds'

let _loaded = false

class ScreenADV extends Action {
  init = async () => {
    const state = await this.getStorage(NAMESPACE)
    this.setState({
      ...state,
      _loaded
    })
    if (!_loaded) await init()
    _loaded = true

    collectionStore.fetchUserCollectionsQueue(false, '游戏')

    this.search()
    setTimeout(() => {
      this.setState({
        _loaded: true
      })
    }, 120)
  }
}

export default ScreenADV
