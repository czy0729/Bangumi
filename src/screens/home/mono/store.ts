/*
 * @Params: { _name, _jp, _image }
 * @Author: czy0729
 * @Date: 2019-05-11 16:23:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-10 03:05:42
 */
import { observable, computed } from 'mobx'
import { subjectStore, tinygrailStore, systemStore, userStore } from '@stores'
import {
  HTMLDecode,
  cnjp,
  desc,
  feedback,
  getTimestamp,
  info,
  loading,
  omit,
  open,
  opitimize,
  removeHTMLTag
} from '@utils'
import store from '@utils/store'
import { fetchHTML, t, baiduTranslate } from '@utils/fetch'
import { get, update } from '@utils/kv'
import { webhookMono } from '@utils/webhooks'
import { HOST } from '@constants'
import { Id, Navigation } from '@types'
import { STATE } from './ds'
import { Params } from './types'

export default class ScreenMono extends store {
  params: Params

  state = observable(STATE)

  init = () => {
    this.fetchMonoFromOSS()

    // 设置开启小圣杯和是虚拟人物
    if (this.tinygrail && this.monoId.includes('character/')) {
      return Promise.all([this.fetchMono(true), this.fetchChara()])
    }

    return this.fetchMono(true)
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchMono(true)
  }

  // -------------------- fetch --------------------
  /**
   * 人物信息和吐槽箱
   * @opitimize 1h
   * */
  fetchMono = (refresh: boolean = false) => {
    if (
      refresh === true &&
      opitimize(this.mono, 60 * 60) &&
      this.monoComments.list.length
    ) {
      return true
    }

    return subjectStore.fetchMono(
      {
        monoId: this.monoId
      },
      refresh
    )
  }

  /** 角色信息 */
  fetchChara = async () => {
    if (!this.monoId.includes('character/')) return false

    const data = await tinygrailStore.fetchCharacters([this.id])
    this.setState({
      checkTinygrail: true
    })

    return data
  }

  /** 私有 CDN 的条目信息 */
  fetchMonoFormCDN = async () => {
    const { setting } = systemStore
    const { _loaded } = this.mono
    if (!setting.cdn || _loaded) return true

    return subjectStore.fetchMonoFormCDN(this.monoId)
  }

  /** 装载云端人物缓存数据 */
  fetchMonoFromOSS = async () => {
    if (this.mono._loaded) return

    try {
      const data = await get(`mono_${this.monoId.replace('/', '_')}`)

      // 云端没有数据存在, 本地计算后上传
      if (!data) {
        this.updateMonoThirdParty()
        return
      }

      const { ts, mono, comments } = data
      const _loaded = getTimestamp()
      if (typeof mono === 'object' && typeof comments === 'object') {
        this.setState({
          mono: {
            ...mono,
            _loaded: getTimestamp()
          },
          comments: {
            ...comments,
            _loaded: getTimestamp()
          }
        })
      }

      if (_loaded - ts >= 60 * 60 * 7) this.updateMonoThirdParty()
    } catch (error) {}
  }

  /** 更新人物缓存数据 */
  updateMonoThirdParty = () => {
    setTimeout(() => {
      const { _loaded } = this.mono

      // formhash 是登录并且可操作条目的用户的必有值
      if (!_loaded) return

      update(`mono_${this.monoId.replace('/', '_')}`, {
        mono: omit(this.mono, ['collectUrl', 'eraseCollectUrl', '_loaded']),
        comments: {
          list: this.monoComments.list
            .filter(item => !!item.userId)
            .filter((item, index) => index < 8)
            .map(item => ({
              ...omit(item, ['replySub']),
              sub: item.sub
                .filter(i => !!i.userId)
                .filter((i, idx) => idx < 8)
                .map(i => omit(i, ['replySub']))
            })),
          pagination: this.monoComments.pagination
        }
      })
    }, 10000)
  }

  // -------------------- get --------------------
  /** 人物 id (包含角色, 工作人员) */
  @computed get monoId() {
    const { monoId } = this.params
    return monoId
  }

  /** 数字 id */
  @computed get id() {
    return this.monoId.split('/')?.[1] || ''
  }

  /** 人物网页链接 */
  @computed get url() {
    return `${HOST}/${this.monoId}`
  }

  /** 人物信息 */
  @computed get mono() {
    return subjectStore.mono(this.monoId)
  }

  /** 人物留言 */
  @computed get monoComments() {
    const monoComments = subjectStore.monoComments(this.monoId)
    if (monoComments._loaded) return monoComments
    return this.state.comments
  }

  @computed get list() {
    const { list } = this.monoComments
    return list
  }

  /** 人物信息 (CDN) */
  @computed get monoFormCDN() {
    const { mono } = this.state
    if (mono._loaded) return mono
    return subjectStore.monoFormCDN(this.monoId)
  }

  /** 角色信息 */
  @computed get chara() {
    return tinygrailStore.characters(this.monoId.replace('character/', ''))
  }

  /** 是否开启小圣杯功能 */
  @computed get tinygrail() {
    return systemStore.setting.tinygrail
  }

  /** 是否可以进行 ICO */
  @computed get canICO() {
    const { checkTinygrail } = this.state
    return this.monoId.includes('character/') && checkTinygrail && !this.chara._loaded
  }

  /** 显示在上方的名字 */
  @computed get nameTop() {
    return cnjp(this.cn, this.jp) || ''
  }

  /** 显示在下方的名字 */
  @computed get nameBottom() {
    const text = cnjp(this.jp, this.cn)
    return text !== this.nameTop ? text : ''
  }

  // -------------------- get: cdn fallback --------------------
  /** 日文名 */
  @computed get jp() {
    const { _jp } = this.params
    return HTMLDecode(this.mono.name || _jp || this.monoFormCDN.name)
  }

  /** 中文名 */
  @computed get cn() {
    const { _name } = this.params
    return HTMLDecode(this.mono.nameCn || _name || this.monoFormCDN.nameCn)
  }

  /** 人物大图 */
  @computed get cover() {
    return this.mono.cover || this.monoFormCDN.cover
  }

  /** 人物简介 */
  @computed get info() {
    return this.mono.info || this.monoFormCDN.info
  }

  /** 人物详情 */
  @computed get detail() {
    return this.mono.detail || this.monoFormCDN.detail
  }

  /** 人物出演 */
  @computed get voices() {
    if (this.mono._loaded) return this.mono.voice || []
    return this.monoFormCDN.voice || []
  }

  /** 人物相关作品 */
  @computed get works() {
    if (this.mono._loaded) return this.mono.works || []
    return this.monoFormCDN.works || []
  }

  /** 人物相关工作 */
  @computed get jobs() {
    return ((this.mono._loaded ? this.mono.jobs : this.monoFormCDN.jobs) || [])
      .slice()
      .sort((a, b) => desc(a, b, item => (item.type == 2 ? 99 : Number(item.type))))
  }

  // -------------------- page --------------------
  /** 人物更多资料点击 */
  onMore = () => {
    t('人物.更多资料', {
      monoId: this.monoId
    })

    return open(
      `https://mzh.moegirl.org.cn/index.php?title=${encodeURIComponent(
        this.cn || this.jp
      )}&mobileaction=toggle_view_mobile`
    )
  }
  /** 展开回复子楼层 */
  toggleExpand = (id: Id) => {
    const { expands } = this.state
    this.setState({
      expands: expands.includes(id)
        ? expands.filter(item => item !== id)
        : [...expands, id]
    })
  }

  // -------------------- action --------------------
  /** 收藏人物 */
  doCollect = async () => {
    const { collectUrl } = this.mono
    if (!collectUrl) return false

    t('人物.收藏人物', {
      monoId: this.monoId
    })

    await fetchHTML({
      method: 'POST',
      url: `${HOST}${collectUrl}`
    })
    feedback()
    info('已收藏')
    webhookMono(
      {
        ...this.mono,
        id: this.monoId
      },
      userStore.userInfo
    )

    return this.fetchMono(true)
  }

  /** 取消收藏人物 */
  doEraseCollect = async () => {
    const { eraseCollectUrl } = this.mono
    if (!eraseCollectUrl) return false

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

  /** 开启 ICO */
  doICO = async (navigation: Navigation) => {
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

  /** 翻译内容 */
  doTranslate = async (key = 'translateResult', content: any) => {
    if (this.state[key].length) return

    t('人物.翻译内容', {
      monoId: this.monoId
    })

    let hide: () => void
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
        return
      }
      info('翻译失败, 请重试')
    } catch (error) {
      if (hide) hide()
      info('翻译失败, 请重试')
    }
  }

  /** 翻译楼层 */
  doTranslateFloor = async (floorId: string | number, msg: string) => {
    const { translateResultFloor } = this.state
    if (translateResultFloor[floorId]) return

    t('人物.翻译内容', {
      floorId
    })

    let hide: () => void
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
