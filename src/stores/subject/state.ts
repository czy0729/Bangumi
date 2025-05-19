/*
 * @Author: czy0729
 * @Date: 2023-04-16 13:15:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 00:49:39
 */
import { observable } from 'mobx'
import { runAfter } from '@utils'
import Store from '@utils/store'
import { SubjectId } from '@types'
import { LOADED, NAMESPACE, STATE } from './init'
import { getInt } from './utils'

type CacheKey =
  | keyof typeof LOADED
  | `subject${number}`
  | `subjectFormHTML${number}`
  | `subjectV2${number}`
  | `subjectComments${number}`

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

    runAfter(() => {
      if (this._loaded[key]) return

      this._loaded[key] = true
      this.readStorage([key], NAMESPACE)
    }, true)

    return this._loaded[key]
  }

  initSubjectV2 = async (subjectIds: SubjectId[]) => {
    const keys = {}
    subjectIds.forEach(subjectId => (keys[`subjectV2${getInt(subjectId)}`] = true))

    const cacheKeys = Object.keys(keys).filter(item => !this._loaded[item])
    await this.readStorage(cacheKeys, NAMESPACE)

    cacheKeys.forEach(item => (this._loaded[item] = true))
    return cacheKeys as `subjectV2${number}`[]
  }

  save = (key: CacheKey, data?: any) => {
    return this.setStorage(key, data, NAMESPACE)
  }
}
