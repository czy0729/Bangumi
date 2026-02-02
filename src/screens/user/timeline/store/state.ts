/*
 * @Author: czy0729
 * @Date: 2024-09-11 16:45:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-02 07:32:08
 */
import Store from '@utils/store'

import type { Params } from '../types'

export default class State extends Store<null> {
  params: Params
}
