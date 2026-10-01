/*
 * @Author: czy0729
 * @Date: 2024-07-25 19:55:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-30 22:38:17
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { NAMESPACE, STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  /** 路由参数 (tags 等) */
  params: Params

  state = observable(STATE)

  save = () => {
    return this.saveStorage(NAMESPACE)
  }
}
