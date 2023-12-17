/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:16:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 11:05:18
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { DEV } from '@constants'
import { Likes } from '../rakuen/types'
import { LOG_INIT } from '../ds'
import { LOADED, NAMESPACE, STATE } from './init'

type CacheKey = keyof typeof LOADED

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  private _loaded = LOADED

  init = (key: CacheKey) => {
    if (!key || this._loaded[key]) return true

    if (DEV && LOG_INIT) console.info('TimelineStore /', key)

    this._loaded[key] = true
    return this.readStorage([key], NAMESPACE)
  }

  save = (key: CacheKey) => {
    return this.setStorage(key, undefined, NAMESPACE)
  }

  /** 修正并更新回复表情数据 */
  updateLikes = (response: Likes) => {
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

    const key = 'likes'
    this.setState({
      [key]: data
    })
  }
}
