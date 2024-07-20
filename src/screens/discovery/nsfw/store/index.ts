/*
 * @Author: czy0729
 * @Date: 2024-07-20 10:46:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-20 11:31:26
 */
import { collectionStore } from '@stores'
import { init } from '@utils/subject/nsfw'
import Action from './action'
import { NAMESPACE } from './ds'

let _loaded = false

class ScreenNSFW extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      _loaded
    })

    if (!_loaded) await init()
    _loaded = true

    collectionStore.fetchUserCollectionsQueue(false)

    this.search()
    setTimeout(() => {
      this.setState({
        _loaded: true
      })
    }, 120)
  }
}

export default ScreenNSFW
