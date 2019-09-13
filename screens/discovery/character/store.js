/*
 * @Author: czy0729
 * @Date: 2019-09-09 17:38:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-09 18:08:32
 */
import { observable, computed } from 'mobx'
import {} from '@stores'
import store from '@utils/store'

const namespace = 'ScreenCharacter'

export default class ScreenCharacter extends store {
  state = observable({})

  init = async () => {}

  // -------------------- fetch --------------------
  fetch = () => {

  }

  // -------------------- get --------------------
  @computed get namespace() {
    return namespace
  }

  // -------------------- page --------------------

  // -------------------- action --------------------
}
