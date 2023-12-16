/*
 * @Author: czy0729
 * @Date: 2023-04-24 02:57:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 06:56:29
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { DEV } from '@constants'
import { LOG_INIT } from '../ds'
import { LOADED, NAMESPACE, STATE } from './init'

type CacheKey = keyof typeof LOADED

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  private _loaded = LOADED

  init = async (key: CacheKey) => {
    if (!key || this._loaded[key]) return true

    if (DEV && LOG_INIT) console.info('CollectionStore /', key)

    this._loaded[key] = true
    return this.readStorage([key], NAMESPACE)
  }

  save = (key: CacheKey, data?: any) => {
    return this.setStorage(key, data, NAMESPACE)
  }
}
