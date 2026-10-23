/*
 * @Author: czy0729
 * @Date: 2021-07-12 09:55:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 20:20:05
 *
 * 修订历史页面状态机
 */
import { subjectStore } from '@stores'
import Computed from './computed'

export default class ScreenSubjectWiki extends Computed {
  init = () => {
    return subjectStore.fetchWiki({
      subjectId: this.subjectId
    })
  }
}
