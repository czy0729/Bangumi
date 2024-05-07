/*
 * @Author: czy0729
 * @Date: 2024-03-22 05:19:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 01:02:28
 */
import { observable } from 'mobx'
import store from '@utils/store'
import { NAMESPACE, STATE } from './ds'

export default class ScreenReplies extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      _loaded: true
    })

    return true
  }
}
