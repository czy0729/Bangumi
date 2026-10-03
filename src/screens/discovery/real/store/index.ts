/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-03 00:00:00
 *
 * 找三次元 Store 入口
 */
import { init } from '@utils/subject/real'
import Action from './action'
import { NAMESPACE } from './ds'

import type { STATE } from './ds'

let _loaded = false

export default class ScreenReal extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      _loaded
    })

    if (!_loaded) await init()
    _loaded = true

    this.search()
    setTimeout(() => {
      this.setState({
        _loaded: true
      })
    }, 120)
  }
}
