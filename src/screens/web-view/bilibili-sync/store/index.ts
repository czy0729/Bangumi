/*
 * @Author: czy0729
 * @Date: 2022-02-23 06:47:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 19:05:02
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
      // 默认收起登录框, 让用户先看到引导或已有的列表
      hide: true,
      loadedBangumiData: !!get('bangumi-data')?.length,
      _loaded: true
    })

    return this.fetchBangumiData()
  }
}
