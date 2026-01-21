/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:11:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-19 16:48:10
 */
import { tinygrailStore } from '@stores'
import { getStorage, getTimestamp } from '@utils'
import Action from './action'
import { EXCLUDE_STATE, INIT_LAST_AUCTION, INIT_LAST_SACRIFICE, NAMESPACE } from './ds'

export default class ScreenTinygrailSacrifice extends Action {
  init = async () => {
    await tinygrailStore.init('test')
    this.setState({
      ...((await this.getStorage(NAMESPACE)) || {}),
      ...EXCLUDE_STATE,
      lastAuction: (await getStorage(this.namespaceLastAuction)) || INIT_LAST_AUCTION,
      lastSacrifice: (await getStorage(this.namespaceLastSacrifice)) || INIT_LAST_SACRIFICE,
      _loaded: getTimestamp()
    })

    return true
  }
}
