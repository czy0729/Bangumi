/*
 * @Author: czy0729
 * @Date: 2022-02-23 06:47:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 15:51:22
 */
import { get } from '@utils/protobuf'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class ScreenBilibiliSync extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      hide: !!storageData?.data?.list?.length,
      loadedBangumiData: !!get('bangumi-data')?.length,
      _loaded: true
    })

    return this.fetchBangumiData()
  }
}
