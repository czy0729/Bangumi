/*
 * @Author: czy0729
 * @Date: 2023-04-16 13:15:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 11:18:40
 */
import { computed } from 'mobx'
import { x18 } from '@utils'
import { LIST_EMPTY } from '@constants'
import {
  DEFAULT_RATING_STATUS,
  INIT_EP_V2,
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

import type {
  ActionsItem,
  Cover,
  EpId,
  HTMLText,
  MonoId,
  RatingStatus,
  StoreConstructor,
  SubjectId,
  SubjectTypeValue
} from '@types'
import type {
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
    const STATE_KEY = `subject${last}` as const
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = subjectId
      return (this.state?.[STATE_KEY]?.[ITEM_KEY] || INIT_SUBJECT) as Subject
    }).get()
  }

  /** 条目 (HTML), 合并 subjectFormHTML 0-999 */
  subjectFormHTML(subjectId: SubjectId = 0) {
    const last = getInt(subjectId)
    const STATE_KEY = `subjectFormHTML${last}` as const
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = subjectId
      return (this.state?.[STATE_KEY]?.[ITEM_KEY] || INIT_SUBJECT_FROM_HTML_ITEM) as SubjectFromHTML
    }).get()
  }

  /** 条目 (new api), 合并 subjectV2 0-999 */
  subjectV2(subjectId: SubjectId = 0) {
    const last = getInt(subjectId)
    const STATE_KEY = `subjectV2${last}` as const

    return computed(() => {
      const ITEM_KEY = subjectId
      return (this.state?.[STATE_KEY]?.[ITEM_KEY] || INIT_SUBJECT_V2) as SubjectV2
    }).get()
  }

  /** 条目 (云缓存) */
  subjectFromOSS(subjectId: SubjectId = 0) {
    const STATE_KEY = 'subjectFromOSS'
    this.init(STATE_KEY, true)

    return computed(() => {
      return (this.state[STATE_KEY][subjectId] || INIT_SUBJECT) as Subject
    }).get()
  }

  /** @deprecated 条目 (CDN) */
  subjectFormCDN(subjectId: SubjectId = 0) {
    const STATE_KEY = 'subjectFormCDN'

    return computed(() => {
      return (this.state[STATE_KEY][subjectId] || INIT_SUBJECT_FROM_CDN_ITEM) as SubjectFormCDN
    }).get()
  }

  /** @deprecated 条目章节 */
  subjectEp(subjectId: SubjectId = 0) {
    const STATE_KEY = 'subjectEp'

    return computed(() => {
      const ITEM_KEY = subjectId
      return this.state[STATE_KEY][ITEM_KEY] || {}
    }).get()
  }

  /** 包含条目的目录 */
  subjectCatalogs(subjectId: SubjectId = 0) {
    const STATE_KEY = 'subjectCatalogs'

    return computed(() => {
      const ITEM_KEY = subjectId
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as SubjectCatalogs
    }).get()
  }

  /** 条目吐槽箱, 合并 subjectComments 0-999 */
  subjectComments(subjectId: SubjectId = 0) {
    const last = getInt(subjectId)
    const STATE_KEY = `subjectComments${last}` as const
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = subjectId
      return (this.state?.[STATE_KEY]?.[ITEM_KEY] || LIST_EMPTY) as SubjectComments
    }).get()
  }

  /** 章节内容 */
  epFormHTML(epId: EpId = 0) {
    const STATE_KEY = 'epFormHTML'

    return computed(() => {
      const ITEM_KEY = epId
      return (this.state[STATE_KEY][ITEM_KEY] || '') as HTMLText
    }).get()
  }

  /** 章节更新时间 */
  epStatus(epId: EpId = 0) {
    const STATE_KEY = 'epStatus'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = epId
      return (this.state[STATE_KEY][ITEM_KEY] || '') as string
    }).get()
  }

  /** 集数大于 1000 的条目的章节信息 */
  epV2(subjectId: SubjectId) {
    const STATE_KEY = 'epStatus'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = subjectId
      return (this.state[STATE_KEY][ITEM_KEY] || INIT_EP_V2) as EpV2
    }).get()
  }

  /** 人物信息 */
  mono(monoId: MonoId) {
    const STATE_KEY = 'mono'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = monoId
      return (this.state[STATE_KEY][ITEM_KEY] || INIT_MONO) as Mono
    }).get()
  }

  /** 人物吐槽箱 */
  monoComments(monoId: MonoId) {
    const STATE_KEY = 'monoComments'

    return computed(() => {
      const ITEM_KEY = monoId
      return (this.state[STATE_KEY][ITEM_KEY] || LIST_EMPTY) as MonoComments
    }).get()
  }

  /** 人物 (CDN), 用于人物首次渲染加速 */
  monoFormCDN(monoId: MonoId) {
    const STATE_KEY = 'monoFormCDN'

    return computed(() => {
      const ITEM_KEY = monoId
      return (this.state[STATE_KEY][ITEM_KEY] || INIT_MONO) as Mono
    }).get()
  }

  /** 人物角色 */
  monoVoices(monoId: MonoId) {
    const STATE_KEY = 'monoVoices'

    return computed(() => {
      const ITEM_KEY = monoId
      return (this.state[STATE_KEY][ITEM_KEY] || INIT_MONO_WORKS) as MonoVoices
    }).get()
  }

  /** 人物作品 */
  monoWorks(monoId: MonoId) {
    const STATE_KEY = 'monoWorks'

    return computed(() => {
      const ITEM_KEY = monoId
      return (this.state[STATE_KEY][ITEM_KEY] || INIT_MONO_WORKS) as MonoWorks
    }).get()
  }

  /** 好友评分列表 */
  rating(
    subjectId: SubjectId = 0,
    status: RatingStatus = DEFAULT_RATING_STATUS,
    isFriend: boolean = false
  ) {
    const STATE_KEY = 'rating'

    return computed(() => {
      const ITEM_KEY = [subjectId, status, isFriend].join('|')
      return (this.state[STATE_KEY][ITEM_KEY] || {
        ...LIST_EMPTY,
        counts: {
          wishes: 0,
          collections: 0,
          doings: 0,
          on_hold: 0,
          dropped: 0
        }
      }) as ComputedRating
    }).get()
  }

  /** 条目分数 (用于收藏按网站评分排序) */
  rank(subjectId: SubjectId = 0) {
    const STATE_KEY = 'rank'
    this.init(STATE_KEY, true)

    return computed<RankItem>(() => {
      const ITEM_KEY = subjectId
      return (
        this.state[STATE_KEY][ITEM_KEY] || {
          r: undefined,
          s: undefined,
          _loaded: false
        }
      )
    }).get()
  }

  /** VIB 相关数据 */
  vib(subjectId: SubjectId = 0) {
    const STATE_KEY = 'vib'
    this.init(STATE_KEY, true)

    return computed<(typeof STATE.vib)[0]>(() => {
      const ITEM_KEY = subjectId
      return this.state[STATE_KEY][ITEM_KEY] || STATE.vib[0]
    }).get()
  }

  /** r18 */
  nsfw(subjectId: SubjectId = 0) {
    const STATE_KEY = 'nsfw'
    this.init(STATE_KEY, true)

    return computed<boolean>(() => {
      const ITEM_KEY = subjectId
      return this.state.nsfw[ITEM_KEY] || this.subjectV2(ITEM_KEY).nsfw || x18(ITEM_KEY) || false
    }).get()
  }

  /** 条目维基修订历史 */
  wiki(subjectId: SubjectId = 0) {
    const STATE_KEY = 'wiki'

    return computed(() => {
      const ITEM_KEY = subjectId
      return (this.state[STATE_KEY][ITEM_KEY] || INIT_SUBJECT_WIKI) as Wiki
    }).get()
  }

  /** 自定义源头数据 */
  @computed get origin() {
    const STATE_KEY = 'origin'
    this.init(STATE_KEY, true)

    return this.state[STATE_KEY]
  }

  /** 自定义跳转 */
  actions(subjectId: SubjectId = 0) {
    const STATE_KEY = 'actions'
    this.init(STATE_KEY, true)

    return computed(() => {
      const ITEM_KEY = subjectId
      return (this.state[STATE_KEY][ITEM_KEY] || []) as ActionsItem
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

  /** 尽量获取到条目章节数 */
  eps(subjectId: SubjectId) {
    return computed<'' | number>(() => {
      return this.subjectV2(subjectId)?.eps || this.subjectV2(subjectId)?.vol || ''
    }).get()
  }
}
