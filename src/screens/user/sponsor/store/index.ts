/*
 * @Author: czy0729
 * @Date: 2023-01-07 16:44:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-01 10:43:24
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE } from './ds'

import type { STATE } from './ds'

export default class ScreeSponsor extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return true
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
