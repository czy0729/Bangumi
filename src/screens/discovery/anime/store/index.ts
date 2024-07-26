/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-26 13:32:41
 */
import { collectionStore } from '@stores'
import { init } from '@utils/subject/anime'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

let _loaded = false

class ScreenAnime extends Action {
  init = async () => {
    const commitState = {
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded
    }
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
}

export default ScreenAnime
