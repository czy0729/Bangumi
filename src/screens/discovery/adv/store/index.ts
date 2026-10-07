/*
 * @Author: czy0729
 * @Date: 2024-07-14 16:05:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 */
import { createInit } from '@_'
import { collectionStore } from '@stores'
import { init } from '@utils/subject/adv'
import { FILTER_DS } from '../ds'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE, STATE } from './ds'

export default class ScreenADV extends Action {
  init = createInit(this, {
    namespace: NAMESPACE,
    defaults: STATE.query,
    filterDS: FILTER_DS,
    excludeState: EXCLUDE_STATE,
    initData: init,
    onBeforeSearch: () => {
      collectionStore.fetchUserCollectionsQueue(false, '游戏')
    }
  })

  unmount = () => {
    this.scrollToOffset = null
    this.setState(RESET_STATE)
  }
}
