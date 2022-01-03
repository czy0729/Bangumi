/*
 * @Params: { _name, _jp, _image }
 * @Author: czy0729
 * @Date: 2019-05-11 16:23:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-04 04:57:34
 */
import { observable, computed } from 'mobx'
import { subjectStore, tinygrailStore, systemStore } from '@stores'
import { open, desc } from '@utils'
import store from '@utils/store'
import { fetchHTML, t, baiduTranslate } from '@utils/fetch'
import { HTMLDecode, removeHTMLTag } from '@utils/html'
import { info, feedback, loading } from '@utils/ui'
import { cnjp } from '@utils/app'
import { HOST } from '@constants'

export default class ScreenMono extends store {
  state = observable({
    showHeaderTitle: false,
    checkTinygrail: false,
    expands: [], // 展开的子楼层id
    translateResult: [], // 翻译缓存
    translateResultDetail: [],
    translateResultFloor: {} // 楼层翻译缓存
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

  fetchChara = async () => {
    if (!this.monoId.includes('character/')) return false

    const res = tinygrailStore.fetchCharacters([this.monoId.replace('character/', '')])
    await res
    this.setState({
      checkTinygrail: true
    })

    return res
  }

  /**
   * 私有CDN的条目信息
   */
  fetchMonoFormCDN = async () => {
    const { setting } = systemStore
    const { _loaded } = this.mono
    if (!setting.cdn || _loaded) return true

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

  @computed get canICO() {
    const { checkTinygrail } = this.state
    return checkTinygrail && !this.chara._loaded
  }

  @computed get nameTop() {
    return cnjp(this.cn, this.jp) || ''
  }

  @computed get nameBottom() {
    const text = cnjp(this.jp, this.cn)
    return text !== this.nameTop ? text : ''
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
    if (this.mono._loaded) return this.mono.voice || []
    return this.monoFormCDN.voices || []
  }

  @computed get works() {
    if (this.mono._loaded) return this.mono.works || []
    return this.monoFormCDN.works || []
  }

  @computed get jobs() {
    return ((this.mono._loaded ? this.mono.jobs : this.monoFormCDN.jobs) || []).sort(
      (a, b) => desc(a, b, item => (item.type == 2 ? 99 : Number(item.type)))
    )
  }

  // -------------------- page --------------------
  updateShowHeaderTitle = showHeaderTitle =>
    this.setState({
      showHeaderTitle
    })

  onMore = () =>
    open(
      `https://mzh.moegirl.org.cn/index.php?title=${encodeURIComponent(
        this.cn || this.jp
      )}&mobileaction=toggle_view_mobile`
    )

  toggleExpand = id => {
    const { expands } = this.state
    this.setState({
      expands: expands.includes(id)
        ? expands.filter(item => item !== id)
        : [...expands, id]
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
    feedback()
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
    feedback()
    info('已取消收藏')

    return this.fetchMono(true)
  }

  /**
   * 开启ICO
   */
  doICO = async navigation => {
    t('人物.启动ICO', {
      monoId: this.monoId
    })

    const data = await tinygrailStore.doICO({
      monoId: this.monoId.replace('character/', '')
    })

    if (data.State !== 0) {
      info('启动ICO失败')
      return
    }

    navigation.push('TinygrailICODeal', {
      monoId: this.monoId.replace('character/', '')
    })
    this.fetchChara()
  }

  /**
   * 翻译内容
   */
  doTranslate = async (key = 'translateResult', content) => {
    if (this.state[key].length) return

    t('人物.翻译内容', {
      monoId: this.monoId
    })

    let hide
    try {
      hide = loading()
      const response = await baiduTranslate(
        String(content)
          .replace(/<br \/>/g, '\n')
          .replace(/<\/?[^>]*>/g, '') // 去除HTML tag
      )
      hide()

      const { trans_result } = JSON.parse(response)
      if (Array.isArray(trans_result)) {
        this.setState({
          [key]: trans_result
        })
        // info('翻译成功')
        return
      }
      info('翻译失败, 请重试')
    } catch (error) {
      if (hide) hide()
      info('翻译失败, 请重试')
    }
  }

  /**
   * 翻译楼层
   */
  doTranslateFloor = async (floorId, msg) => {
    const { translateResultFloor } = this.state
    if (translateResultFloor[floorId]) return

    t('人物.翻译内容', {
      floorId
    })

    let hide
    try {
      hide = loading()
      const response = await baiduTranslate(removeHTMLTag(msg.replace(/<br>/g, '\n')))
      hide()

      const { trans_result: translateResult } = JSON.parse(response)
      if (Array.isArray(translateResult)) {
        this.setState({
          translateResultFloor: {
            ...translateResultFloor,
            [floorId]: translateResult.map(item => item.dst).join('\n')
          }
        })
        return
      }
      info('翻译失败, 请重试')
    } catch (error) {
      if (hide) hide()
      info('翻译失败, 请重试')
    }
  }
}
