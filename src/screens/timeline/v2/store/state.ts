/*
 * @Author: czy0729
 * @Date: 2024-05-25 14:10:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-31 00:00:00
 *
 * 时间胶囊页 observable 状态
 */
import { observable } from 'mobx'
import { debounce } from '@utils'
import Store from '@utils/store'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  save = debounce(() => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  })
}
