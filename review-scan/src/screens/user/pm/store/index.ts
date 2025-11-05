/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:04:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 01:15:11
 */
import Action from './action'

export default class ScreenPM extends Action {
  init = async (scrollView?: any) => {
    if (scrollView) this.scrollViewRef = scrollView

    if (this.userId) return this.fetchPMParams()

    if (this.pmDetail._loaded) this.scrollToBottom()

    await this.fetchPMDetail()

    setTimeout(() => {
      this.scrollToBottom()
    }, 320)

    return true
  }
}
