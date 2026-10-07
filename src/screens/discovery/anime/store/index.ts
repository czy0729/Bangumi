/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 */
import { createInit } from '@_'
import { init } from '@utils/subject/anime'
import { FILTER_DS } from '../ds'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, RESET_STATE, STATE } from './ds'

export default class ScreenAnime extends Action {
  init = createInit(this, {
    namespace: NAMESPACE,
    defaults: STATE.query,
    filterDS: FILTER_DS,
    excludeState: EXCLUDE_STATE,
    initData: init
  })

  unmount = () => {
    this.scrollToOffset = null
    this.setState(RESET_STATE)
  }
}
