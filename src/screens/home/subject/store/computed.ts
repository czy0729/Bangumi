/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:26:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-24 07:47:13
 */
import { computed } from 'mobx'
import {
  _,
  calendarStore,
  collectionStore,
  monoStore,
  rakuenStore,
  subjectStore,
  systemStore,
  usersStore,
  userStore
} from '@stores'
import {
  asc,
  desc,
  findSubjectCn,
  fixedSubjectInfo,
  freeze,
  getAction,
  getOnAir,
  getTimestamp,
  HTMLDecode,
  keepBasicChars,
  matchCoverUrl,
  x18
} from '@utils'
import { logger } from '@utils/dev'
import { extractDlsiteId, extractVndbId } from '@utils/thirdParty/dlsite-vndb'
import { HOST, IMG_DEFAULT, IMG_WIDTH_LG, MODEL_SUBJECT_TYPE, WEB } from '@constants'
import {
  TITLE_ANITABI,
  TITLE_BLOG,
  TITLE_CATALOG,
  TITLE_CHARACTER,
  TITLE_COMIC,
  TITLE_COMMENT,
  TITLE_DISC,
  TITLE_EP,
  TITLE_GAME,
  TITLE_INFO,
  TITLE_LIKE,
  TITLE_RATING,
  TITLE_RECENT,
  TITLE_RELATIONS,
  TITLE_STAFF,
  TITLE_SUMMARY,
  TITLE_TAGS,
  TITLE_THUMBS,
  TITLE_TOPIC
} from '../ds'
import { getOriginConfig } from '../../../user/origin-setting/utils'
import {
  buildCrtKeywords,
  buildKeywords,
  checkIsPS,
  filterDefaultAvatar,
  filterSubjectComments,
  filterUserAvatar,
  findOriginArtist,
  findRelationByType,
  findRelationByTypes,
  getAnimeInfo,
  getAnimeTags,
  getArtist,
  getDuration,
  getEnd,
  getFilterEpsData,
  getGameInfo,
  getGameTags,
  getMangaInfo,
  getMangaTags,
  getOnlineOrigins,
  getRelease,
  getSubjectStatus,
  getValidPlaySources,
  getWenkuInfo,
  getWenkuTags,
  getYear,
  getYearAndMonth,
  getYearAndMonthEnd,
  mapBoardToTopic,
  mapCrt,
  mapFriendsRating,
  mapNames,
  mapPersons,
  mapRelations,
  mapReviewsToBlog,
  mapStaff,
  parseAlias,
  parseGameReleaseDates,
  parseMusicDuration,
  settingTuple
} from './utils'
import State from './state'
import {
  EXCLUDE_STATE,
  INIT_RATING,
  NAMESPACE,
  NON_SHOW,
  TEXT_ACTIONS_MANAGE,
  TEXT_ANI_DB,
  TEXT_GAME_CALENDAR_SUBSCRIBE,
  TEXT_ICS_MANAGE,
  TEXT_MAL,
  TEXT_NETABA,
  TEXT_ORIGINS_MANAGE,
  TEXT_VIB
} from './ds'

import type { Subject, SubjectFromHtmlWhoItem } from '@stores/subject/types'
import type { Collection, Sites, SubjectType, SubjectTypeCn, TranslateResult } from '@types'
import type { Crt, RecDataItem, SubjectCommentValue, TagsItem } from '../types'

export default class Computed extends State {
  /** 本地化 */
  save = () => {
    return this.saveStorage(this.namespace, EXCLUDE_STATE)
  }

  /** 开发调试 */
  log(...arg: any) {
    logger.info(this.namespace, ...arg)
  }

  /** 开发调试 */
  warn(...arg: any) {
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

  /** 原始关联人物数据 */
  @computed get rawCrt() {
    if (this.isSubjectLoaded) {
      return this.subject.crt || []
    }
    return (this.subjectFromOSS.character || []) as Crt[]
  }

  /** 关联人物（映射后） */
  @computed get crt() {
    return freeze(mapCrt(this.rawCrt as any)) as Crt[]
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
      return freeze(mapPersons(data as any))
    }
    return freeze(mapStaff(data as any))
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

  /** 关联数据 (原始) */
  @computed get subjectRelations() {
    if (this.isFormHTMLLoaded) return freeze(this.subjectFormHTML.relations || [])

    return freeze(this.subjectFromOSS.relations || [])
  }

  /** 关联: 前传和续集, 或系列: 若为单行本, relations 第一项则为系列前传 */
  @computed get subjectPrev() {
    return freeze(findRelationByType(this.subjectRelations, '前传'))
  }

  /** 续集 */
  @computed get subjectAfter() {
    return freeze(findRelationByType(this.subjectRelations, '续集'))
  }

  /** 系列 */
  @computed get subjectSeries() {
    return freeze(this.subjectRelations?.[0]?.type === '系列' ? this.subjectRelations[0] : null)
  }

  /** 书籍 */
  @computed get subjectBook() {
    if (!WEB) {
      // 客户端中更加谨慎展示关联书籍数据, 往往越后面越不是本体, 而是衍生
      const index = this.subjectRelations.findIndex(item => item.type === '书籍')
      if (index !== -1 && index <= 3) return this.subjectRelations[index]

      return null
    }

    return freeze(findRelationByType(this.subjectRelations, '书籍'))
  }

  /** 动画化 */
  @computed get subjectAnime() {
    const title = this.titleLabel || ''
    if (!title.includes('系列') && !title.includes('音乐')) return null

    const find = findRelationByTypes(this.subjectRelations, ['动画', '其他'])

    // 部分条目维护不够好, 动画化条目标签为其他, 若日文名字相等都认为是动画化
    if (find?.type === '动画' || (find?.type === '其他' && this.jp.includes(find?.title))) {
      return freeze(find)
    }

    return null
  }

  /** 不同演绎 */
  @computed get subjectDiff() {
    const find = findRelationByTypes(this.subjectRelations, ['不同演绎', '主版本', '主线故事'])
    if (find) return freeze(find)

    if (this.type === '书籍' && this.comic?.length) {
      const item = this.comic[0]
      return {
        id: item.id,
        image: item.image,
        title: item.name,
        type: '单行本',
        url: `${HOST}/subject/${item.id}`
      } as const
    }

    return freeze(findRelationByType(this.subjectRelations, '外传'))
  }

  /** 是否有相关系列 */
  @computed get hasSeries() {
    return !!(
      this.subjectAfter ||
      this.subjectPrev ||
      this.subjectSeries ||
      this.subjectAnime ||
      this.subjectDiff ||
      this.subjectBook
    )
  }

  /** 是否存在在目录中 */
  @computed get catalogIncludes() {
    return usersStore.catalogSubjectCount(this.subjectId)
  }

  /** 是否应该过滤默认头像 */
  @computed get shouldFilterDefault() {
    return systemStore.setting.filterDefault || userStore.isLimit
  }

  /** 过滤后的目录 */
  @computed get filterCatalog() {
    return freeze(filterDefaultAvatar(this.catalog))
  }

  /** 过滤后的日志 */
  @computed get filterBlog() {
    let blog = this.subject.blog || []
    if (this.shouldFilterDefault) {
      blog = filterUserAvatar(blog)
    }

    if (!blog.length) {
      try {
        const reviews = rakuenStore.reviews(this.subjectId)
        if (reviews?.list?.length) {
          blog = mapReviewsToBlog(reviews.list) as typeof blog
        }
      } catch {}
    }

    return freeze(blog) as Subject['blog']
  }

  /** 过滤后的帖子 */
  @computed get filterTopic() {
    let topic = this.subject.topic || []
    if (this.shouldFilterDefault) {
      topic = filterUserAvatar(topic)
    }

    if (!topic.length) {
      try {
        const board = rakuenStore.board(this.subjectId)
        if (board?.list?.length) {
          topic = mapBoardToTopic(board.list, this.subjectId) as typeof topic
        }
      } catch {}
    }

    return freeze(topic)
  }

  /** 过滤后的动态 */
  @computed get filterRecent() {
    return freeze(filterDefaultAvatar(this.subjectFormHTML.who || [])) as SubjectFromHtmlWhoItem[]
  }

  /** 原始好友评分数据 */
  @computed get rawFriendsRating() {
    const { list: doings = [] } = subjectStore.rating(this.subjectId, 'doings', true)
    const { list: collections = [] } = subjectStore.rating(this.subjectId, 'collections', true)
    return { doings, collections }
  }

  /** 好友评分（映射后） */
  @computed get friendsRating() {
    const { doings, collections } = this.rawFriendsRating
    const result = mapFriendsRating(doings, collections, this.action)
    return result.length > 0 ? result : freeze([])
  }

  /** 吐槽数量 */
  @computed get commentLength() {
    const {
      list,
      pagination: { pageTotal = 0 }
    } = this.subjectComments
    return pageTotal <= 1 ? list.length : 20 * (pageTotal >= 2 ? pageTotal - 1 : pageTotal)
  }

  /**
   * 是否显示章节
   *  - 第一个结果为是否显示菜单
   *  - 第二个结果为是否渲染组件
   * */
  @computed get showEp() {
    // 游戏没有 ep
    const show = this.type !== '游戏'
    return [show, show] as const
  }

  /** 是否显示标签 */
  @computed get showTags() {
    return settingTuple(systemStore.setting.showTags)
  }

  /** 是否显示简介 */
  @computed get showSummary() {
    if (this.subject._loaded && !this.summary) return NON_SHOW
    return settingTuple(systemStore.setting.showSummary)
  }

  /** 是否显示预览 */
  @computed get showThumbs() {
    const { showThumbs } = systemStore.setting
    if (showThumbs === -1) return NON_SHOW

    const { epsThumbs, videos } = this.state
    if (!epsThumbs.length && !videos.length) return NON_SHOW

    return [showThumbs === true, true] as const
  }

  /** 是否显示详情 */
  @computed get showInfo() {
    return settingTuple(systemStore.setting.showInfo)
  }

  /** 是否显示游戏 */
  @computed get showGame() {
    if (this.nsfw && userStore.isExtremeLimit) return NON_SHOW

    const { showGameInfo } = systemStore.setting
    if (
      showGameInfo === -1 ||
      (!this.gameInfo?.i &&
        !this.hasExternalScreenshots &&
        !this.state.gameDuration.mainStory &&
        !this.state.gameDuration.vndb)
    ) {
      return NON_SHOW
    }

    return [showGameInfo === true, true] as const
  }

  /** 是否显示评分 */
  @computed get showRating() {
    return settingTuple(systemStore.setting.showRating)
  }

  /** 是否显示角色 */
  @computed get showCharacter() {
    if (!this.crt.length) return NON_SHOW
    return settingTuple(systemStore.setting.showCharacter)
  }

  /** 是否显示制作人员 */
  @computed get showStaff() {
    if (!this.staff.length) return NON_SHOW
    return settingTuple(systemStore.setting.showStaff)
  }

  /** 是否显示取景地标 */
  @computed get showAnitabi() {
    if (!this.state.anitabi.pointsLength) return NON_SHOW
    return settingTuple(systemStore.setting.showAnitabi)
  }

  /** 是否显示关联 */
  @computed get showRelations() {
    if (!this.relations.length) return NON_SHOW
    return settingTuple(systemStore.setting.showRelations)
  }

  /** 是否显示单行本 */
  @computed get showComic() {
    if (!this.comic.length) return NON_SHOW
    return settingTuple(true)
  }

  /** 是否显示目录 */
  @computed get showCalalog() {
    if (!this.filterCatalog.length) return NON_SHOW
    return settingTuple(systemStore.setting.showCatalog)
  }

  /** 是否显示猜你喜欢 */
  @computed get showLike() {
    if (!this.like.length) return NON_SHOW
    return settingTuple(systemStore.setting.showLike)
  }

  /** 是否显示日志 */
  @computed get showBlog() {
    if (!this.filterBlog.length) return NON_SHOW
    return settingTuple(systemStore.setting.showBlog)
  }

  /** 是否显示帖子 */
  @computed get showTopic() {
    if (!this.filterTopic.length) return NON_SHOW
    return settingTuple(systemStore.setting.showTopic)
  }

  /** 是否显示动态 */
  @computed get showRecent() {
    if (!this.filterRecent.length) return NON_SHOW
    return settingTuple(systemStore.setting.showRecent)
  }

  /** 右上角跳转到目标块菜单 */
  @computed get locationDS() {
    const data = [TITLE_COMMENT]
    if (this.showEp[0]) data.push(this.type === '音乐' ? TITLE_DISC : TITLE_EP)
    if (this.showTags[0]) data.push(TITLE_TAGS)
    if (this.showSummary[0]) data.push(TITLE_SUMMARY)
    if (this.showThumbs[0]) {
      const { epsThumbs, videos } = this.state
      data.push(`${TITLE_THUMBS} (${epsThumbs.length + videos.length})`)
    }
    if (this.showInfo[0]) data.push(TITLE_INFO)
    if (this.showGame[0]) data.push(TITLE_GAME)
    if (this.showRating[0]) data.push(TITLE_RATING)
    if (this.showCharacter[0]) data.push(TITLE_CHARACTER)
    if (this.showStaff[0]) data.push(TITLE_STAFF)
    if (this.showAnitabi[0]) data.push(`${TITLE_ANITABI} (${this.state.anitabi.pointsLength})`)
    if (this.showComic[0]) data.push(`${TITLE_COMIC} (${this.comic.length})`)
    if (this.showRelations[0]) data.push(`${TITLE_RELATIONS} (${this.relations.length})`)
    if (this.showCalalog[0]) data.push(`${TITLE_CATALOG} (${this.filterCatalog.length})`)
    if (this.showLike[0]) data.push(`${TITLE_LIKE} (${this.like.length})`)
    if (this.showBlog[0]) data.push(`${TITLE_BLOG} (${this.filterBlog.length})`)
    if (this.showTopic[0]) data.push(`${TITLE_TOPIC} (${this.filterTopic.length})`)
    if (this.showRecent[0]) data.push(`${TITLE_RECENT} (${this.filterRecent.length})`)
    data.push(`${TITLE_COMMENT} (${this.commentLength}+)`)
    return freeze(data)
  }

  /** 锐评 */
  @computed get currentChatValues() {
    return this.state.chat[systemStore.setting.musumePrompt] || []
  }

  /** 是否有自定义跳转 */
  @computed get hasActions() {
    return this.actions.length > 0
  }

  /** 自定义跳转菜单 */
  @computed get actionsData() {
    return [...this.actions.map(item => item.name), TEXT_ACTIONS_MANAGE] as const
  }

  /** 动画、三次元源头菜单 */
  @computed get onlineData() {
    const data = [...this.onlineOrigins, TEXT_ORIGINS_MANAGE]
    if (!this.hasActions) data.push(TEXT_ACTIONS_MANAGE)
    if (systemStore.setting.exportICS) data.push(TEXT_ICS_MANAGE)
    return mapNames(data)
  }

  /** 书籍源头菜单 */
  @computed get comicData() {
    const data = [...this.onlineComicOrigins, TEXT_ORIGINS_MANAGE]
    if (!this.hasActions) data.push(TEXT_ACTIONS_MANAGE)
    return mapNames(data)
  }

  /** 游戏发售日期 */
  @computed get gameReleaseDates() {
    return parseGameReleaseDates(this.type, this.rawInfo)
  }

  /** 游戏源头菜单 */
  @computed get gameData() {
    const data = [...this.onlineGameOrigins, TEXT_ORIGINS_MANAGE]
    if (!this.hasActions) data.push(TEXT_ACTIONS_MANAGE)
    if (systemStore.setting.exportICS && this.gameReleaseDates.length) {
      data.push(TEXT_GAME_CALENDAR_SUBSCRIBE)
    }
    return mapNames(data)
  }

  /** 曲目源头菜单 */
  @computed get discData() {
    const data = [...this.onlineDiscOrigins, TEXT_ORIGINS_MANAGE]
    if (!this.hasActions) data.push(TEXT_ACTIONS_MANAGE)
    return mapNames(data)
  }

  /** VIB 评分透视菜单 */
  @computed get vibData() {
    const data = [TEXT_VIB]
    if (this.vib.anidb) data.push(TEXT_ANI_DB)
    if (this.vib.mal) data.push(TEXT_MAL)
    if (this.type === '动画') data.push(TEXT_NETABA)
    return data
  }

  /** 别名 */
  @computed get alias() {
    return parseAlias(this.rawInfo)
  }

  /** 条目图集关键字 */
  @computed get subjectKeywords() {
    const clean = (s?: string) => (s ? s.replace(/(?:第.*?(?:季|期)|(前|后)篇)$/g, '').trim() : '')
    const base = [this.cn, this.jp, clean(this.cn), ...this.alias, keepBasicChars(this.cn)]
    return buildKeywords(base, 24, 8)
  }

  /** 角色图集关键字 */
  @computed get crtKeywords() {
    return buildCrtKeywords(this.crt, 12, 4)
  }

  /** 吐槽项事件 */
  @computed get itemEvent() {
    return {
      id: '条目.跳转',
      data: {
        from: '吐槽',
        subjectId: this.subjectId
      }
    } as const
  }

  /** 音乐碟播放时长 */
  @computed get musicDuration() {
    return this.rawInfo ? parseMusicDuration(this.rawInfo) : ''
  }

  /** 剧场版、电影时长 */
  @computed get duration() {
    return getDuration(this.titleLabel, this.subject.eps, this.rawInfo)
  }

  /** 原作（按优先级返回，用于源头的可选参数） */
  @computed get originArtist() {
    return this.staff.length ? findOriginArtist(this.staff) : ''
  }
}
