/*
 * @Author: czy0729
 * @Date: 2019-06-08 03:11:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 05:51:05
 */
import { SUBJECT_TYPE } from '@constants'
import { LocalState } from '@types'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

/** 排行榜页面状态机 */
class ScreenRank extends Action {
  init = async () => {
    const state: LocalState<typeof STATE, typeof EXCLUDE_STATE> = await this.getStorage(NAMESPACE)
    const { type } = this.params
    if (type && SUBJECT_TYPE.findIndex(item => item.label === type) !== -1) {
      state.type = type
    }

    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchRank()
  }
}

export default ScreenRank
