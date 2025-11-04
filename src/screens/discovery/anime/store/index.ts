/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-04 19:12:31
 */
import { init } from '@utils/subject/anime'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE } from './ds'

import type { STATE } from './ds'

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
