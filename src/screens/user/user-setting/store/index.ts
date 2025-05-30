/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:56:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 14:00:16
 */
import { getTimestamp } from '@utils'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE, STATE } from './ds'

export default class ScreenUserSetting extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      avatar: storageData.avatar || '',
      bg: storageData.bg || '',
      selectedIndex: storageData.selectedIndex || 0,
      bgs: storageData.bgs || [],
      pixivs: storageData.pixivs || [],
      avatars: storageData.avatars || [],
      _loaded: getTimestamp()
    })

    await this.onInit()
    this.onRefresh()

    return true
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
