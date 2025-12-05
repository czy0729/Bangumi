/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:02:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-09 14:49:26
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { LOADED, NAMESPACE, STATE } from './init'

type CacheKey = keyof typeof LOADED

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  _loaded = LOADED

  save = (key: CacheKey) => {
    return this.setStorage(key, undefined, NAMESPACE)
  }
}
