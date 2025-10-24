/*
 * @Author: czy0729
 * @Date: 2019-10-08 17:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-24 12:31:45
 */
import { timelineStore, userStore } from '@stores'
import { info } from '@utils'
import Action from './action'
import { RESET_STATE } from './ds'

import type { ListViewInstance } from '@components'

export default class ScreenSay extends Action {
  scrollViewRef: ListViewInstance = null

  init = async (scrollView?: ListViewInstance) => {
    if (scrollView) this.scrollViewRef = scrollView

    if (this.isNew) {
      if (!userStore.isWebLogin) {
        info('请先登录')
        return
      }

      return timelineStore.fetchFormHash()
    }

    if (this.say._loaded) this.scrollToBottom(this.scrollViewRef)

    await this.fetchSay()
    if (userStore.isWebLogin) timelineStore.fetchFormHash()
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
