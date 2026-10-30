/*
 * @Author: czy0729
 * @Date: 2019-10-08 17:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 19:08:13
 *
 * 吐槽页 Store 入口: 初始化与卸载
 */
import { timelineStore, userStore } from '@stores'
import { info } from '@utils'
import Action from './action'
import { RESET_STATE } from './ds'

export default class ScreenSay extends Action {
  init = async () => {
    if (this.isNew) {
      if (!userStore.isWebLogin) {
        info('请先登录')
        return
      }

      return timelineStore.fetchFormHash()
    }

    await this.fetchSay()
    if (userStore.isWebLogin) timelineStore.fetchFormHash()
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
