/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:26:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-26 20:25:33
 */
import { computed } from 'mobx'
import { calendarStore, collectionStore, subjectStore, userStore } from '@stores'
import {
  desc,
  findSubjectCn,
  fixedSubjectInfo,
  freeze,
  getAction,
  getOnAir,
  getTimestamp,
  HTMLDecode,
  matchCoverUrl,
  x18
} from '@utils'
import { logger } from '@utils/dev'
import { extractDlsiteId, extractVndbId } from '@utils/thirdParty/dlsite-vndb'
import { HOST, IMG_DEFAULT, MODEL_SUBJECT_TYPE } from '@constants'
import State from '../state'
import { EXCLUDE_STATE, NAMESPACE } from '../ds'
import { getOriginConfig } from '../../../../user/origin-setting/utils'
import {
  checkIsPS,
  filterSubjectComments,
  getAnimeInfo,
  getAnimeTags,
  getGameInfo,
  getGameTags,
  getMangaInfo,
  getMangaTags,
  getOnlineOrigins,
  getValidPlaySources,
  getWenkuInfo,
  getWenkuTags
} from '../utils'

import type { SubjectType, SubjectTypeCn } from '@types'
import type { SubjectCommentValue, TagsItem } from '../../types'

/** 条目基础派生数据 */
export default class Base extends State {
  /** 本地化 */
  save = () => {
    return this.saveStorage(this.namespace, EXCLUDE_STATE)
  }

  /** 开发调试 */
  log(...arg: unknown[]) {
    logger.info(this.namespace, ...arg)
  }

  /** 开发调试 */
  warn(...arg: unknown[]) {
    logger.warn(this.namespace, ...arg)
  }

  /** 条目唯一 ID */
  @computed get subjectId() {
    return this.params.subjectId
  }

  /** 页面唯一命名空间 */
  @computed get namespace() {
    return `${NAMESPACE}|${this.subjectId}`
  }

  /** 是否敏感条目 */
  @computed get nsfw() {
    return this.subject?.v0 || x18(this.subjectId, this.cn || this.jp)
  }

  /** 用户自定义播放信息 */
  @computed get onAirCustom() {
    return freeze(
      getOnAir(calendarStore.onAirLocal(this.subjectId), calendarStore.onAirUser(this.subjectId))
    )
  }

  /** 官方网址 */
  @computed get url() {
    return `${HOST}/subject/${this.subjectId}`
  }

  /** 用户 ID */
  @computed get userId() {
    return userStore.userInfo.id
  }

  /** 条目信息 */
  @computed get subject() {
    return freeze(subjectStore.subject(this.subjectId))
  }

  /** 条目信息 (来自网页) */
  @computed get subjectFormHTML() {
    return freeze(subjectStore.subjectFormHTML(this.subjectId))
  }

  /** 网页版详情是否已加载 */
  @computed get isFormHTMLLoaded() {
    return this.subjectFormHTML._loaded
  }

  /** 条目是否已加载完整数据 */
  @computed get isSubjectLoaded() {
    return this.subject._loaded && !!this.subject.rating
  }

  /** 条目缓存 (来自云端快照) */
  @computed get subjectFromOSS() {
    return freeze(this.state.subject)
  }

  /**
   * 条目留言, 筛选逻辑
   *  - 主动设置屏蔽默认头像用户相关信息
   *  - 限制用户群体 (iOS 的游客和审核员) 强制屏蔽默认头像用户
   */
  @computed get subjectComments(): SubjectCommentValue {
    let subjectComments: SubjectCommentValue = subjectStore.subjectComments(this.subjectId)
    if (!subjectComments._loaded && this.state.comments.list?.length) {
      subjectComments = this.state.comments
    }

    const filteredList = filterSubjectComments(subjectComments.list, this.state.filterScores)
    if (!filteredList.length) {
      const { pageTotal } = subjectComments.pagination
      return {
        list: [],
        pagination: {
          page: pageTotal || 1,
          pageTotal
        },
        version: subjectComments.version || false,
        _reverse: subjectComments._reverse,
        _loaded: getTimestamp()
      }
    }

    if (filteredList.length === subjectComments.list.length) return subjectComments

    return {
      ...subjectComments,
      list: filteredList,
      version: subjectComments.version || false
    }
  }

  /** 主封面 */
  @computed get cover() {
    return (
      this.params._imageForce ||
      (this.subject.images?.common ? matchCoverUrl(this.subject.images.common) : '') ||
      this.subjectFromOSS.image ||
      IMG_DEFAULT
    )
  }

  /** 条目收藏信息 */
  @computed get collection() {
    return freeze(collectionStore.collection(this.subjectId))
  }

  /** 用户章节记录 */
  @computed get userProgress() {
    return freeze(userStore.userProgress(this.subjectId))
  }

  /** 条目类型 (中文) */
  @computed get type() {
    if (!this.subject._loaded) {
      const { _type = '' } = this.params
      if (_type) return _type
    }

    return MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(
      this.subject.type || this.state?.subject?.type
    )
  }

  /** 条目类型 (数字) */
  @computed get subjectType() {
    if (this.subject._loaded) return this.subject.type

    return this.subjectFromOSS.type
  }

  /** 条目类型值 */
  @computed get subjectTypeValue() {
    return MODEL_SUBJECT_TYPE.getLabel<SubjectType>(this.subjectType)
  }

  /** 尽量找到排名 */
  @computed get rank() {
    return (
      this.subject.rank ||
      subjectStore.ratingRank(this.subjectId) ||
      this.subjectFromOSS?.rating?.rank ||
      0
    )
  }

  /** VIB 等评分数据 */
  @computed get vib() {
    return freeze(subjectStore.vib(this.subjectId))
  }

  /** 章节正版播放源 */
  @computed get onlinePlayActionSheetData() {
    return getValidPlaySources(this.state.epsData)
  }

  /** 条目动作 */
  @computed get action() {
    return getAction(this.type as SubjectTypeCn)
  }

  /** 用户自定义源头 */
  @computed get userOrigins() {
    return freeze(getOriginConfig(subjectStore.origin, 'anime'))
  }

  /** 自定义跳转 */
  /** 原始动作数据 */
  @computed get rawActions() {
    return subjectStore.actions(this.subjectId)
  }

  @computed get actions() {
    return freeze(
      this.rawActions
        .slice()
        .filter(item => item.active)
        .sort((a, b) => desc(a.sort || 0, b.sort || 0))
    )
  }

  /** 动画和三次元源头 */
  @computed get onlineOrigins() {
    return freeze(
      getOnlineOrigins({
        type: this.type,
        nsfw: this.nsfw,
        tags: this.tags || [],
        sites: this.state.bangumiInfo.sites || []
      })
    )
  }

  /** 漫画源头 */
  @computed get onlineComicOrigins() {
    return freeze(
      getOriginConfig(
        subjectStore.origin,
        this.titleLabel.includes('小说') ? 'wenku' : 'manga'
      ).filter(item => item.active)
    )
  }

  /** 音乐源头 */
  @computed get onlineDiscOrigins() {
    return freeze(getOriginConfig(subjectStore.origin, 'music').filter(item => item.active))
  }

  /** 游戏源头 */
  @computed get onlineGameOrigins() {
    return freeze(getOriginConfig(subjectStore.origin, 'game').filter(item => item.active))
  }

  /** 是否 PS 游戏, 跳转 psnine 查看奖杯 */
  @computed get isPS() {
    return checkIsPS(this.type, this.info)
  }

  /** 第三方动画信息 */
  @computed get animeInfo() {
    const item = getAnimeInfo(this.type, this.subjectId)
    return item ? freeze(item) : null
  }

  /** 第三方动画标签 */
  @computed get animeTags() {
    const tags = getAnimeTags(this.subjectId, this.animeInfo)
    return tags ? freeze<TagsItem[]>(tags) : null
  }

  /** 第三方游戏信息 */
  @computed get gameInfo() {
    const item = getGameInfo(this.type, this.subjectId)
    return item ? freeze(item) : null
  }

  /** 第三方游戏标签 */
  @computed get gameTags() {
    const tags = getGameTags(this.gameInfo)
    return tags ? freeze<TagsItem[]>(tags) : null
  }

  /** ADV 类型游戏专用，VNDB ID (从 infobox 链接提取) */
  @computed get vndbId(): string | null {
    if (this.type !== '游戏') return null
    return extractVndbId(this.rawInfo)
  }

  /** ADV 类型游戏专用，DLsite ID (从 infobox 链接提取) */
  @computed get dlsiteId(): string | null {
    if (this.type !== '游戏') return null
    return extractDlsiteId(this.rawInfo)
  }

  /** ADV 类型游戏专用，是否有外部截图数据 */
  @computed get hasExternalScreenshots(): boolean {
    return !!(
      this.state.externalScreenshots.vndb.length || this.state.externalScreenshots.dlsite.length
    )
  }

  /** 第三方漫画信息 */
  @computed get mangaInfo() {
    const item = getMangaInfo(this.type, this.subjectId)
    return item ? freeze(item) : null
  }

  /** 第三方游漫画标签 */
  @computed get mangaTags() {
    const tags = getMangaTags(this.mangaInfo)
    return tags ? freeze<TagsItem[]>(tags) : null
  }

  /** 第三方文库信息 */
  @computed get wenkuInfo() {
    const item = getWenkuInfo(this.type, this.subjectId)
    return item ? freeze(item) : null
  }

  /** 第三方游文库标签 */
  @computed get wenkuTags() {
    const tags = getWenkuTags(this.wenkuInfo)
    return tags ? freeze<TagsItem[]>(tags) : null
  }

  /** 漫画或文库是否有源头 */
  @computed get source() {
    if (this.type !== '书籍') return null

    return freeze({
      mangaId: 0,
      wenkuId: 0
    })
  }

  /** 日文名 */
  @computed get jp() {
    return HTMLDecode(this.subject.name || this.params._jp || this.subjectFromOSS.name)
  }

  /** 中文名 */
  @computed get cn() {
    return HTMLDecode(
      this.subject.name_cn ||
        this.params._cn ||
        this.subjectFromOSS.name_cn ||
        findSubjectCn(this.jp, this.subjectId)
    )
  }

  /** 原始标签数据 */
  @computed get rawTags() {
    return (this.isFormHTMLLoaded ? this.subjectFormHTML.tags : this.subjectFromOSS.tags) || []
  }

  /** 标签（过滤后） */
  @computed get tags() {
    return freeze(
      this.rawTags.some(item => !item.name)
        ? this.rawTags.filter(item => !!item.name)
        : this.rawTags
    )
  }

  /** 网页版详情 */
  @computed get rawInfo() {
    return (this.isFormHTMLLoaded ? this.subjectFormHTML.info : this.subjectFromOSS.info) || ''
  }

  /** 网页版详情处理后 */
  @computed get info() {
    return fixedSubjectInfo(this.rawInfo)
  }

  /** 条目类别 */
  @computed get titleLabel() {
    // bangumiInfo 只有动画的数据
    const label = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(this.subjectType)
    if (label === '动画') {
      const { bangumiInfo } = this.state
      const _label =
        this.subjectFormHTML.type || String(bangumiInfo.type).toUpperCase() || label || 'TV'
      if (_label === '动画') return 'TV'

      if (_label === '剧场版') return 'MOVIE'

      return _label || this.subjectFromOSS.titleLabel || ''
    }

    return this.subjectFormHTML.type || label || this.subjectFromOSS.titleLabel || ''
  }
}
