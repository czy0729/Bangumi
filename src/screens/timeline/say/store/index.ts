/*
 * @Author: czy0729
 * @Date: 2019-10-08 17:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 12:07:52
 */
import { timelineStore, userStore } from '@stores'
import { info } from '@utils'
import Action from './action'

class ScreenSay extends Action {
  scrollViewRef: any = null

  init = async (scrollView?: any) => {
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
}

export default ScreenSay
