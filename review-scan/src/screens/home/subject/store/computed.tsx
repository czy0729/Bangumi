/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:26:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-15 05:33:30
 */
import React from 'react'
import { View } from 'react-native'
import { computed } from 'mobx'
import {
  _,
  calendarStore,
  collectionStore,
  discoveryStore,
  monoStore,
  rakuenStore,
  subjectStore,
  systemStore,
  usersStore,
  userStore
} from '@stores'
import { ON_AIR } from '@stores/calendar/onair'
import {
  asc,
  desc,
  findSubjectCn,
  fixedSubjectInfo,
  freeze,
  getOnAir,
  getTimestamp,
  HTMLDecode,
  isArray,
  keepBasicChars,
  matchCoverUrl,
  pad,
  removeHTMLTag,
  x18
} from '@utils'
import { findADV } from '@utils/subject/adv'
import { ANIME_TAGS, findAnime } from '@utils/subject/anime'
import { findGame, GAME_CATE } from '@utils/subject/game'
import { findManga, MANGA_TAGS } from '@utils/subject/manga'
import { findWenku, WENKU_TAGS } from '@utils/subject/wenku'
import {
  getOTA,
  HOST,
  IMG_DEFAULT,
  IMG_INFO_ONLY,
  IMG_WIDTH_LG,
  MODEL_SUBJECT_TYPE,
  SITES,
  SITES_DS,
  URL_DEFAULT_AVATAR,
  WEB
} from '@constants'
import { Collection, Id, RatingStatus, Sites, SubjectType, SubjectTypeCn } from '@types'
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
import { SubjectCommentValue } from '../types'
import { getOriginConfig, OriginItem } from '../../../user/origin-setting/utils'
import State from './state'
import {
  EXCLUDE_STATE,
  INIT_RATING,
  NAMESPACE,
  NON_SHOW,
  SORT_RELATION_DESC,
  TEXT_ACTIONS_MANAGE,
  TEXT_ANI_DB,
  TEXT_ICS_MANAGE,
  TEXT_MAL,
  TEXT_NETABA,
  TEXT_ORIGINS_MANAGE,
  TEXT_VIB
} from './ds'

export default class Computed extends State {
  /** 本地化 */
  save = () => {
    return this.saveStorage(this.namespace, EXCLUDE_STATE)
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

  /** 不显示吐槽块的空占位组件 */
  @computed get footerEmptyDataComponent() {
    if (systemStore.setting.showComment === -1) return <View />

    return undefined
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

    const { showComment } = systemStore.setting
    if (!showComment || showComment === -1) {
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

    const shouldFilterDefault = systemStore.setting.filterDefault || userStore.isLimit
    const { filterScores } = this.state
    const hasScoreFilter = filterScores.length > 0
    if (!shouldFilterDefault && !hasScoreFilter) return subjectComments

    const filteredList = subjectComments.list.filter(item => {
      // 过滤默认头像
      if (shouldFilterDefault && item.avatar?.includes(URL_DEFAULT_AVATAR)) return false

      // 过滤分数范围
      if (hasScoreFilter) {
        const score = Number(item.star)
        return score >= Number(filterScores[0]) && score <= Number(filterScores[1])
      }

      return true
    })

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
    const { epsData } = this.state

    // 过滤并映射有效的播放源
    const validSources = SITES.filter((item: Sites) => {
      const sourceData = epsData[item]
      return sourceData && Object.keys(sourceData).length > 0
    })

    return [...validSources, '取消']
  }

  /** 条目动作 */
  @computed get action() {
    if (this.type === '音乐') return '听'
    if (this.type === '游戏') return '玩'
    if (this.type === '书籍') return '读'
    return '看'
  }

  /** 用户自定义源头 */
  @computed get userOrigins() {
    return freeze(getOriginConfig(subjectStore.origin, 'anime'))
  }

  /** 自定义跳转 */
  @computed get actions() {
    return freeze(
      subjectStore
        .actions(this.subjectId)
        .slice()
        .filter(item => item.active)
        .sort((a, b) => desc(a.sort || 0, b.sort || 0))
    )
  }

  /** 动画和三次元源头 */
  @computed get onlineOrigins() {
    const data: (OriginItem | Sites)[] = []

    if (this.type === '动画') {
      if (userStore.isLogin) {
        const flag = this.nsfw || this.tags?.some?.(item => item.name?.includes?.('里番'))

        // nsfw
        if (flag) {
          getOriginConfig(subjectStore.origin, 'hanime')
            .filter(item => item.active)
            .forEach(item => {
              data.push(item)
            })
        }
      }

      // anime
      getOriginConfig(subjectStore.origin, 'anime')
        .filter(item => item.active)
        .forEach(item => {
          data.push(item)
        })
    }

    if (this.type === '三次元') {
      // real
      getOriginConfig(subjectStore.origin, 'real')
        .filter(item => item.active)
        .forEach(item => {
          data.push(item)
        })
    }

    if (systemStore.setting.showLegalSource) {
      // bangumi-data
      const { sites = [] } = this.state.bangumiInfo
      sites
        .filter(item => SITES_DS.includes(item.site))
        .forEach(item => {
          data.push(item.site)
        })
    }

    return freeze(data)
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
    return (
      this.type === '游戏' &&
      (this.info.includes('PS4') || this.info.includes('PS3') || this.info.includes('PS5'))
    )
  }

  /** 第三方动画信息 */
  @computed get animeInfo() {
    if (this.type !== '动画') return null

    const item = findAnime(this.subjectId)
    if (item?.i) return freeze(item)

    return null
  }

  /** 第三方动画标签 */
  @computed get animeTags() {
    const calendarInfo = ON_AIR[this.subjectId]
    if (!this.animeInfo && !calendarInfo) return null

    let animeInfoTags: string[]
    if (isArray(this.animeInfo?.t)) {
      animeInfoTags = this.animeInfo.t.map(item => ANIME_TAGS[item]).filter(item => !!item)
    }
    if (!animeInfoTags && !calendarInfo) return null

    const tags: {
      pressable: boolean
      value: string
    }[] = []
    const exist = {}
    if (animeInfoTags) {
      animeInfoTags.forEach(item => {
        tags.push({
          pressable: true,
          value: item
        })
        exist[item] = true
      })
    }

    if (calendarInfo) {
      if (!exist[calendarInfo.type]) {
        tags.push({
          pressable: false,
          value: calendarInfo.type
        })
      }

      calendarInfo.origin.split('/').forEach((item: string) => {
        if (!exist[item]) {
          tags.push({
            pressable: false,
            value: item
          })
        }
      })

      calendarInfo.tag.split('/').forEach((item: string) => {
        if (!exist[item]) {
          tags.push({
            pressable: false,
            value: item
          })
        }
      })
    }

    return freeze(tags)
  }

  /** 第三方游戏信息 */
  @computed get gameInfo() {
    if (this.type !== '游戏') return null

    const item = findGame(this.subjectId)
    if (item?.i) {
      return freeze({
        ...item,
        isADV: false
      })
    }

    const adv = findADV(this.subjectId)
    if (adv?.i) {
      return freeze({
        ...adv,
        isADV: true
      })
    }

    return null
  }

  /** 第三方游戏标签 */
  @computed get gameTags() {
    if (!this.gameInfo || this.gameInfo?.isADV) return null

    // @ts-expect-error
    const tags: any[] = this.gameInfo?.ta || []
    return freeze(tags.map(item => GAME_CATE[item]))
  }

  /** 第三方漫画信息 */
  @computed get mangaInfo() {
    if (this.type !== '书籍') return null

    const item = findManga(this.subjectId)
    if (item?.i) return freeze(item)

    return null
  }

  /** 第三方游漫画标签 */
  @computed get mangaTags() {
    if (!this.mangaInfo) return null

    const tags = this.mangaInfo?.b || []
    return freeze(tags.map(item => MANGA_TAGS[item]))
  }

  /** 第三方文库信息 */
  @computed get wenkuInfo() {
    if (this.type !== '书籍') return null

    const item = findWenku(this.subjectId)
    if (item?.i) return freeze(item)

    return null
  }

  /** 第三方游文库标签 */
  @computed get wenkuTags() {
    if (!this.wenkuInfo) return null

    const tags = this.wenkuInfo?.j || []
    return freeze(tags.map(item => WENKU_TAGS[item]))
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
    const data = ['从 1 起']
    if (this.eps.length < 100) return freeze(data)

    const count = Math.floor(this.eps.length / 100)
    for (let i = 1; i <= count; i += 1) data.push(`从 ${i * 100} 开始`)
    return freeze(data)
  }

  /** 全站人员状态数字 */
  @computed get status() {
    const {
      wish = 0,
      collect = 0,
      doing = 0,
      on_hold: onHold = 0,
      dropped = 0
    } = this.subjectCollection
    const status: {
      status: '' | RatingStatus
      text: string
      sum?: number
    }[] = []

    if (wish) {
      status.push({
        status: 'wishes',
        text: `${wish}想${this.action}`
      })
    }

    if (collect) {
      status.push({
        status: 'collections',
        text: `${collect}${this.action}过`
      })
    }

    if (doing) {
      status.push({
        status: 'doings',
        text: `${doing}在${this.action}`
      })
    }

    if (onHold) {
      status.push({
        status: 'on_hold',
        text: `${onHold}搁置`
      })
    }

    if (dropped) {
      status.push({
        status: 'dropped',
        text: `${dropped}抛弃`
      })
    }

    const sum = wish + collect + doing + onHold + dropped
    if (sum) {
      status.push({
        status: '',
        text: `总${sum}`,
        sum
      })
    }
    return freeze(status)
  }

  /** 上映时间 (用于标识未上映) */
  @computed get release() {
    return (
      this.info.match(/<li><span>(发售日|放送开始|上映年度|上映时间): <\/span>(.+?)<\/li>/)?.[2] ||
      ''
    )
  }

  /** 发布时间 (年) */
  @computed get year() {
    // 漫画的详情通常包含发售日、连载开始，以连载开始为最优
    const year =
      (this.info.match(/<li><span>(连载开始|开始): <\/span>(.+?)<\/li>/)?.[2] || '').match(
        /(\d{4})/
      )?.[0] || ''
    if (year) return year

    return (
      (
        this.info.match(
          /<li><span>(发售日|发售日期|放送开始|上映年度|上映时间|发行日期): <\/span>(.+?)<\/li>/
        )?.[2] || ''
      ).match(/(\d{4})/)?.[0] || ''
    )
  }

  /** 发布时间 (年-月) */
  @computed get yearAndMount() {
    try {
      const pattern: RegExp = /(\d{4}[-年]\d{1,2})/

      // 漫画的详情通常包含发售日、连载开始，以连载开始为最优
      const temp =
        (this.info.match(/<li><span>(连载开始|开始): <\/span>(.+?)<\/li>/)?.[2] || '').match(
          pattern
        )?.[0] ||
        (
          this.info.match(
            /<li><span>(发售日|发售日期|放送开始|上映年度|上映时间|发行日期): <\/span>(.+?)<\/li>/
          )?.[2] || ''
        ).match(pattern)?.[0] ||
        ''
      if (!temp) return this.year

      return temp
        .replace('年', '-')
        .split('-')
        .map(item => pad(Number(item)))
        .join('-')
    } catch (error) {
      return this.year
    }
  }

  /** 结束时间 (年) */
  @computed get end() {
    const year =
      (this.info.match(/<li><span>(连载结束|结束): <\/span>(.+?)<\/li>/)?.[2] || '').match(
        /(\d{4})/
      )?.[0] || ''
    return year
  }

  /** 结束时间 (年-月) */
  @computed get yearAndMountEnd() {
    try {
      const pattern: RegExp = /(\d{4}[-年]\d{1,2})/
      const temp =
        (this.info.match(/<li><span>(连载结束|结束): <\/span>(.+?)<\/li>/)?.[2] || '').match(
          pattern
        )?.[0] || ''
      if (!temp) return this.end

      return temp
        .replace('年', '-')
        .split('-')
        .map(item => pad(Number(item)))
        .join('-')
    } catch (error) {
      return this.end
    }
  }

  /** 艺术家 */
  @computed get artist() {
    return removeHTMLTag(this.info.match(/<li><span>艺术家: <\/span>(.+?)<\/li>/)?.[1] || '')
  }

  /** 封面图宽度 */
  @computed get imageWidth() {
    const ratio = _.isPad ? 1.4 : 1.2
    if (this.type === '音乐') {
      return Math.floor(Math.min(IMG_WIDTH_LG * ratio * 1.4, _.window.contentWidth / 2))
    }

    return (IMG_WIDTH_LG + 16) * ratio
  }

  /** 封面图高度, 音乐类型条目为正方形 */
  @computed get imageHeight() {
    if (this.type === '音乐') return this.imageWidth

    return this.imageWidth * 1.4
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
    if (this.subject._loaded && this.subject.rating) {
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
    if (this.subjectFormHTML._loaded) return this.subjectFormHTML.lock

    return this.subjectFromOSS.lock
  }

  /** 各状态评分人数 */
  @computed get subjectCollection() {
    if (this.subject._loaded && this.subject.rating) {
      return freeze((this.subject.collection || {}) as Collection)
    }

    return freeze((this.subjectFromOSS.collection || {}) as Collection)
  }

  /** 章节数据 */
  @computed get eps() {
    if (this.subject._loaded && this.subject.rating) {
      const eps = this.subject.eps || []
      if (eps.length >= 1000) {
        return [...eps, ...subjectStore.epV2(this.subject.id).list].sort((a, b) =>
          asc(a, b, item => item.type)
        )
      }

      return freeze(eps.slice().sort((a, b) => asc(a, b, item => item.type)))
    }

    return freeze(this.subjectFromOSS.eps || [])
  }

  /** 经过计算后传递到 Eps 的 data */
  @computed get toEps() {
    if (this.state.filterEps) {
      const eps = this.eps.filter((_item, index) => index > this.state.filterEps)
      return freeze(this.state.epsReverse ? eps.slice().reverse() : eps)
    }

    return freeze(this.state.epsReverse ? this.eps.map(item => item).reverse() : this.eps)
  }

  /** 音乐曲目数据 */
  @computed get disc() {
    if (this.subjectFormHTML._loaded) return freeze(this.subjectFormHTML.disc || [])

    return freeze(this.subjectFromOSS.disc || [])
  }

  /** 详情 */
  @computed get summary() {
    if (this.subject._loaded && this.subject.rating) return this.subject.summary

    return this.subjectFromOSS.summary || ''
  }

  /** 标签 */
  @computed get tags() {
    const value =
      (this.subjectFormHTML._loaded ? this.subjectFormHTML.tags : this.subjectFromOSS.tags) || []
    return freeze(value.some(item => !item.name) ? value.filter(item => !!item.name) : value)
  }

  /** 网页版详情 */
  @computed get rawInfo() {
    return (
      (this.subjectFormHTML._loaded ? this.subjectFormHTML.info : this.subjectFromOSS.info) || ''
    )
  }

  /** 网页版详情处理后 */
  @computed get info() {
    return fixedSubjectInfo(this.rawInfo)
  }

  /** 关联人物 */
  @computed get crt() {
    if (this.subject._loaded && this.subject.rating) {
      return freeze(
        (this.subject.crt || []).map(
          ({ id, images = {}, name, name_cn: nameCn, role_name: roleName, actors = [] }) => ({
            id,
            image: images?.grid || IMG_INFO_ONLY,
            _image: images?.medium || IMG_INFO_ONLY,
            name: nameCn || name,
            nameJP: name,
            desc: actors?.[0]?.name || roleName,
            roleName,
            actorId: actors?.[0]?.id
          })
        )
      )
    }

    return freeze(this.subjectFromOSS.character || [])
  }

  /** 制作人员 */
  @computed get staff() {
    if (this.subject._loaded && this.subject.rating) {
      const { staff } = this.subject

      /** @fixed 敏感条目不再返回数据, 而旧接口 staff 也错乱, 改为使用网页的 staff 数据 */
      if (staff?.[0]?.id == this.subjectId) {
        return freeze(
          monoStore.persons(this.subjectId).list.map(item => ({
            id: item.id.replace('/person/', ''),
            image: item.cover || IMG_INFO_ONLY,
            _image: item.cover || IMG_INFO_ONLY,
            name: (item.nameCn || item.name).trim(),
            nameJP: item.name.trim(),
            desc: item.position
          }))
        )
      }

      return freeze(
        (staff || []).map(({ id, images = {}, name, name_cn: nameCn, jobs = [] }) => ({
          id,
          image: images?.grid || IMG_INFO_ONLY,
          _image: images?.medium || IMG_INFO_ONLY,
          name: nameCn || name,
          nameJP: name,
          desc: jobs[0]
        }))
      )
    }

    return freeze(this.subjectFromOSS.staff || [])
  }

  /** 关联条目 */
  @computed get relations() {
    const relations =
      this.subject._loaded && this.subject.rating
        ? this.subjectFormHTML.relations || []
        : this.subjectFromOSS.relations || []
    return freeze(
      relations
        .map(item => ({
          id: item.id,
          image: item.image,
          name: item.title,
          desc: item.type
        }))
        .sort((a, b) => desc(SORT_RELATION_DESC[a.desc] || 0, SORT_RELATION_DESC[b.desc] || 0))
    )
  }

  /** 单行本 */
  @computed get comic() {
    if (this.subjectFormHTML._loaded) return freeze(this.subjectFormHTML.comic || [])

    return freeze(this.subjectFromOSS.comic || [])
  }

  /** 猜你喜欢 */
  @computed get like() {
    if (this.subjectFormHTML._loaded) return freeze(this.subjectFormHTML.like || [])

    return freeze(this.subjectFromOSS.like || [])
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
    if (this.subjectFormHTML._loaded) return freeze(this.subjectFormHTML.catalog || [])

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
    if (this.subjectFormHTML._loaded) return freeze(this.subjectFormHTML.relations || [])

    return freeze(this.subjectFromOSS.relations || [])
  }

  /** 关联: 前传和续集, 或系列: 若为单行本, relations 第一项则为系列前传 */
  @computed get subjectPrev() {
    return freeze(this.subjectRelations.find(item => item.type === '前传'))
  }

  /** 续集 */
  @computed get subjectAfter() {
    return freeze(this.subjectRelations.find(item => item.type === '续集'))
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

    return freeze(this.subjectRelations.find(item => item.type === '书籍'))
  }

  /** 动画化 */
  @computed get subjectAnime() {
    if (!(this.titleLabel || '').includes('系列')) return null

    const find = this.subjectRelations.find(item => item.type === '动画' || item.type === '其他')

    // 部分条目维护不够好, 动画化条目标签为其他, 若日文名字相等都认为是动画化
    if (find?.type === '动画' || (find?.type === '其他' && this.jp.includes(find?.title))) {
      return freeze(find)
    }

    return null
  }

  /** 不同演绎 */
  @computed get subjectDiff() {
    let find = this.subjectRelations.find(item => item.type === '不同演绎')
    if (find) return freeze(find)

    find = this.subjectRelations.find(item => item.type === '主版本')
    if (find) return freeze(find)

    find = this.subjectRelations.find(item => item.type === '主线故事')
    if (find) return freeze(find)

    find = this.subjectRelations.find(item => item.type === '外传')
    if (find) return freeze(find)

    return null
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

  /** @deprecated 高清资源 */
  @computed get hd() {
    const { HD = [] } = getOTA()
    if (HD.includes(Number(this.subjectId))) return this.subjectId

    // 若为单行本则还需要找到系列, 用系列id查询
    if (this.subjectSeries) {
      const { id } = this.subjectSeries
      if (HD.includes(Number(id))) return id
    }

    return false
  }

  /** 计算本条目存在在多少个自己创建的目录里面 */
  @computed get catalogs() {
    return freeze(usersStore.catalogs())
  }

  /** 目录详情 */
  catalogDetail(id: Id) {
    return freeze(computed(() => discoveryStore.catalogDetail(id)).get())
  }

  /** 是否存在在目录中 */
  @computed get catalogIncludes() {
    let num = 0
    this.catalogs.list.forEach(item => {
      if (this.catalogDetail(item.id).list.some(i => i.id == this.subjectId)) num += 1
    })
    return num
  }

  /** 过滤后的目录 */
  @computed get filterCatalog() {
    let catalog = this.catalog
    if (systemStore.setting.filterDefault || userStore.isLimit) {
      catalog = catalog.filter(item => !item.avatar?.includes?.(URL_DEFAULT_AVATAR))
    }
    return freeze(catalog)
  }

  /** 过滤后的日志 */
  @computed get filterBlog() {
    let blog = this.subject.blog || []
    if (systemStore.setting.filterDefault || userStore.isLimit) {
      blog = blog.filter(item => {
        if (item?.user?.avatar?.small?.includes?.(URL_DEFAULT_AVATAR)) return false
        return true
      })
    }

    if (!blog.length) {
      try {
        const reviews = rakuenStore.reviews(this.subjectId)
        if (reviews?.list?.length) {
          // @ts-ignore
          blog = reviews.list.map(item => ({
            dateline: item.time,
            id: Number(item.id),
            image: '',
            replies: Number(item.replies.replace('+', '') || 0),
            summary: item.content,
            timestamp: getTimestamp(item.time),
            title: item.title,
            url: `//bgm.tv/blog/${item.id}`,
            user: {
              avatar: {
                large: item.avatar,
                medium: item.avatar,
                small: item.avatar
              },
              id: item.userId,
              nickname: item.userName,
              sign: '',
              url: `//bgm.tv/user/${item.userId}`,
              username: item.userId
            }
          }))
        }
      } catch (error) {}
    }

    return freeze(blog)
  }

  /** 过滤后的帖子 */
  @computed get filterTopic() {
    let topic = this.subject.topic || []
    if (systemStore.setting.filterDefault || userStore.isLimit) {
      topic = topic.filter(item => {
        if (item?.user?.avatar?.small?.includes?.(URL_DEFAULT_AVATAR)) return false
        return true
      })
    }

    if (!topic.length) {
      try {
        const board = rakuenStore.board(this.subjectId)
        if (board?.list?.length) {
          // @ts-ignore
          topic = board.list.map(item => ({
            id: Number(item.href.replace('/subject/topic/', '')),
            lastpost: 0,
            main_id: this.subjectId,
            replies: Number(item.replies.replace(' replies', '')),
            timestamp: getTimestamp(item.time),
            title: item.title,
            url: item.href,
            user: {
              avatar: {
                large: '',
                medium: '',
                small: ''
              },
              id: item.userId,
              nickname: item.userName,
              sign: '',
              url: `//bgm.tv/user/${item.userId}`,
              username: item.userId
            }
          }))
        }
      } catch (error) {}
    }

    return freeze(topic)
  }

  /** 过滤后的动态 */
  @computed get filterRecent() {
    let who = this.subjectFormHTML.who || []
    if (systemStore.setting.filterDefault || userStore.isLimit) {
      who = who.filter(item => !item.avatar?.includes?.(URL_DEFAULT_AVATAR))
    }
    return freeze(who)
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
    const { showTags } = systemStore.setting
    return [showTags === true, showTags !== -1] as const
  }

  /** 是否显示简介 */
  @computed get showSummary() {
    if (this.subject._loaded && !this.summary) return NON_SHOW

    const { showSummary } = systemStore.setting
    return [showSummary === true, showSummary !== -1] as const
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
    const { showInfo } = systemStore.setting
    return [showInfo === true, showInfo !== -1] as const
  }

  /** 是否显示游戏 */
  @computed get showGame() {
    const { showGameInfo } = systemStore.setting
    if (showGameInfo === -1 || !this.gameInfo?.i) return NON_SHOW

    return [showGameInfo === true, true] as const
  }

  /** 是否显示评分 */
  @computed get showRating() {
    const { showRating } = systemStore.setting
    return [showRating === true, showRating !== -1] as const
  }

  /** 是否显示角色 */
  @computed get showCharacter() {
    if (!this.crt.length) return NON_SHOW

    const { showCharacter } = systemStore.setting
    return [showCharacter === true, showCharacter !== -1] as const
  }

  /** 是否显示制作人员 */
  @computed get showStaff() {
    if (!this.staff.length) return NON_SHOW

    const { showStaff } = systemStore.setting
    return [showStaff === true, showStaff !== -1] as const
  }

  /** 是否显示取景地标 */
  @computed get showAnitabi() {
    if (!this.state.anitabi.pointsLength) return NON_SHOW

    const { showAnitabi } = systemStore.setting
    return [showAnitabi === true, showAnitabi !== -1] as const
  }

  /** 是否显示关联 */
  @computed get showRelations() {
    if (!this.relations.length) return NON_SHOW

    const { showRelations } = systemStore.setting
    return [showRelations === true, showRelations !== -1] as const
  }

  /** 是否显示单行本 */
  @computed get showComic() {
    if (!this.comic.length) return NON_SHOW

    return [true, true] as const
  }

  /** 是否显示目录 */
  @computed get showCalalog() {
    const { showCatalog } = systemStore.setting
    if (showCatalog === -1 || !this.filterCatalog.length) return NON_SHOW

    return [showCatalog === true, true] as const
  }

  /** 是否显示猜你喜欢 */
  @computed get showLike() {
    if (!this.like.length) return NON_SHOW

    const { showLike } = systemStore.setting
    return [showLike === true, showLike !== -1] as const
  }

  /** 是否显示日志 */
  @computed get showBlog() {
    const { showBlog } = systemStore.setting
    if (showBlog === -1 || !this.filterBlog.length) return NON_SHOW

    return [showBlog === true, true] as const
  }

  /** 是否显示帖子 */
  @computed get showTopic() {
    const { showTopic } = systemStore.setting
    if (showTopic === -1 || !this.filterTopic.length) return NON_SHOW

    return [showTopic === true, true] as const
  }

  /** 是否显示动态 */
  @computed get showRecent() {
    const { showRecent } = systemStore.setting
    if (showRecent === -1 || !this.filterRecent.length) return NON_SHOW

    return [showRecent === true, true] as const
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

  @computed get currentChatValues() {
    return this.state.chat[systemStore.setting.musumePrompt] || []
  }

  /** 自定义跳转菜单 */
  @computed get actionsData() {
    return [...this.actions.map(item => item.name), TEXT_ACTIONS_MANAGE] as const
  }

  /** 动画、三次元源头菜单 */
  @computed get onlineData() {
    const data = [...this.onlineOrigins, TEXT_ORIGINS_MANAGE]
    if (!this.actions.length) data.push(TEXT_ACTIONS_MANAGE)
    if (systemStore.setting.exportICS) data.push(TEXT_ICS_MANAGE)
    return data.map(item => (typeof item === 'object' ? item.name : item))
  }

  /** 书籍源头菜单 */
  @computed get comicData() {
    const data = [...this.onlineComicOrigins, TEXT_ORIGINS_MANAGE]
    if (!this.actions.length) data.push(TEXT_ACTIONS_MANAGE)
    return data.map(item => (typeof item === 'object' ? item.name : item))
  }

  /** 游戏源头菜单 */
  @computed get gameData() {
    const data = [...this.onlineGameOrigins, TEXT_ORIGINS_MANAGE]
    if (!this.actions.length) data.push(TEXT_ACTIONS_MANAGE)
    return data.map(item => (typeof item === 'object' ? item.name : item))
  }

  /** 曲目源头菜单 */
  @computed get discData() {
    const data = [...this.onlineDiscOrigins, TEXT_ORIGINS_MANAGE]
    if (!this.actions.length) data.push(TEXT_ACTIONS_MANAGE)
    return data.map(item => (typeof item === 'object' ? item.name : item))
  }

  /** VIB 评分透视菜单 */
  @computed get vibData() {
    const data = [TEXT_VIB]
    if (this.vib.anidb) data.push(TEXT_ANI_DB)
    if (this.vib.mal) data.push(TEXT_MAL)
    if (this.type === '动画') data.push(TEXT_NETABA)
    return data
  }

  /** 条目图集关键字 */
  @computed get subjectKeywords() {
    return [...new Set([this.cn, this.jp, keepBasicChars(this.cn)])]
      .filter(Boolean)
      .filter(item => item.length < 12)
  }

  /** 角色图集关键字 */
  @computed get crtKeywords() {
    const temp: string[] = []
    this.crt
      .filter(
        // @ts-ignore
        item => item.roleName === '主角'
      )
      .forEach(item => {
        // @ts-ignore
        temp.push(item.name || item.nameJP)
      })
    return [...new Set(temp)].filter(Boolean).filter(item => item.length < 12)
  }
}
