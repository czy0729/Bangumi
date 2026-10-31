/*
 * @Author: czy0729
 * @Date: 2024-09-14 07:41:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 00:00:00
 *
 * 自定义跳转页 observable 状态
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)
}
