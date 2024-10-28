/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:06:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-27 08:17:53
 */
import { subjectStore } from '@stores'
import Action from './action'
import { EXCLUDE_STATE } from './ds'

export default class ScreenWordCloud extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(this.namespace)),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    if (this.subjectId) {
      if (!this.subject._loaded) await subjectStore.fetchSubject(this.subjectId)
    } else if (this.topicId) {
      if (!this.topic._loaded) await this.fetchTopic()
    }

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
