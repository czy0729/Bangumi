/*
 * @Author: czy0729
 * @Date: 2023-04-16 13:15:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 11:19:41
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { DEV } from '@constants'
import { SubjectId } from '@types'
import { LOG_INIT } from '../ds'
import { getInt } from './utils'
import { LOADED, NAMESPACE, STATE } from './init'

type CacheKey =
  | keyof typeof LOADED
  | `subject${number}`
  | `subjectFormHTML${number}`
  | `subjectV2${number}`
  | `subjectComments${number}`

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  private _loaded = LOADED

  init = (key: CacheKey) => {
    if (!key || this._loaded[key]) return true

    if (DEV && LOG_INIT) console.info('SubjectStore /', key)

    this._loaded[key] = true
    return this.readStorage([key], NAMESPACE)
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
