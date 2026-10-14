/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找 Hentai Store 入口
 */
import { createInit } from '@_'
import { collectionStore } from '@stores'
import { init } from '@utils/subject/hentai'
import { filterDS } from '../ds'
import Action from './action'
import { NAMESPACE, STATE } from './ds'

export default class ScreenHentai extends Action {
  init = createInit(this, {
    namespace: NAMESPACE,
    defaults: STATE.query,
    filterDS,
    initData: init,
    onBeforeSearch: () => {
      collectionStore.fetchUserCollectionsQueue(false)
    }
  })
}
