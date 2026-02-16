/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:56:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 04:45:46
 */
import { toJS } from 'mobx'
import { subjectStore } from '@stores'
import { getTimestamp } from '@utils'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

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
