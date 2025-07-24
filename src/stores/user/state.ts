/*
 * @Author: czy0729
 * @Date: 2023-04-21 20:52:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-24 02:53:40
 */
import { observable } from 'mobx'
import { runAfter } from '@utils'
import Store from '@utils/store'
import { DEV, TEXT_BADGES } from '@constants'
import { LOADED, NAMESPACE, STATE } from './init'

type CacheKey = keyof typeof LOADED

export default class State extends Store<typeof STATE> {
  private _namespace = NAMESPACE
  private _loaded = LOADED

  state = observable(STATE)

  init = async (key: CacheKey, async?: boolean) => {
    if (!key) return false

    if (this._loaded[key]) return true

    if (!async) {
      this._loaded[key] = true
      return this.readStorage([key], NAMESPACE)
    }

    runAfter(() => {
      if (this._loaded[key]) return

      this._loaded[key] = true
      this.readStorage([key], NAMESPACE)
    }, true)

    return this._loaded[key]
  }

  save = (key: CacheKey) => {
    return this.setStorage(key, undefined, this._namespace)
  }

  /** 开发打印 */
  error = (...arg: any) => {
    if (DEV) console.info(TEXT_BADGES.danger, this._namespace, ...arg)
  }
}
