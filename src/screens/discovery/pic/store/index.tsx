/*
 * @Author: czy0729
 * @Date: 2025-06-09 14:54:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-18 03:37:46
 */
import { userStore } from '@stores'
import { info, queue } from '@utils'
import { TEXT_USER_ABORT } from '../ds'
import Action from './action'
import { EXCLUDE_STATE, RESET_STATE, STATE } from './ds'

/** 图集页面状态机 */
export default class ScreenPic extends Action {
  init = async () => {
    if (!this.keyword) return false

    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(
      this.namespace
    )
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    if (!userStore.isWebLogin) {
      info(TEXT_USER_ABORT)
      return
    }

    return queue([() => this.fetchList(), () => this.fetchSrcs()], 1)
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
