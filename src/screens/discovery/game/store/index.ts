/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:11:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-25 21:00:25
 */
import { collectionStore } from '@stores'
import { init } from '@utils/subject/game'
import Action from './action'
import { NAMESPACE } from './ds'

let _loaded = false

class ScreenGame extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      _loaded
    })

    if (!_loaded) await init()
    _loaded = true

    const { _tags = [] } = this.params
    if (_tags.length) this.initQuery(typeof _tags === 'string' ? [_tags] : _tags)

    await init()
    this.search()

    collectionStore.fetchUserCollectionsQueue(false, '游戏')
    setTimeout(() => {
      this.setState({
        _loaded: true
      })
    }, 120)
  }
}

export default ScreenGame
