/*
 * @Author: czy0729
 * @Date: 2024-10-24 20:22:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-24 20:22:38
 */
import { tinygrailStore } from '@stores'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 用户资产概览信息 */
  fetchMyCharaAssets = () => {
    return this.userId
      ? tinygrailStore.fetchCharaAssets(this.userId)
      : tinygrailStore.fetchMyCharaAssets()
  }

  /** 用户圣殿 */
  fetchTemple = () => {
    return tinygrailStore.fetchTemple(this.userId)
  }

  /** ICO 最高人气, 用于整合数据来解决我的 ICO 列表中, 进度条没有参与者数的问题 */
  fetchMpi = () => {
    return tinygrailStore.fetchList('mpi')
  }
}
