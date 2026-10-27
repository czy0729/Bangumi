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
    const storageData = (await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(
      NAMESPACE
    )) as typeof STATE & {
      /** 旧版本持久化过, 已废弃 */
      isFocused?: unknown
    }

    // 不迁移存储, 下一次 save 后自然消失
    delete storageData.isFocused

    // 无缓存时用 STATE 的默认值判断, 否则网页端首次进入不会预热静态数据
    if ((storageData.type || STATE.type) === 'all') await loadGroupData()

    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return rakuenStore.fetchMine()
  }
}
