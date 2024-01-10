/*
 * @Author: czy0729
 * @Date: 2023-04-21 18:30:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-10 04:42:25
 */
import { computed } from 'mobx'
import { subjectStore, systemStore, tinygrailStore } from '@stores'
import { cnjp, desc, HTMLDecode } from '@utils'
import { HOST } from '@constants'
import State from './state'

export default class Computed extends State {
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
}
