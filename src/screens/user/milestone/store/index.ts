/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:54:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-11 23:08:08
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class ScreenWordCloud extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    this.fetchUsers()
    await this.fetchUserCollections(true)
    return this.fetchUserCollections()
  }
}
