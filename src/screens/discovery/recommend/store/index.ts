/*
 * @Author: czy0729
 * @Date: 2023-05-24 11:13:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 20:24:55
 */
import { userStore } from '@stores'
import { WEB } from '@constants'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

/** AI 推荐页面状态机 */
class ScreenRecommend extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
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
}

export default ScreenRecommend
