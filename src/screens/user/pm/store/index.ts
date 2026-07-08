/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:04:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-07 22:58:11
 */
import Action from './action'
import { EXCLUDE_STATE } from './ds'

export default class ScreenPM extends Action {
  init = async (scrollView?: any) => {
    this.setState({
      ...EXCLUDE_STATE,
      _loaded: true
    })

    if (scrollView) this.scrollViewRef = scrollView

    if (this.userId) {
      if (this.params.pmFormhash) return

      return this.fetchPMParams()
    }

    if (this.pmDetail?._loaded) this.scrollToBottom()

    await this.fetchPMDetail()

    setTimeout(() => {
      this.scrollToBottom()
    }, 320)

    return true
  }
}
