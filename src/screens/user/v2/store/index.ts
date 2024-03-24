/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 08:50:53
 */
import { systemStore, userStore } from '@stores'
import { queue } from '@utils'
import { MODEL_COLLECTIONS_ORDERBY } from '@constants'
import { CollectionsOrderCn } from '@types'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class ScreenUser extends Action {
  init = async () => {
    const next = {
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: true
    }
    next.loadedPage = [next.page]
    this.setState(next)

    await queue([
      () => this.fetchUsersInfo(),
      () => userStore.fetchUserCollectionsStatus(this.userId),
      () => {
        if (
          MODEL_COLLECTIONS_ORDERBY.getLabel<CollectionsOrderCn>(this.state.order) !== '网站评分'
        ) {
          return systemStore.setting.userPagination
            ? this.fetchUserCollectionsNormal(Number(this.state.ipt))
            : this.fetchUserCollections(true)
        }
      },
      () => this.fetchUsers(),
      () => this.fetchUsersCollectionsTimelineQueue()
    ])

    return true
  }
}
