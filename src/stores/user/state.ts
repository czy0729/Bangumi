/*
 * @Author: czy0729
 * @Date: 2023-04-21 20:52:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:21:20
 */
import { observable } from 'mobx'
import { postTask, titleCase } from '@utils'
import { logger } from '@utils/dev'
import Store from '@utils/store'
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

    postTask(() => {
      if (this._loaded[key]) return

      this._loaded[key] = true
      this.readStorage([key], NAMESPACE)
    }, 0)

    return this._loaded[key]
  }

  save = (key: CacheKey) => {
    return this.setStorage(key, undefined, this._namespace)
  }

  log = (...arg: unknown[]) => {
    logger.log(`${titleCase(this._namespace)}Store`, ...arg)
  }

  error = (...arg: unknown[]) => {
    logger.error(`${titleCase(this._namespace)}Store`, ...arg)
  }
}
