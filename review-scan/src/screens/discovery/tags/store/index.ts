/*
 * @Author: czy0729
 * @Date: 2019-10-03 14:48:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 05:42:38
 */
import { TABS } from '../ds'
import { getType, loadTyperankIdsData } from '../utils'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

/** 标签页面状态机 */
export default class ScreenTags extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    const { type } = this.params
    if (type) {
      const page = TABS.findIndex(item => item.key === type)
      if (page !== -1) storageData.page = 0
    }
    if (storageData.rec) await loadTyperankIdsData(getType(storageData.page))

    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchList(this.type, true)
  }
}
