/*
 * @Author: czy0729
 * @Date: 2022-12-03 10:14:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 07:16:53
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class ScreenActions extends Action {
  init = async () => {
    this.setState({
      ...((await this.getStorage(NAMESPACE)) || {}),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    if (!this.state.last) await this.fetchCollectionsAll()

    return true
  }
}
