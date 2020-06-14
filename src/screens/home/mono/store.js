/*
 * @Params: { _name, _jp, _image }
 * @Author: czy0729
 * @Date: 2019-05-11 16:23:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-14 15:58:36
 */
import { observable, computed } from 'mobx'
import { subjectStore, tinygrailStore, systemStore } from '@stores'
import store from '@utils/store'
import { fetchHTML, t } from '@utils/fetch'
import { HTMLDecode } from '@utils/html'
import { info } from '@utils/ui'
import { HOST } from '@constants'

export default class ScreenMono extends store {
  state = observable({
    showHeaderTitle: false
  })

  init = () => {
    this.fetchMonoFormCDN()

    // 设置开启小圣杯和是虚拟人物
    if (this.tinygrail && this.monoId.includes('character/')) {
      return Promise.all([this.fetchMono(true), this.fetchChara()])
    }
    return this.fetchMono(true)
  }

  onHeaderRefresh = () => this.fetchMono(true)

  // -------------------- fetch --------------------
  fetchMono = refresh =>
    subjectStore.fetchMono(
      {
        monoId: this.monoId
      },
      refresh
    )

  fetchChara = () =>
    tinygrailStore.fetchCharacters([this.monoId.replace('character/', '')])

  /**
   * 私有CDN的条目信息
   */
  fetchMonoFormCDN = async () => {
    const { setting } = systemStore
    const { _loaded } = this.mono
    if (!setting.cdn || _loaded) {
      return true
    }

    return subjectStore.fetchMonoFormCDN(this.monoId)
  }

  // -------------------- get --------------------
  @computed get monoId() {
    const { monoId = '' } = this.params
    return monoId
  }

  @computed get url() {
    return `${HOST}/${this.monoId}`
  }

  @computed get mono() {
    return subjectStore.mono(this.monoId)
  }

  @computed get monoComments() {
    return subjectStore.monoComments(this.monoId)
  }

  @computed get monoFormCDN() {
    return subjectStore.monoFormCDN(this.monoId)
  }

  @computed get chara() {
    return tinygrailStore.characters(this.monoId.replace('character/', ''))
  }

  @computed get tinygrail() {
    return systemStore.setting.tinygrail
  }

  // -------------------- get: cdn fallback --------------------
  @computed get jp() {
    const { _jp } = this.params
    return HTMLDecode(this.mono.name || _jp || this.monoFormCDN.name)
  }

  @computed get cn() {
    const { _name } = this.params
    return HTMLDecode(this.mono.nameCn || _name || this.monoFormCDN.nameCn)
  }

  @computed get cover() {
    return this.mono.cover || this.monoFormCDN.cover
  }

  @computed get info() {
    return this.mono.info || this.monoFormCDN.info
  }

  @computed get detail() {
    return this.mono.detail || this.monoFormCDN.detail
  }

  @computed get voices() {
    if (this.mono._loaded) {
      return this.mono.voice || []
    }
    return this.monoFormCDN.voices || []
  }

  @computed get works() {
    if (this.mono._loaded) {
      return this.mono.works || []
    }
    return this.monoFormCDN.works || []
  }

  @computed get jobs() {
    if (this.mono._loaded) {
      return this.mono.jobs || []
    }
    return this.monoFormCDN.jobs || []
  }

  // -------------------- page --------------------
  updateShowHeaderTitle = showHeaderTitle => {
    this.setState({
      showHeaderTitle
    })
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
