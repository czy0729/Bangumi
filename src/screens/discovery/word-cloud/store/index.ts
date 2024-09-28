/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:06:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-28 22:19:54
 */
import Action from './action'
import { EXCLUDE_STATE } from './ds'

export default class ScreenWordCloud extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(this.namespace)),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    if (!(await this.fetchSnapshot())) {
      if (this.subjectId) {
        this.batchSubjectThenCut()
      } else if (this.topicId) {
        this.cutTopic()
      } else if (this.monoId) {
        this.cutMono()
      }
    } else {
      // 人物吐槽并没有本地化, 按需再请求
      if (this.monoId && !this.monoComments._loaded) this.fetchMono()
    }

    return true
  }
}
