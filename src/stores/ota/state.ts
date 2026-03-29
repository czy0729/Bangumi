/*
 * @Author: czy0729
 * @Date: 2023-04-26 14:45:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 00:54:41
 */
import { observable } from 'mobx'
import { postTask } from '@utils'
import Store from '@utils/store'
import { LOADED, NAMESPACE, STATE } from './init'

type CacheKey = keyof typeof LOADED

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  private _loaded = LOADED

  init = async (key: CacheKey, async?: boolean) => {
    if (!key) return false

    if (this._loaded[key]) return true

    if (!async) {
      this._loaded[key] = true
      return this.readStorage([key], NAMESPACE)
    }

    postTask(() => {
      if (this._loaded[key]) return

      this._loaded[key] = true
      this.readStorage([key], NAMESPACE)
    }, 0)

    return this._loaded[key]
  }

  save = (key: CacheKey) => {
    return this.setStorage(key, undefined, NAMESPACE)
  }
}
