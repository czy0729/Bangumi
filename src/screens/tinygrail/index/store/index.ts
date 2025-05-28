/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 19:33:07
 */
import { systemStore, tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import { queue } from '@utils/fetch'
import { DEV } from '@constants'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class ScreenTinygrail extends Action {
  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: getTimestamp()
    })

    // 没有资产就自动授权
    const { _loaded } = await tinygrailStore.fetchAssets()
    if (!_loaded && !DEV) await this.doAuth()

    // 获取资产和用户唯一标识
    await queue([tinygrailStore.fetchAssets, tinygrailStore.fetchHash, this.fetchCharaAssets])
    queue([systemStore.fetchAdvance, this.caculateChange, this.fetchCount, this.checkCount])

    return true
  }
}
