/*
 * @Author: czy0729
 * @Date: 2025-02-19 07:52:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 11:40:00
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

import type { STATE } from './ds'

export default class ScreenLog extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    this.getData()
  }
}
