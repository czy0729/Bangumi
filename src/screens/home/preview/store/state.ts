/*
 * @Author: czy0729
 * @Date: 2024-09-07 01:07:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-07 01:44:30
 *
 * 预览页面状态基类
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
