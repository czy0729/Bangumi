/*
 * @Author: czy0729
 * @Date: 2023-04-23 14:13:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 11:54:08
 */
import { observable } from 'mobx'
import { titleCase } from '@utils'
import { logger } from '@utils/dev'
import Store from '@utils/store'
import _ from '@styles'
import { NAMESPACE, STATE } from './init'

import type { LOADED } from './init'

type CacheKey = keyof typeof LOADED

export default class State extends Store<typeof STATE> {
  constructor() {
    super()

    /** @deprecated 让 _ 上的所有属性都能通过 ThemeStore 访问到 */
    Object.keys(_).forEach(key => {
      if (!(key in this)) this[key] = _[key]
    })
  }

  private _namespace = NAMESPACE

  state = observable(STATE)

  save = (key: CacheKey) => {
    return this.setStorage(key, undefined, NAMESPACE)
  }

  log = (...arg: any) => {
    logger.log(`${titleCase(this._namespace)}Store`, ...arg)
  }

  error = (...arg: any) => {
    logger.error(`${titleCase(this._namespace)}Store`, ...arg)
  }
}
