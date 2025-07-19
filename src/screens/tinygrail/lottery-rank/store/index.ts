/*
 * @Author: czy0729
 * @Date: 2025-07-17 13:15:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-18 00:22:53
 */
import { getTimestamp } from '@utils'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class ScreenTinygrailLotteryRank extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: getTimestamp()
    })

    return this.refresh()
  }
}
