/*
 * @Author: czy0729
 * @Date: 2022-10-16 16:30:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 20:30:00
 *
 * 页面初始化
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

import type { STATE } from './ds'

export default class ScreenDoubanSync extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    const { data, progress } = this.state
    if (!data.list.length && !progress.fetching) {
      this.fetchDouban('done', 1, false)
    }
  }
}
