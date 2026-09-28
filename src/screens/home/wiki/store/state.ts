/*
 * @Author: czy0729
 * @Date: 2024-09-16 20:07:26
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 状态: 仅路由参数 (无页面级 observable 状态)
 */
import Store from '@utils/store'

import type { Params } from '../types'

export default class State extends Store<null> {
  params: Params
}
