/*
 * @Author: czy0729
 * @Date: 2022-11-22 22:41:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 07:48:02
 */
import { subjectStore } from '@stores'
import Action from './action'

export default class ScreenActions extends Action {
  init = async () => {
    await subjectStore.init('actions')
    if (!this.subjectId) return false

    this.setState({
      data: {
        data: subjectStore.actions(this.subjectId)
      },
      _loaded: true
    })
  }
}
