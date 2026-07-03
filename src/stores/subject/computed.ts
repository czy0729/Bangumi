/*
 * @Author: czy0729
 * @Date: 2023-04-16 13:15:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-05 20:34:20
 */
import { computed } from 'mobx'
import { x18 } from '@utils'
import { computedFn } from '@utils/computed-fn'
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
  SubjectType,
  UserId
} from '@types'
import type {
  ComputedRating,
  EpV2,
  Mono,
  MonoComments,
  MonoVoices,
  MonoWorks,
  Subject,
  SubjectCatalogs,
  SubjectComments,
  SubjectFormCDN,
  SubjectFromHTML,
  SubjectV2,
  Wiki
} from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  // -------------------- 纯计算 (直接 computedFn) --------------------
  /** 条目 (new api), 合并 subjectV2 0-999 */
  subjectV2 = computedFn((subjectId: SubjectId = 0) => {
    const last = getInt(subjectId)
    const STATE_KEY = `subjectV2${last}` as const
    return (this.state?.[STATE_KEY]?.[subjectId] || INIT_SUBJECT_V2) as SubjectV2
  })

  /** @deprecated 条目 (CDN) */
  subjectFormCDN = computedFn((subjectId: SubjectId = 0) => {
    return (this.state.subjectFormCDN[subjectId] || INIT_SUBJECT_FROM_CDN_ITEM) as SubjectFormCDN
  })

  /** @deprecated 条目章节 */
  subjectEp = computedFn((subjectId: SubjectId = 0) => {
    return this.state.subjectEp[subjectId] || {}
  })

  /** 包含条目的目录 */
  subjectCatalogs = computedFn((subjectId: SubjectId = 0) => {
    return (this.state.subjectCatalogs[subjectId] || LIST_EMPTY) as SubjectCatalogs
  })

  /** 章节内容 */
  epFormHTML = computedFn((epId: EpId = 0) => {
    return (this.state.epFormHTML[epId] || '') as HTMLText
  })

  /** 人物吐槽箱 */
  monoComments = computedFn((monoId: MonoId) => {
    return (this.state.monoComments[monoId] || LIST_EMPTY) as MonoComments
  })

  /** 人物 (CDN), 用于人物首次渲染加速 */
  monoFormCDN = computedFn((monoId: MonoId) => {
    return (this.state.monoFormCDN[monoId] || INIT_MONO) as Mono
  })

  /** 人物角色 */
  monoVoices = computedFn((monoId: MonoId) => {
    return (this.state.monoVoices[monoId] || INIT_MONO_WORKS) as MonoVoices
  })

  /** 人物作品 */
  monoWorks = computedFn((monoId: MonoId) => {
    return (this.state.monoWorks[monoId] || INIT_MONO_WORKS) as MonoWorks
  })

  /** 好友评分列表 */
  rating = computedFn(
    (subjectId: SubjectId = 0, status: RatingStatus = DEFAULT_RATING_STATUS, isFriend = false) => {
      const ITEM_KEY = [subjectId, status, isFriend].join('|')
      return (this.state.rating[ITEM_KEY] || {
        ...LIST_EMPTY,
        counts: {
          wishes: 0,
          collections: 0,
          doings: 0,
          on_hold: 0,
          dropped: 0
        }
      }) as ComputedRating
    }
  )

  /** 条目维基修订历史 */
  wiki = computedFn((subjectId: SubjectId = 0) => {
    return (this.state.wiki[subjectId] || INIT_SUBJECT_WIKI) as Wiki
  })

  /** 尽量获取到条目封面 */
  cover = computedFn((subjectId: SubjectId) => {
    return (this.subjectV2(subjectId)?.image ||
      this.subject(subjectId)?.images?.medium ||
      this.subjectFromOSS(subjectId)?.images?.medium ||
      '') as Cover<'m'>
  })

  /** 尽量获取到条目中文名 */
  cn = computedFn((subjectId: SubjectId) => {
    return (
      this.subjectV2(subjectId)?.cn ||
      this.subject(subjectId)?.name_cn ||
      this.subjectFromOSS(subjectId)?.name_cn ||
      ''
    )
  })

  /** 尽量获取到条目日文名 */
  jp = computedFn((subjectId: SubjectId) => {
    return (
      this.subjectV2(subjectId)?.jp ||
      this.subject(subjectId)?.name ||
      this.subjectFromOSS(subjectId)?.name ||
      ''
    )
  })

  /** 尽量获取到条目类型 */
  type = computedFn((subjectId: SubjectId) => {
    return (
      this.subjectV2(subjectId)?.type ||
      this.subject(subjectId)?.type ||
      this.subjectFromOSS(subjectId)?.type ||
      '2'
    )
  })

  /** 尽量获取到条目排名 */
  ratingRank = computedFn((subjectId: SubjectId) => {
    return (
      this.subjectV2(subjectId)?.rank ||
      this.subject(subjectId)?.rank ||
      this.subjectFromOSS(subjectId)?.rank ||
      0
    )
  })

  /** 尽量获取到条目分数 */
  ratingScore = computedFn((subjectId: SubjectId) => {
    return (
      this.subjectV2(subjectId)?.rating?.score ||
      this.subject(subjectId)?.rating?.score ||
      this.subjectFromOSS(subjectId)?.rating?.score ||
      ''
    )
  })

  /** 尽量获取到条目打分人数 */
  ratingTotal = computedFn((subjectId: SubjectId) => {
    return (
      this.subjectV2(subjectId)?.rating?.total ||
      this.subject(subjectId)?.rating?.total ||
      this.subjectFromOSS(subjectId)?.rating?.total ||
      0
    )
  })

  /** 尽量获取到条目发送日 */
  date = computedFn((subjectId: SubjectId) => {
    return (
      this.subjectV2(subjectId)?.date ||
      this.subject(subjectId)?.air_date ||
      this.subjectFromOSS(subjectId)?.air_date ||
      ''
    )
  })

  /** 尽量获取到条目章节数 */
  eps = computedFn((subjectId: SubjectId) => {
    return this.subjectV2(subjectId)?.eps || this.subjectV2(subjectId)?.vol || ''
  })

  // -------------------- 有副作用 (分离 init + computedFn) --------------------
  /** 条目, 合并 subject 0-999 */
  private _subject = computedFn((subjectId: SubjectId = 0) => {
    const last = getInt(subjectId)
    const STATE_KEY = `subject${last}` as const
    return (this.state?.[STATE_KEY]?.[subjectId] || INIT_SUBJECT) as Subject
  })

  /** 条目 (HTML), 合并 subjectFormHTML 0-999 */
  private _subjectFormHTML = computedFn((subjectId: SubjectId = 0) => {
    const last = getInt(subjectId)
    const STATE_KEY = `subjectFormHTML${last}` as const
    return (this.state?.[STATE_KEY]?.[subjectId] || INIT_SUBJECT_FROM_HTML_ITEM) as SubjectFromHTML
  })

  /** 条目 (云缓存) */
  private _subjectFromOSS = computedFn((subjectId: SubjectId = 0) => {
    return (this.state.subjectFromOSS[subjectId] || INIT_SUBJECT) as Subject
  })

  /** 条目吐槽箱, 合并 subjectComments 0-999 */
  private _subjectComments = computedFn((subjectId: SubjectId = 0) => {
    const last = getInt(subjectId)
    const STATE_KEY = `subjectComments${last}` as const
    return (this.state?.[STATE_KEY]?.[subjectId] || LIST_EMPTY) as SubjectComments
  })

  /** 章节更新时间 */
  private _epStatus = computedFn((epId: EpId = 0) => {
    return (this.state.epStatus[epId] || '') as string
  })

  /** 集数大于 1000 的条目的章节信息 */
  private _epV2 = computedFn((subjectId: SubjectId) => {
    return (this.state.epV2[subjectId] || INIT_EP_V2) as EpV2
  })

  /** 人物信息 */
  private _mono = computedFn((monoId: MonoId) => {
    return (this.state.mono[monoId] || INIT_MONO) as Mono
  })

  /** 条目分数 (用于收藏按网站评分排序) */
  private _rank = computedFn((subjectId: SubjectId = 0) => {
    return (
      this.state.rank[subjectId] || {
        r: undefined,
        s: undefined,
        _loaded: false
      }
    )
  })

  /** VIB 相关数据 */
  private _vib = computedFn((subjectId: SubjectId = 0) => {
    return this.state.vib[subjectId] || STATE.vib[0]
  })

  /** r18 */
  private _nsfw = computedFn((subjectId: SubjectId = 0) => {
    return this.state.nsfw[subjectId] || this.subjectV2(subjectId).nsfw || x18(subjectId) || false
  })

  /** 自定义跳转 */
  private _actions = computedFn((subjectId: SubjectId = 0) => {
    return (this.state.actions[subjectId] || []) as ActionsItem
  })

  /** 追踪TA的评论次数追踪 */
  private _commentTrack = computedFn((userId: UserId, type: SubjectType) => {
    const ITEM_KEY = `${userId}|${type}` as const
    return this.state.commentTrack[ITEM_KEY] || 0
  })

  // -------------------- 导出方法 (分离 init) --------------------
  /** 条目, 合并 subject 0-999 */
  subject(subjectId: SubjectId = 0) {
    const last = getInt(subjectId)
    this.init(`subject${last}`, true)
    return this._subject(subjectId)
  }

  /** 条目 (HTML), 合并 subjectFormHTML 0-999 */
  subjectFormHTML(subjectId: SubjectId = 0) {
    const last = getInt(subjectId)
    this.init(`subjectFormHTML${last}`, true)
    return this._subjectFormHTML(subjectId)
  }

  /** 条目 (云缓存) */
  subjectFromOSS(subjectId: SubjectId = 0) {
    this.init('subjectFromOSS', true)
    return this._subjectFromOSS(subjectId)
  }

  /** 条目吐槽箱, 合并 subjectComments 0-999 */
  subjectComments(subjectId: SubjectId = 0) {
    const last = getInt(subjectId)
    this.init(`subjectComments${last}`, true)
    return this._subjectComments(subjectId)
  }

  /** 章节更新时间 */
  epStatus(epId: EpId = 0) {
    this.init('epStatus', true)
    return this._epStatus(epId)
  }

  /** 集数大于 1000 的条目的章节信息 */
  epV2(subjectId: SubjectId) {
    this.init('epV2', true)
    return this._epV2(subjectId)
  }

  /** 人物信息 */
  mono(monoId: MonoId) {
    this.init('mono', true)
    return this._mono(monoId)
  }

  /** 条目分数 (用于收藏按网站评分排序) */
  rank(subjectId: SubjectId = 0) {
    this.init('rank', true)
    return this._rank(subjectId)
  }

  /** VIB 相关数据 */
  vib(subjectId: SubjectId = 0) {
    this.init('vib', true)
    return this._vib(subjectId)
  }

  /** r18 */
  nsfw(subjectId: SubjectId = 0) {
    this.init('nsfw', true)
    return this._nsfw(subjectId)
  }

  /** 自定义源头数据 */
  @computed get origin() {
    this.init('origin', true)
    return this.state.origin
  }

  /** 自定义跳转 */
  actions(subjectId: SubjectId = 0) {
    this.init('actions', true)
    return this._actions(subjectId)
  }

  /** 追踪TA的评论次数追踪 */
  commentTrack(userId: UserId, type: SubjectType) {
    this.init('commentTrack', true)
    return this._commentTrack(userId, type)
  }
}
