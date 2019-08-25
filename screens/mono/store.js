/*
 * @Author: czy0729
 * @Date: 2019-05-11 16:23:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-25 17:12:16
 */
import { computed } from 'mobx'
import { subjectStore } from '@stores'
import store from '@utils/store'
import { fetchHTML } from '@utils/fetch'
import { info } from '@utils/ui'
import { HOST } from '@constants'

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

  // -------------------- action --------------------
  /**
   * 收藏人物
   */
  doCollect = async () => {
    const { collectUrl } = this.mono
    if (!collectUrl) {
      return false
    }

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${collectUrl}`
    })
    info('已收藏')

    return this.fetchMono(true)
  }

  /**
   * 取消收藏人物
   */
  doEraseCollect = async () => {
    const { eraseCollectUrl } = this.mono
    if (!eraseCollectUrl) {
      return false
    }

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${eraseCollectUrl}`
    })
    info('已取消收藏')

    return this.fetchMono(true)
  }
}
