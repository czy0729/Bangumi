/*
 * @Author: czy0729
 * @Date: 2022-10-21 12:31:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-21 13:30:14
 */
import { computed } from 'mobx'
import store from '@utils/store'
import { HOST } from '@constants'
import { Params } from './types'

export default class ScreenPreview extends store {
  params: Params

  init = () => {}

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId } = this.params
    return subjectId
  }

  @computed get url() {
    return `${HOST}/preview/${this.subjectId}`
  }
}
