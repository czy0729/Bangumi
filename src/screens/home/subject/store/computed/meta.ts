/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:26:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-26 20:41:03
 */
import { computed } from 'mobx'
import { _, monoStore, subjectStore } from '@stores'
import { asc, freeze } from '@utils'
import { IMG_WIDTH_LG } from '@constants'
import { INIT_RATING } from '../ds'
import {
  getArtist,
  getEnd,
  getFilterEpsData,
  getRelease,
  getSubjectStatus,
  getYear,
  getYearAndMonth,
  getYearAndMonthEnd,
  mapCrt,
  mapPersons,
  mapRelations,
  mapStaff
} from '../utils'
import Base from './base'

import type { Collection, Sites, TranslateResult } from '@types'
import type { Crt, CrtMapSource, RecDataItem, PersonsMapSource, StaffMapSource } from '../../types'

/** 元信息与来源派生 */
export default class Meta extends Base {
  /** 筛选章节构造数据, 每 100 章节一个选项 */
  @computed get filterEpsData() {
    return freeze(getFilterEpsData(this.eps.length))
  }

  /** 全站人员状态数字 */
  @computed get status() {
    return freeze(getSubjectStatus(this.subjectCollection, this.action))
  }

  /** 上映时间 (用于标识未上映) */
  @computed get release() {
    return getRelease(this.info)
  }

  /** 发布时间 (年) */
  @computed get year() {
    return getYear(this.info)
  }

  /** 发布时间 (年-月) */
  @computed get yearAndMount() {
    return getYearAndMonth(this.info, this.year)
  }

  /** 结束时间 (年) */
  @computed get end() {
    return getEnd(this.info)
  }

  /** 结束时间 (年-月) */
  @computed get yearAndMountEnd() {
    return getYearAndMonthEnd(this.info, this.end)
  }

  /** 艺术家 */
  @computed get artist() {
    return getArtist(this.info)
  }

  /** 封面图宽度 */
  @computed get imageWidth() {
    const ratio = _.isPad ? 1.4 : 1.2
    if (this.type === '音乐') {
      return Math.floor(Math.min(IMG_WIDTH_LG * ratio * 1.4, _.window.contentWidth / 2))
    }

    return Math.floor((IMG_WIDTH_LG + 16) * ratio)
  }

  /** 封面图高度, 音乐类型条目为正方形 */
  @computed get imageHeight() {
    if (this.type === '音乐') return this.imageWidth

    return Math.floor(this.imageWidth * 1.4)
  }

  /** 统计 */
  @computed get hm() {
    return [this.url, 'Subject'] as const
  }

  // -------------------- cdn fallback --------------------
  /** 封面占位 */
  @computed get coverPlaceholder() {
    // 可能是游客访问 nsfw 导致
    let placeholder = this.params._imageForce || this.params._image
    if (placeholder === '/img/no_icon_subject.png') placeholder = ''

    return placeholder || this.subjectFromOSS.image || this.subject?.images?.medium || ''
  }

  /** 网站用户评分 */
  @computed get rating() {
    // 若条目 api 返回 404, 是没有 rating 结构的
    // 所以可以使用此来判断数据源, 让游客也能访问到数据, 下方其他 computed 同理
    if (this.isSubjectLoaded) {
      return freeze({
        ...INIT_RATING,
        ...this.subject.rating
      })
    }

    if (this.subjectFromOSS.rating) {
      return freeze({
        ...INIT_RATING,
        ...this.subjectFromOSS.rating
      })
    }

    return freeze(INIT_RATING)
  }

  /** 是否锁定条目 */
  @computed get lock() {
    if (this.isFormHTMLLoaded) return this.subjectFormHTML.lock

    return this.subjectFromOSS.lock
  }

  /** 各状态评分人数 */
  @computed get subjectCollection() {
    if (this.isSubjectLoaded) {
      return freeze((this.subject.collection || {}) as Collection)
    }

    return freeze((this.subjectFromOSS.collection || {}) as Collection)
  }

  /** 原始章节数据（不排序） */
  @computed get rawEps() {
    if (this.isSubjectLoaded) {
      const eps = this.subject.eps || []
      if (eps.length >= 1000) {
        return [...eps, ...subjectStore.epV2(this.subject.id).list]
      }
      return eps
    }
    return this.subjectFromOSS.eps || []
  }

  /** 章节数据（排序后） */
  @computed get eps() {
    return freeze(this.rawEps.slice().sort((a, b) => asc(a, b, item => item.type)))
  }

  /** 过滤后的章节数据 */
  @computed get filteredEps() {
    if (this.state.filterEps) {
      return this.eps.filter((_item, index) => index > this.state.filterEps)
    }
    return this.eps
  }

  /** 经过计算后传递到 Eps 的 data */
  @computed get toEps() {
    return freeze(this.state.epsReverse ? this.filteredEps.slice().reverse() : this.filteredEps)
  }

  /** 音乐曲目数据 */
  @computed get disc() {
    if (this.isFormHTMLLoaded) return freeze(this.subjectFormHTML.disc || [])

    return freeze(this.subjectFromOSS.disc || [])
  }

  /** 详情 */
  @computed get summary() {
    if (this.isSubjectLoaded) return this.subject.summary

    return this.subjectFromOSS.summary || ''
  }

  /** 翻译结果 */
  @computed get translateResult() {
    return freeze(this.state.translateResult?.slice() || []) as TranslateResult
  }

  /** 原始关联人物数据 */
  @computed get rawCrt() {
    if (this.isSubjectLoaded) {
      return this.subject.crt || []
    }
    return (this.subjectFromOSS.character || []) as Crt[]
  }

  /** 关联人物（映射后） */
  @computed get crt() {
    return freeze(mapCrt(this.rawCrt as CrtMapSource)) as Crt[]
  }

  /** 原始制作人员数据 */
  @computed get rawStaff() {
    if (this.isSubjectLoaded) {
      const { staff } = this.subject

      /** NSFW 不再返回数据, 而旧接口 staff 也错乱, 改为使用网页的 staff 数据 */
      if (staff?.[0]?.id == this.subjectId) {
        return { type: 'persons' as const, data: monoStore.persons(this.subjectId).list }
      }

      return { type: 'staff' as const, data: staff || [] }
    }
    return { type: 'oss' as const, data: this.subjectFromOSS.staff || [] }
  }

  /** 制作人员（映射后） */
  @computed get staff() {
    const { type, data } = this.rawStaff
    if (type === 'persons') {
      return freeze(mapPersons(data as PersonsMapSource))
    }
    return freeze(mapStaff(data as StaffMapSource))
  }

  /** 原始关联条目数据 */
  @computed get rawRelations() {
    if (this.isSubjectLoaded) {
      return this.subjectFormHTML.relations || []
    }
    return this.subjectFromOSS.relations || []
  }

  /** 关联条目（映射后） */
  @computed get relations() {
    return freeze(mapRelations(this.rawRelations))
  }

  /** 单行本 */
  @computed get comic() {
    if (this.isFormHTMLLoaded) return freeze(this.subjectFormHTML.comic || [])

    return freeze(this.subjectFromOSS.comic || [])
  }

  /** 猜你喜欢 */
  @computed get like() {
    const { data } = this.state.recData
    if (data?.length) return data as RecDataItem[]

    if (this.isFormHTMLLoaded) {
      return freeze(this.subjectFormHTML.like || []) as RecDataItem[]
    }

    return freeze(this.subjectFromOSS.like || []) as RecDataItem[]
  }

  /** 包含的目录 */
  @computed get catalog() {
    if (this.isFormHTMLLoaded) return freeze(this.subjectFormHTML.catalog || [])

    return freeze(this.subjectFromOSS.catalog || [])
  }

  /** bilibili 放送信息 */
  @computed get bilibiliSite(): {
    site?: Sites
    id?: string
  } {
    return freeze(this.state.bangumiInfo?.sites?.find(item => item.site === 'bilibili') || {})
  }

  /** 爱奇艺放送信息 */
  @computed get iqiyiSite(): {
    site?: Sites
    id?: string
  } {
    return freeze(this.state.bangumiInfo?.sites?.find(item => item.site === 'iqiyi') || {})
  }

  /** 优酷放送信息 */
  @computed get youkuSite(): {
    site?: Sites
    id?: string
  } {
    return freeze(this.state.bangumiInfo?.sites?.find(item => item.site === 'youku') || {})
  }
}
