/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:06:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-08 06:28:40
 */
import { subjectStore } from '@stores'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class ScreenWordCloud extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      type: this.params.type || '简介',
      _loaded: true
    })

    if (!this.subject._loaded) subjectStore.fetchSubject(this.subjectId)
    if (!this.subjectFromHTML._loaded) subjectStore.fetchSubjectFromHTML(this.subjectId)

    return true
  }
}
