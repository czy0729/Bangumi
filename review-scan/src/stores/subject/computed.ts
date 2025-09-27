/*
 * @Author: czy0729
 * @Date: 2023-04-16 13:15:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 00:40:50
 */
import { computed } from 'mobx'
import { x18 } from '@utils'
import { LIST_EMPTY } from '@constants'
import {
  Cover,
  EpId,
  HTMLText,
  MonoId,
  Origin,
  RatingStatus,
  StoreConstructor,
  SubjectId,
  SubjectTypeValue
} from '@types'
import {
  DEFAULT_RATING_STATUS,
  INIT_MONO,
  INIT_MONO_WORKS,
  INIT_SUBJECT,
  INIT_SUBJECT_FROM_CDN_ITEM,
  INIT_SUBJECT_FROM_HTML_ITEM,
  INIT_SUBJECT_V2,
  INIT_SUBJECT_WIKI,
  STATE
} from './init'
import { getInt } from './utils'
import State from './state'
import {
  ComputedRating,
  EpV2,
  Mono,
  MonoComments,
  MonoVoices,
  MonoWorks,
  RankItem,
  Subject,
  SubjectCatalogs,
  SubjectComments,
  SubjectFormCDN,
  SubjectFromHTML,
  SubjectV2,
  Wiki
} from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 条目, 合并 subject 0-999 */
  subject(subjectId: SubjectId = 0) {
    const last = getInt(subjectId)
    const key = `subject${last}` as const
    this.init(key, true)

    return computed<Subject>(() => {
      return this.state?.[key]?.[subjectId] || INIT_SUBJECT
    }).get()
  }

  /** 条目 (HTML), 合并 subjectFormHTML 0-999 */
  subjectFormHTML(subjectId: SubjectId = 0) {
    const last = getInt(subjectId)
    const key = `subjectFormHTML${last}` as const
    this.init(key, true)

    return computed<SubjectFromHTML>(() => {
      return this.state?.[key]?.[subjectId] || INIT_SUBJECT_FROM_HTML_ITEM
    }).get()
  }

  /** 条目 (new api), 合并 subjectV2 0-999 */
  subjectV2(subjectId: SubjectId = 0) {
    const last = getInt(subjectId)
    const key = `subjectV2${last}` as const
    return computed<SubjectV2>(() => {
      return this.state?.[key]?.[subjectId] || INIT_SUBJECT_V2
    }).get()
  }

  /** 条目 (云缓存) */
  subjectFromOSS(subjectId: SubjectId) {
    this.init('subjectFromOSS', true)
    return computed<Subject>(() => {
      return this.state.subjectFromOSS[subjectId] || INIT_SUBJECT
    }).get()
  }

  /** @deprecated 条目 (CDN) */
  subjectFormCDN(subjectId: SubjectId) {
    return computed<SubjectFormCDN>(() => {
      return this.state.subjectFormCDN[subjectId] || INIT_SUBJECT_FROM_CDN_ITEM
    }).get()
  }

  /** @deprecated 条目章节 */
  subjectEp(subjectId: SubjectId) {
    return computed(() => {
      return this.state.subjectEp[subjectId] || {}
    }).get()
  }

  /** 包含条目的目录 */
  subjectCatalogs(subjectId: SubjectId) {
    return computed<SubjectCatalogs>(() => {
      return this.state.subjectCatalogs[subjectId] || LIST_EMPTY
    }).get()
  }

  /** 条目吐槽箱, 合并 subjectComments 0-999 */
  subjectComments(subjectId: SubjectId = 0) {
    const last = getInt(subjectId)
    const key = `subjectComments${last}` as const
    this.init(key, true)

    return computed<SubjectComments>(() => {
      return this.state?.[key]?.[subjectId] || LIST_EMPTY
    }).get()
  }

  /** 章节内容 */
  epFormHTML(epId: EpId) {
    return computed<HTMLText>(() => {
      return this.state.epFormHTML[epId] || ''
    }).get()
  }

  /** 集数大于 1000 的条目的章节信息 */
  epV2(subjectId: SubjectId) {
    this.init('epV2', true)
    return computed<EpV2>(() => {
      return this.state.epV2[subjectId] || this.state.epV2[0]
    }).get()
  }

  /** 章节内容 */
  mono(monoId: MonoId) {
    this.init('mono', true)
    return computed<Mono>(() => {
      return this.state.mono[monoId] || INIT_MONO
    }).get()
  }

  /** 人物吐槽箱 */
  monoComments(monoId: MonoId) {
    return computed<MonoComments>(() => {
      return this.state.monoComments[monoId] || LIST_EMPTY
    }).get()
  }

  /** 人物 (CDN), 用于人物首次渲染加速 */
  monoFormCDN(monoId: MonoId) {
    return computed<Mono>(() => {
      return this.state.monoFormCDN[monoId] || INIT_MONO
    }).get()
  }

  /** 人物作品 */
  monoWorks(monoId: MonoId) {
    return computed<MonoWorks>(() => {
      return this.state.monoWorks[monoId] || INIT_MONO_WORKS
    }).get()
  }

  /** 人物饰演的角色 */
  monoVoices(monoId: MonoId) {
    return computed<MonoVoices>(() => {
      return this.state.monoVoices[monoId] || INIT_MONO_WORKS
    }).get()
  }

  /** 好友评分列表 */
  rating(
    subjectId: SubjectId,
    status: RatingStatus = DEFAULT_RATING_STATUS,
    isFriend: boolean = false
  ) {
    return computed<ComputedRating>(() => {
      return (
        this.state.rating[`${subjectId}|${status}|${isFriend}`] || {
          ...LIST_EMPTY,
          counts: {
            wishes: 0,
            collections: 0,
            doings: 0,
            on_hold: 0,
            dropped: 0
          }
        }
      )
    }).get()
  }

  /** 条目分数 (用于收藏按网站评分排序) */
  rank(subjectId: SubjectId) {
    this.init('rank', true)
    return computed<RankItem>(() => {
      return (
        this.state.rank[subjectId] || {
          r: undefined,
          s: undefined,
          _loaded: false
        }
      )
    }).get()
  }

  /** VIB 相关数据 */
  vib(subjectId: SubjectId) {
    this.init('vib', true)
    return computed<(typeof STATE.vib)[0]>(() => {
      return this.state.vib[subjectId] || STATE.vib[0]
    }).get()
  }

  /** r18 */
  nsfw(subjectId: SubjectId) {
    this.init('nsfw', true)
    return computed<boolean>(() => {
      return this.state.nsfw[subjectId] || this.subjectV2(subjectId).nsfw || x18(subjectId) || false
    }).get()
  }

  /** wiki 修订历史 */
  wiki(subjectId: SubjectId) {
    return computed<Wiki>(() => {
      return this.state.wiki[subjectId] || INIT_SUBJECT_WIKI
    }).get()
  }

  /** 自定义源头数据 */
  @computed get origin(): Origin {
    this.init('origin', true)
    return this.state.origin
  }

  /** 自定义跳转 */
  actions(subjectId: SubjectId) {
    this.init('actions', true)
    return computed(() => {
      return this.state.actions[subjectId] || []
    }).get()
  }

  // -------------------- computed --------------------
  /** 尽量获取到条目封面 */
  cover(subjectId: SubjectId) {
    return computed(() => {
      return (this.subjectV2(subjectId)?.image ||
        this.subject(subjectId)?.images?.medium ||
        this.subjectFromOSS(subjectId)?.images?.medium ||
        '') as Cover<'m'>
    }).get()
  }

  /** 尽量获取到条目中文名 */
  cn(subjectId: SubjectId) {
    return computed<string>(() => {
      return (
        this.subjectV2(subjectId)?.cn ||
        this.subject(subjectId)?.name_cn ||
        this.subjectFromOSS(subjectId)?.name_cn ||
        ''
      )
    }).get()
  }

  /** 尽量获取到条目日文名 */
  jp(subjectId: SubjectId) {
    return computed<string>(() => {
      return (
        this.subjectV2(subjectId)?.jp ||
        this.subject(subjectId)?.name ||
        this.subjectFromOSS(subjectId)?.name ||
        ''
      )
    }).get()
  }

  /** 尽量获取到条目类型 */
  type(subjectId: SubjectId) {
    return computed<SubjectTypeValue>(() => {
      return (
        this.subjectV2(subjectId)?.type ||
        this.subject(subjectId)?.type ||
        this.subjectFromOSS(subjectId)?.type ||
        '2'
      )
    }).get()
  }

  /** 尽量获取到条目排名 */
  ratingRank(subjectId: SubjectId) {
    return computed<number>(() => {
      return (
        this.subjectV2(subjectId)?.rank ||
        this.subject(subjectId)?.rank ||
        this.subjectFromOSS(subjectId)?.rank ||
        0
      )
    }).get()
  }

  /** 尽量获取到条目分数 */
  ratingScore(subjectId: SubjectId) {
    return computed<number | ''>(() => {
      return (
        this.subjectV2(subjectId)?.rating?.score ||
        this.subject(subjectId)?.rating?.score ||
        this.subjectFromOSS(subjectId)?.rating?.score ||
        ''
      )
    }).get()
  }

  /** 尽量获取到条目打分人数 */
  ratingTotal(subjectId: SubjectId) {
    return computed<number | ''>(() => {
      return (
        this.subjectV2(subjectId)?.rating?.total ||
        this.subject(subjectId)?.rating?.total ||
        this.subjectFromOSS(subjectId)?.rating?.total ||
        0
      )
    }).get()
  }

  /** 尽量获取到条目发送日 */
  date(subjectId: SubjectId) {
    return computed<string>(() => {
      return (
        this.subjectV2(subjectId)?.date ||
        this.subject(subjectId)?.air_date ||
        this.subjectFromOSS(subjectId)?.air_date ||
        ''
      )
    }).get()
  }
}
