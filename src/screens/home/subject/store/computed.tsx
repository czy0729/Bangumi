/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:26:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-23 05:35:11
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
  subjectStore,
  systemStore,
  userStore,
  usersStore
} from '@stores'
import {
  HTMLDecode,
  asc,
  desc,
  findSubjectCn,
  getOnAir,
  getTimestamp,
  x18,
  removeHTMLTag
} from '@utils'
import { findAnime, ANIME_TAGS } from '@utils/subject/anime'
import { findManga, MANGA_TAGS } from '@utils/subject/manga'
import { findWenku, WENKU_TAGS } from '@utils/subject/wenku'
import { findGame, GAME_CATE } from '@utils/subject/game'
import { findADV } from '@utils/subject/adv'
import { HENTAI_TAGS, findHentai } from '@utils/subject/hentai'
import {
  HOST,
  IMG_HEIGHT_LG,
  IMG_WIDTH_LG,
  MODEL_SUBJECT_TYPE,
  SITES,
  SITES_DS,
  URL_DEFAULT_AVATAR,
  getOTA
} from '@constants'
import { Id, RatingStatus, Sites, SubjectType, SubjectTypeCn } from '@types'
import { getOriginConfig, OriginItem } from '../../../user/origin-setting/utils'
import State from './state'
import { NAMESPACE, INIT_RATING, SORT_RELATION_DESC } from './ds'

export default class Computed extends State {
  /** 条目唯一Id */
  @computed get subjectId() {
    const { subjectId } = this.params
    return subjectId
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
    return getOnAir(
      calendarStore.onAir[this.subjectId],
      calendarStore.onAirUser(this.subjectId)
    )
  }

  /** 屏蔽默认头像用户相关信息 */
  @computed get filterDefault() {
    const { filterDefault } = systemStore.setting
    return filterDefault
  }

  /** 是否显示吐槽 */
  @computed get showComment() {
    const { showComment } = systemStore.setting
    return showComment
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

  /** 用户id */
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
    const subjectComments = subjectStore.subjectComments(this.subjectId)
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
    const { _loaded, type } = this.subject
    if (!_loaded) {
      const { _type = '' } = this.params
      return _type
    }

    return MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
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

  /** @deprecated Ep 偏移 */
  @computed get ningMoeEpOffset() {
    const { eps = [] } = this.subject
    return (
      eps
        .filter(item => item.type === 0)
        .sort((a, b) => asc(a, b, item => item.sort))[0].sort - 1
    )
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
    const { bangumiInfo } = this.state
    const { sites = [] } = bangumiInfo
    sites
      .filter(item => SITES_DS.includes(item.site))
      .forEach(item => {
        data.push(item.site)
      })

    return data
  }

  /** 漫画源头 */
  @computed get onlineComicOrigins() {
    const type = this.titleLabel.includes('小说') ? 'wenku' : 'manga'
    return getOriginConfig(subjectStore.origin, type).filter(item => item.active)
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
      (this.info.includes('PS4') ||
        this.info.includes('PS3') ||
        this.info.includes('PS5'))
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

    if (Array.isArray(this.animeInfo?.t)) {
      return this.animeInfo.t.map(item => ANIME_TAGS[item])
    }
    return []
  }

  /** 第三方 Hentai 标签 */
  @computed get hentaiTags() {
    if (this.type !== '动画' && !this.x18) return null

    const item = findHentai(this.subjectId)
    if (Array.isArray(item?.t)) {
      return item.t.map(item => HENTAI_TAGS[item])
    }
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

    const tags = (this.gameInfo as { ta: number[] })?.ta
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

    // this._wenku = findWenku(this.subjectId)
    // this._manga = findManga(this.subjectId)

    // // 若为单行本则还需要找到系列, 用系列id查询
    // if (this.subjectSeries) {
    //   const { id } = this.subjectSeries
    //   if (!this._manga?.id) this._manga = findManga(id)
    //   if (!this._wenku?.id) this._wenku = findWenku(id)
    // }
    // return {
    //   mangaId: this._manga.mangaId,
    //   wenkuId: this._wenku.wenkuId
    // }
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
      this.info.match(
        /<li><span>(发售日|放送开始|上映年度|上映时间): <\/span>(.+?)<\/li>/
      )?.[2] || ''
    )
  }

  /** 发布时间 (用于显示在 title label) */
  @computed get year() {
    return (
      (
        this.info.match(
          /<li><span>(发售日|放送开始|上映年度|上映时间|开始|发行日期|连载开始): <\/span>(.+?)<\/li>/
        )?.[2] || ''
      ).match(/(\d{4})/)?.[0] || ''
    )
  }

  /** 艺术家 */
  @computed get artist() {
    return removeHTMLTag(
      this.info.match(/<li><span>艺术家: <\/span>(.+?)<\/li>/)?.[1] || ''
    )
  }

  /** 封面图宽度 */
  @computed get imageWidth() {
    return IMG_WIDTH_LG * (_.isPad ? 1.4 : 1.2) * (this.type === '音乐' ? 1.2 : 1)
  }

  /** 封面图高度, 音乐类型条目为正方形 */
  @computed get imageHeight() {
    return this.type === '音乐'
      ? this.imageWidth
      : IMG_HEIGHT_LG * (_.isPad ? 1.4 : 1.2)
  }

  // -------------------- cdn fallback --------------------
  /** 封面占位 */
  @computed get coverPlaceholder() {
    const { _image, _imageForce } = this.params
    return (
      _imageForce ||
      _image ||
      this.subjectFromOSS.image ||
      this.subjectFormCDN.image ||
      this.subject?.images?.medium ||
      ''
    )
  }

  /** 日文名 */
  @computed get jp() {
    const { _jp } = this.params
    return HTMLDecode(
      this.subject.name || _jp || this.subjectFromOSS.name || this.subjectFormCDN.name
    )
  }

  /** 中文名 */
  @computed get cn() {
    const { _cn } = this.params
    return HTMLDecode(
      this.subject.name_cn ||
        _cn ||
        this.subjectFromOSS.name_cn ||
        findSubjectCn(this.jp, this.subjectId)
    )
  }

  /** 网站用户评分 */
  @computed get rating() {
    if (this.subject._loaded) {
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
    if (this.subject._loaded) return this.subject.collection || {}
    return this.subjectFromOSS.collection || this.subjectFormCDN.collection || {}
  }

  /** 章节数据 */
  @computed get eps() {
    if (this.subject._loaded) {
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

  /** 经过计算后传递到 <Eps> 的 data */
  @computed get toEps() {
    const { epsReverse, filterEps } = this.state

    if (filterEps) {
      const eps = this.eps.filter((item, index) => index > filterEps)
      return epsReverse ? eps.slice().reverse() : eps
    }

    return epsReverse ? this.eps.map(item => item).reverse() : this.eps
  }

  /** 音乐曲目数据 */
  @computed get disc() {
    if (this.subjectFormHTML._loaded) return this.subjectFormHTML.disc || []
    if (this.subjectFromOSS.disc?.length) return this.subjectFromOSS.disc || []
    return this.subjectFormCDN.disc || []
  }

  /** 详情 */
  @computed get summary() {
    if (this.subject._loaded) return this.subject.summary
    return (
      this.subjectFromOSS.summary ||
      this.subjectFormCDN.summary ||
      this.params._summary ||
      ''
    )
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
    if (this.subject._loaded) {
      const { crt } = this.subject
      return (crt || []).map(
        ({
          id,
          images = {},
          name,
          name_cn: nameCn,
          role_name: roleName,
          actors = []
        }) => ({
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
    if (this.subject._loaded) {
      const { staff } = this.subject

      /**
       * @fixed
       * 敏感条目不再返回数据, 而旧接口staff也错乱, 改为使用网页的staff数据
       */
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

      return (staff || []).map(
        ({ id, images = {}, name, name_cn: nameCn, jobs = [] }) => ({
          id,
          image: images.grid,
          _image: images?.medium,
          name: nameCn || name,
          nameJP: name,
          desc: jobs[0]
        })
      )
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
    if (this.subject._loaded) {
      data = (this.subjectFormHTML.relations || []).map(
        ({ id, image, title, type }) => ({
          id,
          image,
          name: title,
          desc: type
        })
      )
    } else {
      data = (this.subjectFromOSS.relations || this.subjectFormCDN.relations || []).map(
        item => ({
          id: item.id,
          image: item.image,
          name: item.title,
          desc: item.type
        })
      )
    }

    return data
      .slice()
      .sort((a, b) =>
        desc(SORT_RELATION_DESC[a.desc] || 0, SORT_RELATION_DESC[b.desc] || 0)
      )
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
        this.subjectFormHTML.type ||
        String(bangumiInfo.type).toUpperCase() ||
        label ||
        'TV'
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
    const { bangumiInfo } = this.state
    return bangumiInfo?.sites?.find(item => item.site === 'bilibili') || {}
  }

  /** 爱奇艺放送信息 */
  @computed get iqiyiSite(): {
    site?: Sites
    id?: string
  } {
    const { bangumiInfo } = this.state
    return bangumiInfo?.sites?.find(item => item.site === 'iqiyi') || {}
  }

  /** 优酷放送信息 */
  @computed get youkuSite(): {
    site?: Sites
    id?: string
  } {
    const { bangumiInfo } = this.state
    return bangumiInfo?.sites?.find(item => item.site === 'youku') || {}
  }

  /** 关联数据 (原始) */
  @computed get subjectRelations() {
    const { relations = [], _loaded } = this.subjectFormHTML
    if (_loaded) return relations
    return this.subjectFromOSS.relations || []
  }

  /**
   * 关联: 前传和续集, 或系列: 若为单行本, relations第一项则为系列
   * 前传
   */
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

    const find = this.subjectRelations.find(
      item => item.type === '动画' || item.type === '其他'
    )

    // 部分条目维护不够好, 动画化条目标签为其他, 若日文名字相等都认为是动画化
    if (
      find?.type === '动画' ||
      (find?.type === '其他' && this.jp.includes(find?.title))
    ) {
      return find
    }
    return null
  }

  /** 不同演绎 */
  @computed get subjectDiff() {
    return this.subjectRelations.find(item => item.type === '不同演绎')
  }

  /** @deprecated 高清资源 */
  @computed get hd() {
    const { HD = [] } = getOTA()

    // @ts-expect-error
    if (HD.includes(Number(this.subjectId))) return this.subjectId

    // 若为单行本则还需要找到系列, 用系列id查询
    if (this.subjectSeries) {
      const { id } = this.subjectSeries

      // @ts-expect-error
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
    const { list } = this.catalogs
    let num = 0
    list.forEach(item => {
      const { list } = this.catalogDetail(item.id)
      if (list.some(i => i.id == this.subjectId)) num += 1
    })
    return num
  }
}
