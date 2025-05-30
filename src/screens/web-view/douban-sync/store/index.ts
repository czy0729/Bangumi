/*
 * @Author: czy0729
 * @Date: 2022-10-16 16:30:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 14:27:56
 */
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class ScreenBilibiliSync extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      hide: !!storageData?.data?.list?.length,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    const { data, progress } = this.state
    if (!data.list.length && !progress.fetching) {
      this.fetchDouban('done', 1, false)
    }
  }
}
