/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:58:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-27 10:58:28
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class ScreenTimeline extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)

    let page = storageData?.page || 0
    if (page >= 4) page = 0

    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      page,
      renderedTabsIndex: [page],
      _loaded: true
    })

    return this.fetchTimeline(true)
  }
}
