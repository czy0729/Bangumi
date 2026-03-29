/*
 * @Author: czy0729
 * @Date: 2023-04-16 13:15:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 20:13:45
 */
import { observable } from 'mobx'
import { postTask, titleCase } from '@utils'
import { logger } from '@utils/dev'
import Store from '@utils/store'
import { LOADED, NAMESPACE, STATE } from './init'
import { getInt } from './utils'

import type { SubjectId } from '@types'

type CacheKey =
  | keyof typeof LOADED
  | `subject${number}`
  | `subjectFormHTML${number}`
  | `subjectV2${number}`
  | `subjectComments${number}`

export default class State extends Store<typeof STATE> {
  private _namespace = NAMESPACE
  private _loaded = LOADED

  state = observable(STATE)

  init = async (key: CacheKey, isAsync: boolean = false) => {
    if (!key) return false
    if (this._loaded[key]) return true

    if (!isAsync) {
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

  log = (...arg: any) => {
    logger.log(`${titleCase(this._namespace)}Store`, ...arg)
  }

  error = (...arg: any) => {
    logger.error(`${titleCase(this._namespace)}Store`, ...arg)
  }
}
