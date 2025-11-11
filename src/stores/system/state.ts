/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:02:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-13 20:59:54
 */
import { observable } from 'mobx'
import { titleCase } from '@utils'
import { logger } from '@utils/dev'
import Store from '@utils/store'
import { NAMESPACE, STATE } from './init'

import type { CacheKey } from './types'

export default class State extends Store<typeof STATE> {
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
