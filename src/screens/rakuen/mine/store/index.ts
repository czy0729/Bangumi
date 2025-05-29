/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:57:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 06:46:07
 */
import { rakuenStore } from '@stores'
import { loadGroupData } from '../utils'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

/** 小组页面状态机 */
export default class ScreenMine extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    if (storageData.type === 'all') await loadGroupData()

    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return rakuenStore.fetchMine()
  }
}
