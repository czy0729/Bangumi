/*
 * @Author: czy0729
 * @Date: 2024-07-20 10:46:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 *
 * 找 NSFW Store 入口
 */
import { createInit } from '@_'
import { init } from '@utils/subject/nsfw'
import { filterDS } from '../ds'
import Action from './action'
import { NAMESPACE, STATE } from './ds'

export default class ScreenNSFW extends Action {
  init = createInit(this, {
    namespace: NAMESPACE,
    defaults: STATE.query,
    filterDS,
    initData: init
  })
}
