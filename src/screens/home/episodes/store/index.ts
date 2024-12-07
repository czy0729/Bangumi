/*
 * @Author: czy0729
 * @Date: 2020-10-17 17:00:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-05 15:18:27
 */
import { subjectStore } from '@stores'
import Action from './action'

/** 章节页面状态机 */
class ScreenEpisodes extends Action {
  init = () => {
    this.setState({
      _loaded: true
    })

    return subjectStore.fetchSubject(this.subjectId)
  }
}

export default ScreenEpisodes
