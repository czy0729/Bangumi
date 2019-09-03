/*
 * @Author: czy0729
 * @Date: 2019-05-11 16:23:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-02 23:00:43
 */
import { computed } from 'mobx'
import { subjectStore, tinygrailStore } from '@stores'
import store from '@utils/store'
import { fetchHTML } from '@utils/fetch'
import { info } from '@utils/ui'
import { HOST } from '@constants'

export default class ScreenMono extends store {
  init = () => Promise.all([this.fetchChara(), this.fetchMono(true)])

  // -------------------- fetch --------------------
  fetchMono = refresh => {
    const { monoId } = this.params
    return subjectStore.fetchMono({ monoId }, refresh)
  }

  fetchChara = () => {
    const { monoId = '' } = this.params
    return tinygrailStore.fetchCharacters([monoId.replace('character/', '')])
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

  @computed get chara() {
    const { monoId = '' } = this.params
    return tinygrailStore.characters(monoId.replace('character/', ''))
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
