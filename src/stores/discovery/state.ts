/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:42:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-23 15:45:06
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { DEV } from '@constants'
import { LOG_INIT } from '../ds'
import { LOADED, NAMESPACE, STATE } from './init'

type CacheKey = keyof typeof LOADED | `catalogDetail${number}`

export default class State extends Store {
  state = observable(STATE)

  _loaded = LOADED

  init = (key: CacheKey) => {
    if (!key || this._loaded[key]) return true

    if (DEV && LOG_INIT) console.info('DiscoveryStore /', key)

    this._loaded[key] = true
    return this.readStorage([key], NAMESPACE)
  }

  save = (key: CacheKey) => {
    return this.setStorage(key, undefined, NAMESPACE)
  }
}
