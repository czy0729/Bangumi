/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:08:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-26 05:13:00
 */
import { collectionStore } from '@stores'
import { init } from '@utils/subject/manga'
import Action from './action'
import { NAMESPACE, STATE } from './ds'

let _loaded = false

export default class ScreenManga extends Action {
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

    collectionStore.fetchUserCollectionsQueue(false, '书籍')
    setTimeout(() => {
      this.setState({
        _loaded: true
      })
    }, 120)
  }
}
