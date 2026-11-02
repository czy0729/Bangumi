/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:56:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 20:34:29
 *
 * 页面生命周期: 从本地存储恢复显示状态, 并从 subjectStore 同步源头数据
 */
import { toJS } from 'mobx'
import { subjectStore } from '@stores'
import { getTimestamp } from '@utils'
import Action from './action'
import { NAMESPACE } from './ds'

import type { EXCLUDE_STATE, STATE } from './ds'

export default class ScreenOriginSetting extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      data: toJS(subjectStore.origin),
      active: storageData?.active || false,
      _loaded: getTimestamp()
    })
  }
}
