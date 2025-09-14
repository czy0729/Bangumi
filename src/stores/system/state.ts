/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:02:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-13 20:59:54
 */
import { observable } from 'mobx'
import { titleCase } from '@utils'
import Store from '@utils/store'
import { DEV, TEXT_BADGES } from '@constants'
import { NAMESPACE, STATE } from './init'
import { CacheKey } from './types'

export default class State extends Store<typeof STATE> {
  private _namespace = NAMESPACE

  state = observable(STATE)

  save = (key: CacheKey) => {
    return this.setStorage(key, undefined, NAMESPACE)
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
