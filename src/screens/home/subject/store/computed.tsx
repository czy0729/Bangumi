/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:26:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-22 08:10:29
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
import {
  asc,
  desc,
  findSubjectCn,
  getOnAir,
  getTimestamp,
  HTMLDecode,
  isArray,
  matchCoverUrl,
  removeHTMLTag,
  x18
} from '@utils'
import { findADV } from '@utils/subject/adv'
import { ANIME_TAGS, findAnime } from '@utils/subject/anime'
import { findGame, GAME_CATE } from '@utils/subject/game'
import { findHentai, HENTAI_TAGS } from '@utils/subject/hentai'
import { findManga, MANGA_TAGS } from '@utils/subject/manga'
import { findWenku, WENKU_TAGS } from '@utils/subject/wenku'
import {
  getOTA,
  HOST,
  IMG_DEFAULT,
  IMG_WIDTH_LG,
  MODEL_SUBJECT_TYPE,
  SITES,
  SITES_DS,
  STORYBOOK,
  URL_DEFAULT_AVATAR
} from '@constants'
import { Id, RatingStatus, Sites, SubjectType, SubjectTypeCn } from '@types'
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
import { getOriginConfig, OriginItem } from '../../../user/origin-setting/utils'
import State from './state'
import { EXCLUDE_STATE, INIT_RATING, NAMESPACE, SORT_RELATION_DESC } from './ds'

export default class Computed extends State {
  save = () => {
    return this.saveStorage(this.namespace, EXCLUDE_STATE)
  }

  /** 条目唯一 id */
  @computed get subjectId() {
    return this.params.subjectId
  }

  /** 页面唯一命名空间 */
  @computed get namespace() {
    return `${NAMESPACE}|${this.subjectId}` as const
  }

  /** 是否敏感条目 */
  @computed get x18() {
    return x18(this.subjectId, this.cn || this.jp)
  }

  /** 用户自定义播放信息 */
  @computed get onAirCustom() {
    return getOnAir(calendarStore.onAir[this.subjectId], calendarStore.onAirUser(this.subjectId))
  }

  /** 屏蔽默认头像用户相关信息 */
  @computed get filterDefault() {
    return systemStore.setting.filterDefault
  }

  /** 是否显示吐槽 */
  @computed get showComment() {
    return systemStore.setting.showComment
  }

  /** 不显示吐槽块的空占位组件 */
  @computed get footerEmptyDataComponent() {
    if (this.showComment === -1) return <View />
    return undefined
  }

  /** bgm 网址 */
  @computed get url() {
    return `${HOST}/subject/${this.subjectId}` as const
  }

  /** 是否登录 */
  @computed get isLogin() {
    return userStore.isLogin
  }

  /** 用户 id */
  @computed get userId() {
    return userStore.userInfo.id
  }

  /** 条目信息 */
  @computed get subject() {
    return subjectStore.subject(this.subjectId)
  }

  /** 条目信息 (来自网页) */
  @computed get subjectFormHTML() {
    return subjectStore.subjectFormHTML(this.subjectId)
  }

  /** 条目 CDN 自维护数据 */
  @computed get subjectFormCDN() {
    return subjectStore.subjectFormCDN(this.subjectId)
  }

  /** 条目云端缓存数据 */
  @computed get subjectFromOSS() {
    return this.state.subject
  }

  /**
   * 条目留言, 筛选逻辑
   *  - 主动设置屏蔽默认头像用户相关信息
   *  - 限制用户群体 (iOS的游客和审核员) 强制屏蔽默认头像用户
   */
  @computed get subjectComments() {
    let subjectComments = subjectStore.subjectComments(this.subjectId)
    if (!subjectComments._loaded && this.state.comments.list?.length) {
      subjectComments = this.state.comments
    }

    if (!this.showComment || this.showComment === -1) {
      const { pageTotal } = subjectComments.pagination
      return {
        list: [],
        pagination: {
          page: pageTotal || 1,
          pageTotal
        },
        _reverse: subjectComments._reverse,
        _loaded: getTimestamp()
      }
    }

    const { filterScores } = this.state
    if (this.filterDefault || userStore.isLimit) {
      return {
        ...subjectComments,
        list: subjectComments.list.filter(item => {
          if (filterScores.length) {
            return (
              !item.avatar.includes(URL_DEFAULT_AVATAR) &&
              Number(item.star) >= Number(filterScores[0]) &&
              Number(item.star) <= Number(filterScores[1])
            )
          }
          return !item.avatar.includes(URL_DEFAULT_AVATAR)
        })
      }
    }

    if (filterScores.length) {
      return {
        ...subjectComments,
        list: subjectComments.list.filter(
          item =>
            Number(item.star) >= Number(filterScores[0]) &&
            Number(item.star) <= Number(filterScores[1])
        )
      }
    }

    return subjectComments
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
    return collectionStore.collection(this.subjectId)
  }

  /** 用户章节记录 */
  @computed get userProgress() {
    return userStore.userProgress(this.subjectId)
  }

  /** 条目类型中文 */
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
    return this.subjectFromOSS.type || this.subjectFormCDN.type
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
    return subjectStore.vib(this.subjectId)
  }

  /** 章节正版播放源 */
  @computed get onlinePlayActionSheetData() {
    const { epsData } = this.state
    const data: (Sites | '取消')[] = []
    SITES.forEach((item: Sites) => {
      if (epsData[item] && Object.keys(epsData[item]).length) {
        data.push(item)
      }
    })
    data.push('取消')
    return data
  }

  /** 条目动作 */
  @computed get action() {
    switch (this.type) {
      case '音乐':
        return '听'
      case '游戏':
        return '玩'
      case '书籍':
        return '读'
      default:
        return '看'
    }
  }

  /** 是否限制用户 (防审核) */
  @computed get isLimit() {
    return userStore.isLimit
  }

  /** 是否网站用户评分 */
  @computed get hideScore() {
    return systemStore.setting.hideScore
  }

  /** 用户自定义源头 */
  @computed get userOrigins() {
    return getOriginConfig(subjectStore.origin, 'anime')
  }

  /** 自定义跳转 */
  @computed get actions() {
    const actions = subjectStore.actions(this.subjectId)
    if (!actions.length) return actions

    return subjectStore
      .actions(this.subjectId)
      .slice()
      .filter(item => item.active)
      .sort((a, b) => desc(a.sort || 0, b.sort || 0))
  }

  /** 动画和三次元源头 */
  @computed get onlineOrigins() {
    const data: (OriginItem | Sites)[] = []

    if (['动画'].includes(this.type)) {
      if (systemStore?.ota?.X18 && this.isLogin) {
        let flagX18: boolean
        if (this.x18) flagX18 = true
        if (!flagX18) {
          flagX18 = this.tags.some(item => item.name.includes('里番'))
        }

        // hanime
        if (flagX18) {
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

    if (['三次元'].includes(this.type)) {
      // real
      getOriginConfig(subjectStore.origin, 'real')
        .filter(item => item.active)
        .forEach(item => {
          data.push(item)
        })
    }

    // bangumi-data
    const { sites = [] } = this.state.bangumiInfo
    sites
      .filter(item => SITES_DS.includes(item.site))
      .forEach(item => {
        data.push(item.site)
      })

    return data
  }

  /** 漫画源头 */
  @computed get onlineComicOrigins() {
    return getOriginConfig(
      subjectStore.origin,
      this.titleLabel.includes('小说') ? 'wenku' : 'manga'
    ).filter(item => item.active)
  }

  /** 音乐源头 */
  @computed get onlineDiscOrigins() {
    return getOriginConfig(subjectStore.origin, 'music').filter(item => item.active)
  }

  /** 游戏源头 */
  @computed get onlineGameOrigins() {
    return getOriginConfig(subjectStore.origin, 'game').filter(item => item.active)
  }

  /** 是否PS游戏, 跳转psnine查看奖杯 */
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
    if (item?.i) return item

    return null
  }

  /** 第三方动画标签 */
  @computed get animeTags() {
    if (!this.animeInfo) return null

    if (isArray(this.animeInfo?.t)) {
      return this.animeInfo.t.map(item => ANIME_TAGS[item]).filter(item => !!item)
    }

    return []
  }

  /** 第三方 Hentai 标签 */
  @computed get hentaiTags() {
    if (this.type !== '动画' && !this.x18) return null

    const item = findHentai(this.subjectId)
    if (isArray(item?.t)) return item.t.map(item => HENTAI_TAGS[item])

    return []
  }

  /** 第三方游戏信息 */
  @computed get gameInfo() {
    if (this.type !== '游戏') return null

    const item = findGame(this.subjectId)
    if (item?.i) {
      return {
        ...item,
        isADV: false
      }
    }

    const adv = findADV(this.subjectId)
    if (adv?.i) {
      return {
        ...adv,
        isADV: true
      }
    }

    return null
  }

  /** 第三方游戏标签 */
  @computed get gameTags() {
    if (!this.gameInfo || this.gameInfo?.isADV) return null

    const tags = (this.gameInfo as { ta: number[] })?.ta || []
    return tags.map(item => GAME_CATE[item])
  }

  /** 第三方漫画信息 */
  @computed get mangaInfo() {
    if (this.type !== '书籍') return null

    const item = findManga(this.subjectId)
    if (item?.i) return item

    return null
  }

  /** 第三方游漫画标签 */
  @computed get mangaTags() {
    if (!this.mangaInfo) return null

    const tags = this.mangaInfo?.b || []
    return tags.map(item => MANGA_TAGS[item])
  }

  /** 第三方文库信息 */
  @computed get wenkuInfo() {
    if (this.type !== '书籍') return null

    const item = findWenku(this.subjectId)
    if (item?.i) return item

    return null
  }

  /** 第三方游文库标签 */
  @computed get wenkuTags() {
    if (!this.wenkuInfo) return null

    const tags = this.wenkuInfo?.j || []
    return tags.map(item => WENKU_TAGS[item])
  }

  /** 漫画或文库是否有源头 */
  @computed get source() {
    if (this.type !== '书籍') return null

    return {
      mangaId: 0,
      wenkuId: 0
    }
  }

  /** 筛选章节构造数据, 每 100 章节一个选项 */
  @computed get filterEpsData() {
    const data = ['从 1 起']
    if (this.eps.length < 100) return data

    const count = Math.floor(this.eps.length / 100)
    for (let i = 1; i <= count; i += 1) data.push(`从 ${i * 100} 开始`)

    return data
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
        text: `总${wish + collect + doing + onHold + dropped}`
      })
    }

    return status
  }

  /** 上映时间 (用于标识未上映) */
  @computed get release() {
    return (
      this.info.match(/<li><span>(发售日|放送开始|上映年度|上映时间): <\/span>(.+?)<\/li>/)?.[2] ||
      ''
    )
  }

  /** 发布时间 (用于显示在 title label) */
  @computed get year() {
    // 连载开始为最优先
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

  /** 发布时间 (用于显示在 title label) */
  @computed get end() {
    // 连载开始为最优先
    const year =
      (this.info.match(/<li><span>(连载结束|结束): <\/span>(.+?)<\/li>/)?.[2] || '').match(
        /(\d{4})/
      )?.[0] || ''
    return year
  }

  /** 艺术家 */
  @computed get artist() {
    return removeHTMLTag(this.info.match(/<li><span>艺术家: <\/span>(.+?)<\/li>/)?.[1] || '')
  }

  /** 封面图宽度 */
  @computed get imageWidth() {
    const ratio = _.isPad ? 1.4 : 1.2
    if (this.type === '音乐') return IMG_WIDTH_LG * ratio * 1.2

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

    return (
      placeholder ||
      this.subjectFromOSS.image ||
      this.subjectFormCDN.image ||
      this.subject?.images?.medium ||
      ''
    )
  }

  /** 日文名 */
  @computed get jp() {
    return HTMLDecode(
      this.subject.name || this.params._jp || this.subjectFromOSS.name || this.subjectFormCDN.name
    )
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
      return {
        ...INIT_RATING,
        ...this.subject.rating
      }
    }

    if (this.subjectFromOSS.rating) {
      return {
        ...INIT_RATING,
        ...this.subjectFromOSS.rating
      }
    }

    if (this.subjectFormCDN._loaded) {
      return {
        ...INIT_RATING,
        ...this.subjectFormCDN.rating
      }
    }

    return INIT_RATING
  }

  /** 是否锁定条目 */
  @computed get lock() {
    if (this.subjectFormHTML._loaded) return this.subjectFormHTML.lock

    return this.subjectFromOSS.lock || this.subjectFormCDN.lock
  }

  /** 各状态评分人数 */
  @computed get subjectCollection() {
    if (this.subject._loaded && this.subject.rating) return this.subject.collection || {}

    return this.subjectFromOSS.collection || this.subjectFormCDN.collection || {}
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

      return eps.slice().sort((a, b) => asc(a, b, item => item.type))
    }

    if (this.subjectFromOSS.eps?.length) return this.subjectFromOSS.eps || []

    return this.subjectFormCDN.eps || []
  }

  /** 经过计算后传递到 Eps 的 data */
  @computed get toEps() {
    if (this.state.filterEps) {
      const eps = this.eps.filter((item, index) => index > this.state.filterEps)
      return this.state.epsReverse ? eps.slice().reverse() : eps
    }

    return this.state.epsReverse ? this.eps.map(item => item).reverse() : this.eps
  }

  /** 音乐曲目数据 */
  @computed get disc() {
    if (this.subjectFormHTML._loaded) return this.subjectFormHTML.disc || []

    if (this.subjectFromOSS.disc?.length) return this.subjectFromOSS.disc || []

    return this.subjectFormCDN.disc || []
  }

  /** 详情 */
  @computed get summary() {
    if (this.subject._loaded && this.subject.rating) return this.subject.summary

    return this.subjectFromOSS.summary || this.subjectFormCDN.summary || this.params._summary || ''
  }

  /** 标签 */
  @computed get tags() {
    const data =
      (this.subjectFormHTML._loaded
        ? this.subjectFormHTML.tags
        : this.subjectFromOSS.tags || this.subjectFormCDN.tags) || []
    return data.filter(item => !!item.name).filter((item, index) => index < 20)
  }

  /** 网页版详情 */
  @computed get info() {
    if (this.subjectFormHTML._loaded) return this.subjectFormHTML.info

    return this.subjectFromOSS.info || this.subjectFormCDN.info || ''
  }

  /** 关联人物 */
  @computed get crt() {
    if (this.subject._loaded && this.subject.rating) {
      return (this.subject.crt || []).map(
        ({ id, images = {}, name, name_cn: nameCn, role_name: roleName, actors = [] }) => ({
          id,
          image: images.grid,
          _image: images?.medium,
          name: nameCn || name,
          nameJP: name,
          desc: actors?.[0]?.name || roleName,
          actorId: actors?.[0]?.id
        })
      )
    }

    return this.subjectFromOSS.character || this.subjectFormCDN.crt || []
  }

  /** 制作人员 */
  @computed get staff() {
    if (this.subject._loaded && this.subject.rating) {
      const { staff } = this.subject

      /** @fixed 敏感条目不再返回数据, 而旧接口 staff 也错乱, 改为使用网页的 staff 数据 */
      if (staff?.[0]?.id == this.subjectId) {
        const persons = monoStore.persons(this.subjectId)
        return persons.list.map(item => ({
          id: item.id.replace('/person/', ''),
          image: item.cover,
          _image: item.cover,
          name: (item.nameCn || item.name).trim(),
          nameJP: item.name.trim(),
          desc: item.position
        }))
      }

      return (staff || []).map(({ id, images = {}, name, name_cn: nameCn, jobs = [] }) => ({
        id,
        image: images.grid,
        _image: images?.medium,
        name: nameCn || name,
        nameJP: name,
        desc: jobs[0]
      }))
    }

    return this.subjectFromOSS.staff || this.subjectFormCDN.staff || []
  }

  /** 关联条目 */
  @computed get relations() {
    let data: {
      id: any
      image: any
      name: any
      desc: any
    }[] = []
    if (this.subject._loaded && this.subject.rating) {
      data = (this.subjectFormHTML.relations || []).map(({ id, image, title, type }) => ({
        id,
        image,
        name: title,
        desc: type
      }))
    } else {
      data = (this.subjectFromOSS.relations || this.subjectFormCDN.relations || []).map(item => ({
        id: item.id,
        image: item.image,
        name: item.title,
        desc: item.type
      }))
    }

    return data
      .slice()
      .sort((a, b) => desc(SORT_RELATION_DESC[a.desc] || 0, SORT_RELATION_DESC[b.desc] || 0))
  }

  /** 单行本 */
  @computed get comic() {
    if (this.subjectFormHTML._loaded) return this.subjectFormHTML.comic || []

    if (this.subjectFromOSS.comic?.length) return this.subjectFromOSS.comic || []

    return this.subjectFormCDN.comic || []
  }

  /** 猜你喜欢 */
  @computed get like() {
    if (this.subjectFormHTML._loaded) return this.subjectFormHTML.like || []

    if (this.subjectFromOSS.like?.length) return this.subjectFromOSS.like || []

    return this.subjectFormCDN.like || []
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
    if (this.subjectFormHTML._loaded) return this.subjectFormHTML.catalog || []

    return this.subjectFromOSS.catalog || []
  }

  /** bilibili 放送信息 */
  @computed get bilibiliSite(): {
    site?: Sites
    id?: string
  } {
    return this.state.bangumiInfo?.sites?.find(item => item.site === 'bilibili') || {}
  }

  /** 爱奇艺放送信息 */
  @computed get iqiyiSite(): {
    site?: Sites
    id?: string
  } {
    return this.state.bangumiInfo?.sites?.find(item => item.site === 'iqiyi') || {}
  }

  /** 优酷放送信息 */
  @computed get youkuSite(): {
    site?: Sites
    id?: string
  } {
    return this.state.bangumiInfo?.sites?.find(item => item.site === 'youku') || {}
  }

  /** 关联数据 (原始) */
  @computed get subjectRelations() {
    if (this.subjectFormHTML._loaded) return this.subjectFormHTML.relations || []

    return this.subjectFromOSS.relations || []
  }

  /** 关联: 前传和续集, 或系列: 若为单行本, relations 第一项则为系列前传 */
  @computed get subjectPrev() {
    return this.subjectRelations.find(item => item.type === '前传')
  }

  /** 续集 */
  @computed get subjectAfter() {
    return this.subjectRelations.find(item => item.type === '续集')
  }

  /** 系列 */
  @computed get subjectSeries() {
    return this.subjectRelations?.[0]?.type === '系列' ? this.subjectRelations[0] : null
  }

  /** 动画化 */
  @computed get subjectAnime() {
    if (!(this.titleLabel || '').includes('系列')) return null

    const find = this.subjectRelations.find(item => item.type === '动画' || item.type === '其他')

    // 部分条目维护不够好, 动画化条目标签为其他, 若日文名字相等都认为是动画化
    if (find?.type === '动画' || (find?.type === '其他' && this.jp.includes(find?.title)))
      return find

    return null
  }

  /** 不同演绎 */
  @computed get subjectDiff() {
    return this.subjectRelations.find(item => item.type === '不同演绎')
  }

  /** 是否有相关系列 */
  @computed get hasSeries() {
    return !!(
      this.subjectAfter ||
      this.subjectPrev ||
      this.subjectSeries ||
      this.subjectAnime ||
      this.subjectDiff
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
    return usersStore.catalogs()
  }

  /** 目录详情 */
  catalogDetail(id: Id) {
    return computed(() => discoveryStore.catalogDetail(id)).get()
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
    if (this.filterDefault || this.isLimit) {
      catalog = catalog.filter(item => !item.avatar.includes(URL_DEFAULT_AVATAR))
    }
    return catalog
  }

  /** 过滤后的日志 */
  @computed get filterBlog() {
    let blog = this.subject.blog || []
    if (this.filterDefault || this.isLimit) {
      blog = blog.filter(item => {
        if (item?.user?.avatar?.small.includes(URL_DEFAULT_AVATAR)) return false
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

    return blog
  }

  /** 过滤后的帖子 */
  @computed get filterTopic() {
    let topic = this.subject.topic || []
    if (this.filterDefault || this.isLimit) {
      topic = topic.filter(item => {
        if (item?.user?.avatar?.small.includes(URL_DEFAULT_AVATAR)) return false
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

    return topic
  }

  /** 过滤后的动态 */
  @computed get filterRecent() {
    let who = this.subjectFormHTML.who || []
    if (this.filterDefault || this.isLimit) {
      who = who.filter(item => !item.avatar.includes(URL_DEFAULT_AVATAR))
    }
    return who
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
    if (this.subject._loaded && !this.summary) return [false, false] as const

    const { showSummary } = systemStore.setting
    return [showSummary === true, showSummary !== -1] as const
  }

  /** 是否显示预览 */
  @computed get showThumbs() {
    if (STORYBOOK) return [false, false] as const

    const { showThumbs } = systemStore.setting
    if (showThumbs === -1) return [false, false] as const

    const { epsThumbs, videos } = this.state
    if (!epsThumbs.length && !videos.length) return [false, false] as const

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
    if (showGameInfo === -1 || !this.gameInfo?.i) {
      return [false, false] as const
    }

    return [showGameInfo === true, true] as const
  }

  /** 是否显示评分 */
  @computed get showRating() {
    const { showRating } = systemStore.setting
    return [showRating === true, showRating !== -1] as const
  }

  /** 是否显示角色 */
  @computed get showCharacter() {
    if (!this.crt.length) return [false, false] as const

    const { showCharacter } = systemStore.setting
    return [showCharacter === true, showCharacter !== -1] as const
  }

  /** 是否显示制作人员 */
  @computed get showStaff() {
    if (!this.staff.length) return [false, false] as const

    const { showStaff } = systemStore.setting
    return [showStaff === true, showStaff !== -1] as const
  }

  /** 是否显示取景地标 */
  @computed get showAnitabi() {
    if (!this.state.anitabi.pointsLength) return [false, false] as const

    const { showAnitabi } = systemStore.setting
    return [showAnitabi === true, showAnitabi !== -1] as const
  }

  /** 是否显示关联 */
  @computed get showRelations() {
    if (!this.relations.length) return [false, false] as const

    const { showRelations } = systemStore.setting
    return [showRelations === true, showRelations !== -1] as const
  }

  /** 是否显示单行本 */
  @computed get showComic() {
    if (!this.comic.length) return [false, false] as const

    return [true, true] as const
  }

  /** 是否显示目录 */
  @computed get showCalalog() {
    const { showCatalog } = systemStore.setting
    if (showCatalog === -1 || !this.filterCatalog.length) return [false, false] as const

    return [showCatalog === true, true] as const
  }

  /** 是否显示猜你喜欢 */
  @computed get showLike() {
    if (!this.like.length) return [false, false] as const

    const { showLike } = systemStore.setting
    return [showLike === true, showLike !== -1] as const
  }

  /** 是否显示日志 */
  @computed get showBlog() {
    const { showBlog } = systemStore.setting
    if (showBlog === -1 || !this.filterBlog.length) return [false, false] as const

    return [showBlog === true, true] as const
  }

  /** 是否显示帖子 */
  @computed get showTopic() {
    const { showTopic } = systemStore.setting
    if (showTopic === -1 || !this.filterTopic.length) return [false, false] as const

    return [showTopic === true, true] as const
  }

  /** 是否显示动态 */
  @computed get showRecent() {
    const { showRecent } = systemStore.setting
    if (showRecent === -1 || !this.filterRecent.length) return [false, false] as const

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
    if (this.showRelations[0]) data.push(`${TITLE_RELATIONS} (${this.relations.length})`)
    if (this.showComic[0]) data.push(`${TITLE_COMIC} (${this.comic.length})`)
    if (this.showCalalog[0]) data.push(`${TITLE_CATALOG} (${this.filterCatalog.length})`)
    if (this.showLike[0]) data.push(`${TITLE_LIKE} (${this.like.length})`)
    if (this.showBlog[0]) data.push(`${TITLE_BLOG} (${this.filterBlog.length})`)
    if (this.showTopic[0]) data.push(`${TITLE_TOPIC} (${this.filterTopic.length})`)
    if (this.showRecent[0]) data.push(`${TITLE_RECENT} (${this.filterRecent.length})`)
    data.push(`${TITLE_COMMENT} (${this.commentLength}+)`)
    return data
  }
}
