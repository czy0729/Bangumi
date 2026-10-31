/*
 * @Author: czy0729
 * @Date: 2022-12-03 10:14:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 04:03:41
 *
 * 本地备份页 Store 入口: 初始化
 */
import { confirm } from '@utils'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

import type { STATE } from './ds'

export default class ScreenBackup extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    if (!this.state.last) {
      confirm('批量获取所有收藏数据？', this.fetchCollectionsAll)
    }

    return true
  }
}
