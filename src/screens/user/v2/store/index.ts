/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 08:50:53
 */
import { userStore, systemStore } from '@stores'
import { MODEL_COLLECTIONS_ORDERBY } from '@constants'
import { CollectionsOrderCn } from '@types'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class ScreenUser extends Action {
  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    const next = {
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    }
    next.loadedPage = [next.page]
    this.setState(next)

    // 用户信息
    await this.fetchUsersInfo()

    // 用户收藏概览统计
    userStore.fetchUserCollectionsStatus(this.userId)

    // 用户收藏记录
    const { order } = this.state
    if (MODEL_COLLECTIONS_ORDERBY.getLabel<CollectionsOrderCn>(order) !== '网站评分') {
      const { userPagination } = systemStore.setting
      if (userPagination) {
        const { ipt } = this.state
        this.fetchUserCollectionsNormal(Number(ipt))
      } else {
        this.fetchUserCollections(true)
      }
    }

    // 用户信息 (他人视角)
    this.fetchUsers()

    return true
  }
}
