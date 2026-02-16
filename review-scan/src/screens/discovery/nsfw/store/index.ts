/*
 * @Author: czy0729
 * @Date: 2024-07-20 10:46:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-20 11:31:26
 */
import { collectionStore } from '@stores'
import { init } from '@utils/subject/nsfw'
import Action from './action'
import { NAMESPACE, STATE } from './ds'

let _loaded = false

export default class ScreenNSFW extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE>(NAMESPACE)
    this.setState({
      ...storageData,
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
