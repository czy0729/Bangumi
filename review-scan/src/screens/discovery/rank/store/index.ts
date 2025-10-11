/*
 * @Author: czy0729
 * @Date: 2019-06-08 03:11:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 05:51:05
 */
import { SUBJECT_TYPE } from '@constants'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE, STATE } from './ds'

/** 排行榜页面状态机 */
export default class ScreenRank extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    const { type } = this.params
    if (type && SUBJECT_TYPE.findIndex(item => item.label === type) !== -1) {
      storageData.type = type
    }

    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchRank()
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
