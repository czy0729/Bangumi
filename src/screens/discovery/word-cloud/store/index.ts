/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:06:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 19:05:15
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
        this.batchSubject()
      } else if (this.topicId) {
        this.cutTopic()
      }
    }

    return true
  }
}
