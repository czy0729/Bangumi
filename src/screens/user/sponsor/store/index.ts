/*
 * @Author: czy0729
 * @Date: 2023-01-07 16:44:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-10 12:14:04
 */
import Action from './action'
import { NAMESPACE } from './ds'

export default class ScreeSponsor extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      _loaded: true
    })

    return true
  }
}
