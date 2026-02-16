/*
 * @Author: czy0729
 * @Date: 2023-05-24 11:13:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 20:24:55
 */
import { userStore } from '@stores'
import { WEB } from '@constants'
import { RESET_STATE } from '../ds'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

/** AI 推荐页面状态机 */
export default class ScreenRecommend extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    if (!WEB) {
      if (!this.state.value && userStore.myId) {
        this.setState({
          value: String(userStore.myId)
        })
      }
      await this.fetchSubjects()
    }

    return this.fetchSubjectsFromOSS()
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
