/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:42:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-21 12:00:00
 *
 * 分类排行页面状态机: 载入排行索引 (按类型) 并恢复缓存状态
 */
import { getIds, loadTyperankData } from '../utils'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE } from './ds'

import type { STATE } from './ds'

export default class ScreenTyperank extends Action {
  init = async () => {
    await loadTyperankData(this.type)

    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      ids: getIds(this.type, this.tag),
      _loaded: true
    })

    return true
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
