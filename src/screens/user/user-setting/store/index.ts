/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:56:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 14:00:16
 */
import { getTimestamp } from '@utils'
import Action from './action'
import { NAMESPACE } from './ds'

export default class ScreenUserSetting extends Action {
  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      avatar: state.avatar || '',
      bg: state.bg || '',
      selectedIndex: state.selectedIndex || 0,
      bgs: state.bgs || [],
      pixivs: state.pixivs || [],
      avatars: state.avatars || [],
      _loaded: getTimestamp()
    })

    await this.onInit()
    this.onRefresh()

    return true
  }
}
