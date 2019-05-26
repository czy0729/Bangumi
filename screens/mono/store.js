/*
 * @Author: czy0729
 * @Date: 2019-05-11 16:23:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-26 20:41:57
 */
import { computed } from 'mobx'
import { subjectStore } from '@stores'
import store from '@utils/store'

export default class ScreenMono extends store {
  init = () => this.fetchMono(true)

  // -------------------- fetch --------------------
  fetchMono = refresh => {
    const { monoId } = this.params
    return subjectStore.fetchMono({ monoId }, refresh)
  }

  // -------------------- get --------------------
  @computed get mono() {
    const { monoId } = this.params
    return subjectStore.mono(monoId)
  }

  @computed get monoComments() {
    const { monoId } = this.params
    return subjectStore.monoComments(monoId)
  }

  // -------------------- page --------------------

  // -------------------- action --------------------
}
