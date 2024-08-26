/*
 * @Author: czy0729
 * @Date: 2020-05-21 16:37:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-24 11:29:18
 */
import Action from './action'

/** 条目更多角色页面状态机 */
class ScreenCharacters extends Action {
  init = () => {
    this.setState({
      _loaded: true
    })

    return this.fetchCharacters()
  }
}

export default ScreenCharacters
