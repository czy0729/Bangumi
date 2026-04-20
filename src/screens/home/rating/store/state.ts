/*
 * @Author: czy0729
 * @Date: 2024-08-26 08:11:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-26 08:27:00
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { NAMESPACE, STATE } from './ds'

import type { Params } from '../types'

export default class State extends Store<typeof STATE> {
  params: Params

  state = observable(STATE)

  save = () => {
    return this.saveStorage(NAMESPACE)
  }
}
