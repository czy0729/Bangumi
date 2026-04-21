/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:16:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-09 15:20:58
 */
import { observable } from 'mobx'
import { postTask, titleCase } from '@utils'
import { logger } from '@utils/dev'
import Store from '@utils/store'
import { LOADED, NAMESPACE, STATE } from './init'

import type { Likes } from '../rakuen/types'

type CacheKey = keyof typeof LOADED

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  private _namespace = NAMESPACE
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

  /** 修正并更新回复表情数据 */
  updateLikes = async (response: Likes) => {
    const STATE_KEY = 'likes'
    await this.init(STATE_KEY)

    const data = {}
    Object.entries(response).forEach(([key, value]) => {
      /** @issue 接口有严重 bug, 若返回是对象 { 0: {} } 这样的, 接口返回变成了数组 */
      if (Array.isArray(value)) {
        data[key] = {
          0: value?.[0] || {}
        }
      } else {
        data[key] = value || {}
      }
    })

    this.setState({
      [STATE_KEY]: data
    })
    this.save(STATE_KEY)
  }

  log = (...arg: any) => {
    logger.log(`${titleCase(this._namespace)}Store`, ...arg)
  }

  error = (...arg: any) => {
    logger.error(`${titleCase(this._namespace)}Store`, ...arg)
  }
}
