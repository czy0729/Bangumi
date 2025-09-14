/*
 * @Author: czy0729
 * @Date: 2023-04-24 14:20:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-14 03:53:03
 */
import { observable } from 'mobx'
import { runAfter, titleCase } from '@utils'
import Store from '@utils/store'
import { DEV, TEXT_BADGES } from '@constants'
import { LOADED, NAMESPACE, STATE } from './init'
import { CacheKey } from './types'

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
    return this.setStorage(key, undefined, NAMESPACE)
  }

  /** 更新小组缩略图 */
  updateGroupThumb = (name: string, thumb: string) => {
    const key = 'groupThumb'
    this.setState({
      [key]: {
        [name]: thumb
      }
    })
    this.save(key)
  }

  /** 开发打印 */
  log = (...arg: any) => {
    if (DEV) console.info(TEXT_BADGES.primary, `[${titleCase(this._namespace)}Store]`, ...arg)
  }

  /** 开发打印 */
  error = (...arg: any) => {
    if (DEV) console.info(TEXT_BADGES.danger, `[${titleCase(this._namespace)}Store]`, ...arg)
  }
}
