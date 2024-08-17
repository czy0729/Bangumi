/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:42:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 04:35:14
 */
import { getIds, loadTyperankData } from '../utils'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

/** 分类排行页面状态机 */
class ScreenTyperank extends Action {
  init = async () => {
    await loadTyperankData(this.type)

    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      ids: getIds(this.type, this.tag),
      _loaded: true
    })
  }
}

export default ScreenTyperank
