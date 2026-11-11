/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-12 00:53:44
 */
import { systemStore, timelineStore, userStore } from '@stores'
import { queue } from '@utils'
import { MODEL_COLLECTIONS_ORDERBY } from '@constants'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

import type { CollectionsOrderCn } from '@types'
import type { STATE } from './ds'

export default class ScreenUser extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    const state = {
      ...storageData,
      ...EXCLUDE_STATE,
      _loaded: true
    }
    state.loadedPage = [state.page]
    this.setState(state)

    await queue([
      () => this.fetchUsersInfo(),
      () => userStore.fetchUserCollectionsStatus(this.userId),
      () => {
        const isSortByScore =
          MODEL_COLLECTIONS_ORDERBY.getLabel<CollectionsOrderCn>(this.state.order) === '网站评分'
        if (systemStore.setting.userPagination && !isSortByScore) {
          return this.fetchUserCollectionsNormal(Number(this.state.ipt))
        }

        return this.fetchUserCollections(true)
      },
      () => this.fetchUsers(),
      () => timelineStore.fetchUsersCollectionsTimelineQueue(this.username || this.userId)
    ])

    return true
  }
}
