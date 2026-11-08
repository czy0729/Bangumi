/*
 * @Author: czy0729
 * @Date: 2022-02-23 06:47:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 20:30:00
 */
import { get } from '@utils/thirdParty/protobuf'
import Action from './action'
import { NAMESPACE } from './ds'

import type { EXCLUDE_STATE, STATE } from './ds'

export default class ScreenBilibiliSync extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      loadedBangumiData: !!get('bangumi-data')?.length,
      _loaded: true
    })

    return this.fetchBangumiData()
  }
}
