/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 20:53:12
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class ScreenVoices extends Action {
  init = async () => {
    this.setState({
      ...((await this.getStorage(NAMESPACE)) || {}),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchMonoVoices()
  }

  onHeaderRefresh = () => {
    return this.fetchMonoVoices()
  }
}
