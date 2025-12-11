/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:43:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-12 00:59:24
 */
import Action from './action'
import { EXCLUDE_STATE } from './ds'

import type { STATE } from './ds'

export default class ScreenSubjectLink extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(
      this.namespace
    )
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    await this.fetchNode()
    await this.fetchSubjects()
    await this.fetchCollection()

    return true
  }
}
