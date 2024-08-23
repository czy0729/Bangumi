/*
 * @Author: czy0729
 * @Date: 2020-10-17 17:00:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-24 07:20:51
 */
import { subjectStore } from '@stores'
import Computed from './computed'

/** 章节页面状态机 */
class ScreenEpisodes extends Computed {
  init = () => {
    return subjectStore.fetchSubject(this.subjectId)
  }
}

export default ScreenEpisodes
