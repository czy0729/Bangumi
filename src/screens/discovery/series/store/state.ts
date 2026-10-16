/*
 * @Author: czy0729
 * @Date: 2024-11-30 17:30:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 17:33:08
 *
 * 关联系列状态机基类
 */
import { observable } from 'mobx'
import Base from './base'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class State extends Base {
  state = observable(STATE)

  /** 本地化数据 */
  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }
}
