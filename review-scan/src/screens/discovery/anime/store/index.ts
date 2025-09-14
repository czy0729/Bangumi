/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-26 13:32:41
 */
import { collectionStore } from '@stores'
import { init } from '@utils/subject/anime'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE, STATE } from './ds'

let _loaded = false

export default class ScreenAnime extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    const commitState = {
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded
    }

    // @ts-expect-error
    if (!Array.isArray(commitState.tags)) commitState.tags = []
    this.setState(commitState)

    if (!_loaded) await init()
    _loaded = true

    const { _tags = [] } = this.params
    if (_tags.length) this.initQuery(typeof _tags === 'string' ? [_tags] : _tags)

    collectionStore.fetchUserCollectionsQueue(false)

    this.search()
    setTimeout(() => {
      this.setState({
        _loaded: true
      })
    }, 120)
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
