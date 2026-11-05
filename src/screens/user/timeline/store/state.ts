/*
 * @Author: czy0729
 * @Date: 2024-09-11 16:45:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 用户时间线 store 状态 (仅路由参数)
 */
import Store from '@utils/store'

import type { Params } from '../types'

export default class State extends Store<null> {
  /** 页面路由参数 */
  params: Params
}
