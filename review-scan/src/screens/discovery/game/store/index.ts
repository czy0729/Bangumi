/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:11:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-25 21:00:25
 */
import { collectionStore } from '@stores'
import { init } from '@utils/subject/game'
import Action from './action'
import { NAMESPACE, STATE } from './ds'

let _loaded = false

export default class ScreenGame extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE>(NAMESPACE)
    this.setState({
      ...storageData,
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
