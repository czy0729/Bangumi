import { observable, computed } from 'mobx'
import {} from '@stores'
import store from '@utils/store'

const namespace = ''

export default class  extends store {
  state = observable({})

  init = async () => {}

  // -------------------- fetch --------------------
  fetch = () => {}

  // -------------------- get --------------------
  @computed get namespace() {
    return namespace
  }

  // -------------------- page --------------------

  // -------------------- action --------------------
}
