/*
 * @Author: czy0729
 * @Date: 2023-04-21 18:30:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-26 20:08:39
 */
import { computed } from 'mobx'
import { subjectStore, systemStore, tinygrailStore } from '@stores'
import { cnjp, desc, getMonoCoverSmall, HTMLDecode } from '@utils'
import { FROZEN_ARRAY, HOST } from '@constants'
import State from './state'

export default class Computed extends State {
  /** 人物 id (包含角色, 工作人员) */
  @computed get monoId() {
    return this.params.monoId
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
    return monoComments._loaded ? monoComments : this.state.comments
  }

  @computed get list() {
    return this.monoComments.list
  }

  /** 人物信息 (CDN) */
  @computed get monoFormCDN() {
    const { mono } = this.state
    return mono._loaded ? mono : subjectStore.monoFormCDN(this.monoId)
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
    return this.monoId.includes('character/') && this.state.checkTinygrail && !this.chara._loaded
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

  /** 人物头像 */
  @computed get thumb() {
    return getMonoCoverSmall((this.params._image || this.cover || '') as string)
  }

  /** 吐槽数量 */
  @computed get commentLength() {
    const { _count } = this.params
    if (_count) return _count

    const {
      list,
      pagination: { pageTotal = 0 }
    } = this.monoComments
    return pageTotal <= 1 ? list.length : 20 * (pageTotal >= 2 ? pageTotal - 1 : pageTotal)
  }

  /** 职业 */
  @computed get position() {
    const str = this.mono.detail.split('\n')?.[0] || ''
    if (!str.includes('职业')) return ''
    return str.replace(/ {2,}/g, ' ').replace('职业: ', '')
  }

  // -------------------- get: cdn fallback --------------------
  /** 日文名 */
  @computed get jp() {
    return HTMLDecode(this.mono.name || this.params._jp || this.monoFormCDN.name)
  }

  /** 中文名 */
  @computed get cn() {
    return HTMLDecode(this.mono.nameCn || this.params._name || this.monoFormCDN.nameCn)
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
    return (this.mono._loaded ? this.mono.voice : this.monoFormCDN.voice) || FROZEN_ARRAY
  }

  /** 人物相关作品 */
  @computed get works() {
    return (this.mono._loaded ? this.mono.works : this.monoFormCDN.works) || FROZEN_ARRAY
  }

  /** 人物相关工作 */
  @computed get jobs() {
    return ((this.mono._loaded ? this.mono.jobs : this.monoFormCDN.jobs) || FROZEN_ARRAY)
      .slice()
      .sort((a, b) => desc(a, b, item => (item.type == 2 ? 99 : Number(item.type))))
  }
}
