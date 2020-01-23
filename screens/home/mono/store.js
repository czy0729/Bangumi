/*
 * @Params: { _name, _jp, _image }
 * @Author: czy0729
 * @Date: 2019-05-11 16:23:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-23 15:31:58
 */
import { computed } from 'mobx'
import { subjectStore, tinygrailStore, systemStore } from '@stores'
import store from '@utils/store'
import { fetchHTML, t } from '@utils/fetch'
import { info } from '@utils/ui'
import { HOST } from '@constants'

export default class ScreenMono extends store {
  init = () => {
    if (this.tinygrail) {
      return Promise.all([
        this.fetchMono(true),
        this.fetchChara(),
        this.fetchUsers()
      ])
    }
    return this.fetchMono(true)
  }

  onHeaderRefresh = () => this.fetchMono(true)

  // -------------------- fetch --------------------
  fetchMono = refresh =>
    subjectStore.fetchMono({ monoId: this.monoId }, refresh)

  fetchChara = () =>
    tinygrailStore.fetchCharacters([this.monoId.replace('character/', '')])

  fetchUsers = () =>
    tinygrailStore.fetchUsers(this.monoId.replace('character/', ''))

  // -------------------- get --------------------
  @computed get monoId() {
    const { monoId = '' } = this.params
    return monoId
  }

  @computed get mono() {
    return subjectStore.mono(this.monoId)
  }

  @computed get monoComments() {
    return subjectStore.monoComments(this.monoId)
  }

  @computed get chara() {
    return tinygrailStore.characters(this.monoId.replace('character/', ''))
  }

  @computed get tinygrail() {
    return systemStore.setting.tinygrail
  }

  @computed get users() {
    return tinygrailStore.users(this.monoId.replace('character/', ''))
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

    t('人物.收藏人物', {
      monoId: this.monoId
    })

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

    t('人物.取消收藏人物', {
      monoId: this.monoId
    })

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${eraseCollectUrl}`
    })
    info('已取消收藏')

    return this.fetchMono(true)
  }
}
