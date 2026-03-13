/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:04:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-05 15:34:22
 */
import { collectionStore, smbStore, subjectStore } from '@stores'
import { sleep } from '@utils'
import { queue } from '@utils/fetch'
import { decode } from '@utils/protobuf'
import { WEB } from '@constants'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

/**
 * SMB 页面状态
 *  - 因持续迭代开发，相关服务现已支持 webDAV 和文件夹选择
 *  - 为了数据结构一致，依然叫 SMB 罢了
 */
class ScreenSmb extends Action {
  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    const extraState: Partial<typeof EXCLUDE_STATE> = {}
    if (WEB) extraState.tags = state.tags || EXCLUDE_STATE.tags

    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      ...extraState,
      _loaded: false
    })

    await queue([
      () => smbStore.init('data'),
      () => subjectStore.initSubjectV2(this.subjectIds),
      () => collectionStore.init('collection'),
      () => collectionStore.init('collectionStatus'),
      () => decode('bangumi-data')
    ])
    this.cacheList()
    this.setState({
      _loaded: true
    })
  }

  /** 下拉刷新条目信息 */
  onHeaderRefresh = async () => {
    await this.fetchInfos()
    this.cacheList()
    await sleep(400)
    return true
  }
}

export default ScreenSmb
