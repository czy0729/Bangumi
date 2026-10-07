/*
 * @Author: czy0729
 * @Date: 2023-04-26 14:45:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 00:54:41
 */
import { observable, remove, runInAction } from 'mobx'
import { postTask } from '@utils'
import Store from '@utils/store'
import { LOADED, NAMESPACE, STATE } from './init'

type CacheKey = keyof typeof LOADED

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  private _loaded = LOADED

  /** 本轮生命周期已清理过的缓存键 (同键多次 init 只做一次全表清理) */
  private _cleaned = new Set<CacheKey>()

  init = async (key: CacheKey, async?: boolean) => {
    if (!key) return false

    if (this._loaded[key]) return true

    if (!async) {
      this._loaded[key] = true
      return this.readStorage([key], NAMESPACE).then(state => {
        this.cleanCache(key)
        return state
      })
    }

    postTask(() => {
      if (this._loaded[key]) return

      this._loaded[key] = true
      this.readStorage([key], NAMESPACE).then(() => this.cleanCache(key))
    }, 0)

    return this._loaded[key]
  }

  save = (key: CacheKey) => {
    return this.setStorage(key, undefined, NAMESPACE)
  }

  /** 丢弃历史遗留的详情键, 只保留 `${key}_` 前缀 (如 anime 早期使用的 age_) */
  private cleanCache(key: CacheKey) {
    if (this._cleaned.has(key)) return

    this._cleaned.add(key)

    const cache = this.state[key] as Record<string, unknown> | undefined
    if (!cache || typeof cache !== 'object') return

    const prefix = `${key}_`
    const invalidKeys = Object.keys(cache).filter(itemKey => !itemKey.startsWith(prefix))
    if (!invalidKeys.length) return

    runInAction(() => {
      invalidKeys.forEach(itemKey => remove(cache, itemKey))
    })
    this.save(key)
  }
}
