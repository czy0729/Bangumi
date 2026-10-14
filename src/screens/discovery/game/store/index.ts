/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:11:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找游戏 Store 入口
 */
import { createInit } from '@_'
import { collectionStore } from '@stores'
import { init } from '@utils/subject/game'
import { filterDS } from '../ds'
import Action from './action'
import { NAMESPACE, STATE } from './ds'

export default class ScreenGame extends Action {
  init = createInit(this, {
    namespace: NAMESPACE,
    defaults: STATE.query,
    filterDS,
    initData: init,
    onBeforeSearch: () => {
      collectionStore.fetchUserCollectionsQueue(false, '游戏')
    }
  })
}
