/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 *
 * 找三次元 Store 入口
 */
import { createInit } from '@_'
import { init } from '@utils/subject/real'
import { filterDS } from '../ds'
import Action from './action'
import { NAMESPACE, STATE } from './ds'

export default class ScreenReal extends Action {
  init = createInit(this, {
    namespace: NAMESPACE,
    defaults: STATE.query,
    filterDS,
    initData: init
  })
}
