/*
 * 条目
 * @Params: { _jp, _cn, _image, _imageForce, _summary, _type,
 *            _collection, _rating,
 *            _aid, _wid, _hid }
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-21 06:09:34
 */
import React from 'react'
import { View } from 'react-native'
import { observable, computed } from 'mobx'
import bangumiData from '@constants/json/thirdParty/bangumiData.min.json'
import {
  _,
  collectionStore,
  calendarStore,
  discoveryStore,
  subjectStore,
  systemStore,
  userStore,
  usersStore
} from '@stores'
import { open, copy, getTimestamp, similar } from '@utils'
import { HTMLDecode, HTMLTrim, cheerio } from '@utils/html'
import { t, xhrCustom, queue, baiduTranslate } from '@utils/fetch'
import {
  appNavigate,
  findSubjectCn,
  getBangumiUrl,
  getCoverMedium,
  cnjp,
  unzipBangumiData,
  x18
} from '@utils/app'
import store from '@utils/store'
import { feedback, info, showActionSheet, loading } from '@utils/ui'
import { find as findAnime } from '@utils/subject/anime'
import { find as findManga } from '@utils/subject/manga'
import { find as findWenku } from '@utils/subject/wenku'
import { find as findGame } from '@utils/subject/game'
import { find as findHentai } from '@utils/subject/hentai'
import { s2t } from '@utils/thirdParty/cn-char'
import {
  HOST,
  HOST_NING_MOE,
  URL_DEFAULT_AVATAR,
  SITES,
  SITES_DS,
  IMG_WIDTH,
  IMG_HEIGHT
} from '@constants'
import { CDN_EPS, getOTA } from '@constants/cdn'
import { MODEL_SUBJECT_TYPE, MODEL_EP_STATUS } from '@constants/model'
import {
  SITE_77MH,
  SITE_AGEFANS,
  SITE_MANGABZ,
  SITE_MANHUA1234,
  SITE_MANHUADB,
  SITE_RRYS,
  SITE_WK8,
  SITE_WNACG,
  SITE_XUNBO
} from '@constants/site'
// import { NINGMOE_ID } from '@constants/online'

const namespace = 'ScreenSubject'
const initRating = {
  count: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 },
  score: '',
  total: ''
}
const excludeState = {
  visible: false, // 是否显示管理模态框
  folder: false, // 是否显示目录管理模态框
  showHeaderTitle: false,
  rendered: false,

  chap: '', // 书籍章
  vol: '', // 卷
  translateResult: [], // 翻译缓存
  discTranslateResult: [] // 曲目名字翻译缓存
}

export default class ScreenSubject extends store {
  state = observable({
    ...excludeState,
    epsReverse: false, // 章节是否倒序
    watchedEps: '', // 普通条目章节
    filterEps: 0, // 筛选章节的开头
    filterScores: [], // 吐槽分数分组
    bangumiInfo: {
      sites: [], // 动画在线地址
      type: '' // 动画类型
    },

    // 播放源
    epsData: {
      _loaded: false
    },

    // 缩略图
    epsThumbs: [],
    epsThumbsHeader: {},
    _loaded: false
  })

  init = async () => {
    // 是否需要更新数据
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - _loaded > 60

    try {
      const state = (await this.getStorage(undefined, this.namespace)) || {}
      this.setState({
        ...state,
        ...excludeState,
        epsThumbs: [],

        _loaded: needFetch ? current : _loaded
      })

      if (needFetch) {
        return this.onHeaderRefresh()
      }

      return true
    } catch (error) {
      warn('Subject', 'init', error)

      this.setState({
        ...excludeState,
        _loaded: needFetch ? current : _loaded
      })
      return true
    }
  }

  /**
   * 访问私有cdn, 加速未缓存条目首屏数据渲染
   */
  onHeaderRefresh = async () => {
    // 因为有cdn, 下面2个用户相关的接口可以提前
    this.fetchSubjectFormCDN()
    this.fetchCollection() // 用户每集收看进度
    userStore.fetchUserProgress(this.subjectId) // 用户收藏状态

    // API条目信息
    const res = this.fetchSubject()
    const data = await res

    // bangumi-data数据扩展
    const item = bangumiData.find(
      item =>
        item.id == this.subjectId ||
        item.j === HTMLDecode(data.name) ||
        item.c === HTMLDecode(data.name)
    )

    if (item) {
      const _item = unzipBangumiData(item)
      this.setState({
        bangumiInfo: {
          sites: _item.sites,
          type: _item.type
        }
      })

      setTimeout(() => {
        this.fetchEpsThumbs(_item)
      }, 0)
    }

    queue([
      () => this.fetchSubjectComments(true), // 吐槽
      () => this.fetchSubjectFormHTML(), // 条目API没有的网页额外数据
      () => this.fetchEpsData() // 单集播放源
    ])

    if ((!item && this.type === '动画') || this.type === '三次元') {
      this.fetchEpsThumbsFromDouban(this.cn, this.jp)
    }

    return res
  }

  // -------------------- fetch --------------------
  /**
   * 条目信息
   */
  fetchSubject = () => subjectStore.fetchSubject(this.subjectId)

  /**
   * 网页的条目信息,
   * 书籍只有网页端有数据源, 需要初始值
   */
  fetchSubjectFormHTML = async () => {
    const res = subjectStore.fetchSubjectFormHTML(this.subjectId)
    const { watchedEps, book } = await res
    this.setState({
      watchedEps: watchedEps || '0',
      chap: book.chap || '0',
      vol: book.vol || '0'
    })
    return res
  }

  /**
   * 私有CDN的条目信息
   */
  fetchSubjectFormCDN = async () => {
    const { setting } = systemStore
    const { _loaded } = this.subjectFormHTML
    if (!setting.cdn || _loaded) return true
    return subjectStore.fetchSubjectFormCDN(this.subjectId)
  }

  /**
   * 用户收藏信息
   */
  fetchCollection = () => collectionStore.fetchCollection(this.subjectId)

  /**
   * 条目留言
   */
  fetchSubjectComments = (refresh, reverse) =>
    subjectStore.fetchSubjectComments({ subjectId: this.subjectId }, refresh, reverse)

  /**
   * 获取单集播放源
   */
  fetchEpsData = async () => {
    if (this.type === '动画') {
      try {
        const { _response } = await xhrCustom({
          url: CDN_EPS(this.subjectId)
        })

        const epsData = {
          _loaded: getTimestamp()
        }
        SITES.forEach(item => (epsData[item] = {}))
        JSON.parse(_response).eps.forEach((item, index) => {
          item.sites.forEach(i => {
            if (SITES.includes(i.site)) {
              epsData[i.site][index] = i.url
            }
          })
        })
        this.setState({
          epsData
        })
        this.setStorage(undefined, undefined, this.namespace)
      } catch (error) {
        warn(namespace, 'fetchEpsData', error)
      }
    }
  }

  /**
   * 获取章节的缩略图
   */
  fetchEpsThumbs = async bangumiData => {
    try {
      // bilibili
      try {
        if (this.bilibiliSite.id) {
          const url = getBangumiUrl(this.bilibiliSite)
          const { _response } = await xhrCustom({
            url
          })
          const match = _response.match(/"season_id":(\d+)/)
          if (match) {
            const seasonId = match[1]
            const { _response } = await xhrCustom({
              url: `https://api.bilibili.com/pgc/web/season/section?season_id=${seasonId}`
            })
            const { message, result } = JSON.parse(_response)
            if (message === 'success' && result?.main_section?.episodes) {
              this.setState({
                epsThumbs: Array.from(
                  new Set(
                    result.main_section.episodes.map(
                      item =>
                        `${item.cover.replace('http://', 'https://')}@192w_120h_1c.jpg`
                    )
                  )
                ),
                epsThumbsHeader: {
                  Referer: 'https://www.bilibili.com/'
                }
              })
              this.setStorage(undefined, undefined, this.namespace)
            }
          }
        }
      } catch (error) {
        //
      }

      // 优酷
      try {
        if (!this.state.epsThumbs.length && this.youkuSite.id) {
          const url = getBangumiUrl(this.youkuSite)
          const { _response } = await xhrCustom({
            url
          })
          const match = _response.match(/showid:"(\d+)"/)
          if (match) {
            const showid = match[1]
            const { _response } = await xhrCustom({
              url: `https://list.youku.com/show/module?id=${showid}&tab=point&callback=jQuery`
            })
            this.setState({
              epsThumbs: Array.from(
                new Set(
                  (
                    decodeURIComponent(_response)
                      .replace(/\\\/>/g, '/>')
                      .replace(/(\\"|"\\)/g, '"')
                      .match(/<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim) || []
                  )
                    .map(item => {
                      const match = item.match(/src="(.+?)"/)
                      if (match) {
                        return match[1]
                          .replace(/\\\//g, '/')
                          .replace('http://', 'https://')
                      }
                      return ''
                    })
                    .filter(item => !!item)
                )
              ),
              epsThumbsHeader: {
                Referer: 'https://list.youku.com/'
              }
            })
            this.setStorage(undefined, undefined, this.namespace)
          }
        }
      } catch (error) {
        //
      }

      // 爱奇艺
      try {
        if (!this.state.epsThumbs.length && this.iqiyiSite.id) {
          const url = getBangumiUrl(this.iqiyiSite)
          const { _response } = await xhrCustom({
            url
          })

          const match = HTMLTrim(_response, true).match(/data-jpg-img="(.+?)"/g)
          if (match) {
            this.setState({
              epsThumbs: Array.from(
                new Set(
                  match
                    .map(item => `https:${item.replace(/(data-jpg-img="|")/g, '')}`)
                    .filter((item, index) => !!index)
                )
              ),
              epsThumbsHeader: {
                Referer: 'https://www.iqiyi.com/'
              }
            })
            this.setStorage(undefined, undefined, this.namespace)
          }
        }
      } catch (error) {
        //
      }

      // qq网站没有截屏, 不找

      // 尝试从douban找
      if (!this.state.epsThumbs.length) {
        const cn = bangumiData?.titleTranslate?.['zh-Hans']?.[0]
        const jp = bangumiData.title
        this.fetchEpsThumbsFromDouban(cn, jp)
      }
    } catch (error) {
      warn('Subject', 'fetchEpsThumbs', error)
    }
  }

  /**
   * 从donban匹配条目, 并获取官方剧照信息
   */
  fetchEpsThumbsFromDouban = async (cn, jp) => {
    if (this.x18 || this.state.epsThumbs.length) return

    const q = cn || jp
    if (q) {
      let doubanId

      // 搜索
      const { _response } = await xhrCustom({
        url: `https://www.douban.com/search?cat=1002&q=${q}`
      })

      const $ = cheerio(_response)
      $('.result .content').each((index, element) => {
        if (doubanId) return

        const $row = cheerio(element)
        const $a = $row.find('h3 a')
        const _cn = $a.text().trim()
        if (similar(_cn, q) < 0.8) {
          const cast = $row.find('.subject-cast').text().trim()
          if (!cast.includes('原名:')) return

          const _jp = cast.split(' / ')[0].replace('原名:', '')
          if (similar(_jp, jp || cn) < 0.8) return
        }

        const match = $a.attr('onclick').match(/sid: (\d+)/)
        if (match && match[1]) {
          doubanId = match[1]
        }
      })

      if (doubanId) {
        // type=o 官方剧照, type=a 剧照
        let type = 'o'
        let _response

        // 获取条目剧照
        const data = await xhrCustom({
          url: `https://movie.douban.com/subject/${doubanId}/photos?type=S&start=0&sortby=time&size=a&subtype=${type}`
        })
        _response = data._response

        // 当官方剧照少于12张, 再次请求使用所有剧照
        const { length } = cheerio(_response)('.cover img')
        if (length > 0 && length < 12) {
          type = 'a'
          const data = await xhrCustom({
            url: `https://movie.douban.com/subject/${doubanId}/photos?type=S&start=0&sortby=time&size=a&subtype=${type}`
          })
          _response = data._response
        }

        // 判断是否有分页
        const match = _response.match(/<span class="count">\(共(\d+)张\)<\/span>/)
        const count = match ? Number(match[1]) : 0
        const start = count >= 100 ? count - 50 : count >= 30 ? count - 30 : 0

        // 由于剧照是根据时间从新到旧排序的, 需要获取较后面的数据, 以免剧透
        if (start) {
          const data = await xhrCustom({
            url: `https://movie.douban.com/subject/${doubanId}/photos?type=S&start=${start}&sortby=time&size=a&subtype=${type}`
          })
          _response = data._response
        }

        const $ = cheerio(_response)
        this.setState({
          epsThumbs: (
            $('.cover img')
              .map((index, element) => {
                const $row = cheerio(element)
                return $row.attr('src').replace('http://', 'https://')
              })
              .get() || []
          ).reverse(),
          epsThumbsHeader: {
            Referer: `https://movie.douban.com/subject/${doubanId}`
          }
        })
        this.setStorage(undefined, undefined, this.namespace)
      }
    }
  }

  // -------------------- get --------------------
  /**
   * 条目唯一Id
   */
  @computed get subjectId() {
    const { subjectId } = this.params
    return subjectId
  }

  /**
   * 命名空间
   */
  @computed get namespace() {
    return `${namespace}|${this.subjectId}`
  }

  /**
   * 是否敏感条目
   */
  @computed get x18() {
    return x18(this.subjectId, this.cn || this.jp)
  }

  /**
   * 放送信息
   */
  @computed get onAir() {
    return calendarStore.onAir[this.subjectId] || {}
  }

  /**
   * 用户自定义放送时间
   */
  @computed get onAirUser() {
    return calendarStore.onAirUser(this.subjectId)
  }

  /**
   * 屏蔽默认头像用户相关信息
   */
  @computed get filterDefault() {
    const { filterDefault } = systemStore.setting
    return filterDefault
  }

  /**
   * 是否显示吐槽
   */
  @computed get showComment() {
    const { showComment } = systemStore.setting
    return showComment
  }

  /**
   * 不显示吐槽块的空占位组件
   */
  @computed get footerEmptyDataComponent() {
    if (this.showComment === -1) return <View />
    return undefined
  }

  /**
   * bgm网址
   */
  @computed get url() {
    return `${HOST}/subject/${this.subjectId}`
  }

  /**
   * 是否登陆
   */
  @computed get isLogin() {
    return userStore.isLogin
  }

  /**
   * 用户id
   */
  @computed get userId() {
    return userStore.userInfo.id
  }

  /**
   * 条目信息
   */
  @computed get subject() {
    return subjectStore.subject(this.subjectId)
  }

  /**
   * [废弃]柠萌瞬间ep数据
   */
  @computed get ningMoeDetail() {
    return discoveryStore.ningMoeDetail(this.subjectId)
  }

  /**
   * 条目信息(来自网页)
   */
  @computed get subjectFormHTML() {
    return subjectStore.subjectFormHTML(this.subjectId)
  }

  /**
   * 条目CDN自维护数据
   */
  @computed get subjectFormCDN() {
    return subjectStore.subjectFormCDN(this.subjectId)
  }

  /**
   * 条目留言
   * 筛选逻辑
   *  - 主动设置屏蔽默认头像用户相关信息
   *  - 限制用户群体 (iOS的游客和审核员) 强制屏蔽默认头像用户
   */
  @computed get subjectComments() {
    const subjectComments = subjectStore.subjectComments(this.subjectId)
    if (!this.showComment || this.showComment === -1) {
      const { pageTotal } = subjectComments.pagination || 1
      return {
        list: [],
        pagination: {
          page: pageTotal,
          pageTotal
        },
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

  /**
   * 条目收藏信息
   */
  @computed get collection() {
    return collectionStore.collection(this.subjectId)
  }

  /**
   * 用户章节记录
   */
  @computed get userProgress() {
    return userStore.userProgress(this.subjectId)
  }

  /**
   * 条目类型中文
   */
  @computed get type() {
    const { _loaded, type } = this.subject
    if (!_loaded) {
      const { _type = '' } = this.params
      return _type
    }

    return MODEL_SUBJECT_TYPE.getTitle(type)
  }

  // Ep偏移
  @computed get ningMoeEpOffset() {
    const { eps = [] } = this.subject
    return (
      eps.filter(item => item.type === 0).sort((a, b) => a.sort - b.sort)[0].sort - 1
    )
  }

  /**
   * 章节在线播放源
   */
  @computed get onlinePlayActionSheetData() {
    const data = []
    if (this.ningMoeDetail.id) {
      // data.push('柠萌瞬间')
    }

    const { epsData } = this.state
    SITES.forEach(item => {
      if (epsData[item] && Object.keys(epsData[item]).length) {
        data.push(item)
      }
    })
    data.push('取消')

    return data
  }

  /**
   * 条目动作
   */
  @computed get action() {
    switch (this.type) {
      case '音乐':
        return '听'
      case '游戏':
        return '玩'
      default:
        return '看'
    }
  }

  /**
   * 是否限制用户(防审核)
   */
  @computed get isLimit() {
    return userStore.isLimit
  }

  /**
   * 是否网站用户评分
   */
  @computed get hideScore() {
    return systemStore.setting.hideScore
  }

  /**
   * 动画和三次元源头
   */
  @computed get onlineOrigins() {
    const { bangumiInfo } = this.state
    const { sites = [] } = bangumiInfo
    const _data = []
    const data = [
      ..._data,
      ...sites.filter(item => SITES_DS.includes(item.site)).map(item => item.site)
    ]

    if (['动画'].includes(this.type)) {
      if (systemStore?.ota?.X18 && this.isLogin) {
        let flagX18
        if (this.x18) flagX18 = true
        if (!flagX18) {
          const x18 = this.tags.some(item => item.name.includes('里番'))
          if (x18) flagX18 = true
        }
        if (flagX18) data.push('Hanime1')
      }

      data.push('AGE动漫', '迅播动漫')
      if (!this.x18) data.push('奇奇动漫', 'Anime1')
    }

    if (['三次元'].includes(this.type)) data.push('迅播动漫', '人人影视')
    return data
  }

  /**
   * 漫画源头
   */
  @computed get onlineComicOrigins() {
    const data = []
    if (this.jp) data.push(`[绅士漫画] ${this.jp} (需飞机)`)
    if (this.cn && this.cn !== this.jp) data.push(`[绅士漫画] ${this.cn} (需飞机)`)
    if (this.cn || this.jp) {
      data.push(`[manhua1234] ${this.cn || this.jp}`)
      data.push(`[77mh] ${this.cn || this.jp}`)
      data.push(`[Mangabz] ${this.cn || this.jp}`)
    }
    return data
  }

  /**
   * 音乐源头
   */
  @computed get onlineDiscOrigins() {
    const data = []
    if (this.jp) data.push(`[网易云] ${this.jp}`)
    if (this.cn && this.cn !== this.jp) data.push(`[网易云] ${this.cn}`)
    if (this.jp) data.push(`[QQ音乐] ${this.jp}`)
    if (this.cn && this.cn !== this.jp) data.push(`[QQ音乐] ${this.cn}`)
    if (this.jp) data.push(`[bilibili] ${this.jp}`)
    if (this.cn && this.cn !== this.jp) data.push(`[bilibili] ${this.cn}`)
    return data
  }

  /**
   * 是否PS游戏, 跳转psnine查看奖杯
   */
  @computed get isPS() {
    return (
      this.type === '游戏' &&
      (this.info.includes('PS4') ||
        this.info.includes('PS3') ||
        this.info.includes('PS5'))
    )
  }

  /**
   * 第三方动画信息
   */
  @computed get animeInfo() {
    if (this.type !== '动画') return null

    return findAnime(this.subjectId)
  }

  /**
   * 第三方游戏信息
   */
  @computed get gameInfo() {
    if (this.type !== '游戏') return null

    return findGame(this.subjectId)
  }

  /**
   * Hentai条目第三方信息
   */
  @computed get hentaiInfo() {
    if (this.type !== '动画' && !this.x18) return null

    return findHentai(this.subjectId)
  }

  /**
   * 漫画或文库是否有源头
   */
  _manga = null
  _wenku = null
  @computed get source() {
    if (this.type !== '书籍') return false

    this._manga = findManga(this.subjectId)
    this._wenku = findWenku(this.subjectId)

    // 若为单行本则还需要找到系列, 用系列id查询
    if (this.subjectSeries) {
      const { id } = this.subjectSeries
      if (!this._manga?.id) this._manga = findManga(id)
      if (!this._wenku?.id) this._wenku = findWenku(id)
    }
    return {
      mangaId: this._manga.mangaId,
      wenkuId: this._wenku.wenkuId
    }
  }

  /**
   * 筛选章节构造数据, 每100章节一个选项
   */
  @computed get filterEpsData() {
    const data = ['从 1 起']
    if (this.eps.length < 100) {
      return data
    }

    const count = parseInt(this.eps.length / 100)
    for (let i = 1; i <= count; i += 1) {
      data.push(`从 ${i * 100} 开始`)
    }
    return data
  }

  /**
   * 全站人员状态数字
   */
  @computed get status() {
    const {
      wish = 0,
      collect = 0,
      doing = 0,
      on_hold: onHold = 0,
      dropped = 0
    } = this.subjectCollection
    const status = []
    if (wish) {
      status.push({
        status: 'wish',
        text: `${wish}想${this.action}`
      })
    }
    if (collect) {
      status.push({
        status: 'collect',
        text: `${collect}${this.action}过`
      })
    }
    if (doing) {
      status.push({
        status: 'doing',
        text: `${doing}在${this.action}`
      })
    }
    if (onHold) {
      status.push({
        status: 'onHold',
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

  /**
   * 上映时间
   */
  @computed get release() {
    return (
      this.info.match(
        /<li><span>(发售日|放送开始|上映年度|上映时间): <\/span>(.+?)<\/li>/
      )?.[2] || ''
    )
  }

  /**
   * 封面图宽度
   * 音乐类型条目为正方形
   */
  @computed get imageWidth() {
    const w = IMG_WIDTH * (_.isPad ? 1.64 : 1.4)
    return this.type === '音乐' ? w * 1.2 : w
  }

  /**
   * 封面图高度
   */
  @computed get imageHeight() {
    return this.type === '音乐' ? this.imageWidth : IMG_HEIGHT * (_.isPad ? 1.64 : 1.4)
  }

  // -------------------- get: cdn fallback --------------------
  /**
   * 封面占位
   */
  @computed get coverPlaceholder() {
    const { _image, _imageForce } = this.params
    return (
      _imageForce ||
      _image ||
      this.subjectFormCDN.image ||
      this.subject.images.medium ||
      ''
    )
  }

  /**
   * 日文名
   */
  @computed get jp() {
    const { _jp } = this.params
    return HTMLDecode(this.subject.name || _jp || this.subjectFormCDN.name)
  }

  /**
   * 中文名
   */
  @computed get cn() {
    const { _cn } = this.params
    return HTMLDecode(
      this.subject.name_cn || _cn || findSubjectCn(this.jp, this.subjectId)
    )
  }

  /**
   * 条目类型(Api值)
   */
  @computed get subjectType() {
    if (this.subject._loaded) return this.subject.type
    return this.subjectFormCDN.type
  }

  /**
   * 网站用户评分
   */
  @computed get rating() {
    if (this.subject._loaded) {
      return {
        ...initRating,
        ...this.subject.rating
      }
    }

    if (this.subjectFormCDN._loaded) {
      return {
        ...initRating,
        ...this.subjectFormCDN.rating
      }
    }

    return initRating
  }

  /**
   * 是否锁定条目
   */
  @computed get lock() {
    if (this.subjectFormHTML._loaded) return this.subjectFormHTML.lock
    return this.subjectFormCDN.lock
  }

  /**
   * 各状态评分人数
   */
  @computed get subjectCollection() {
    if (this.subject._loaded) return this.subject.collection || {}
    return this.subjectFormCDN.collection || {}
  }

  /**
   * 章节数据
   */
  @computed get eps() {
    if (this.subject._loaded) {
      // type = 1 SP的排后面
      return (this.subject.eps || []).sort((a, b) => {
        if (a.type === b.type) return true
        if (a.type === 1) return false
        return true
      })
    }

    return this.subjectFormCDN.eps || []
  }

  /**
   * 经过计算后传递到<Eps>的data
   */
  @computed get toEps() {
    const { epsReverse, filterEps } = this.state

    if (filterEps) {
      const eps = this.eps.filter((item, index) => index > filterEps)
      return epsReverse ? eps.reverse() : eps
    }

    return epsReverse ? this.eps.map(item => item).reverse() : this.eps
  }

  /**
   * 音乐曲目数据
   */
  @computed get disc() {
    if (this.subjectFormHTML._loaded) {
      return this.subjectFormHTML.disc || []
    }
    return this.subjectFormCDN.disc || []
  }

  /**
   * 详情
   */
  @computed get summary() {
    if (this.subject._loaded) {
      return this.subject.summary
    }
    const { _summary = '' } = this.params
    return this.subjectFormCDN.summary || _summary
  }

  /**
   * 标签
   */
  @computed get tags() {
    const data =
      (this.subjectFormHTML._loaded
        ? this.subjectFormHTML.tags
        : this.subjectFormCDN.tags) || []
    return data.filter(item => !!item.name).filter((item, index) => index < 20)
  }

  /**
   * 网页版详情
   */
  @computed get info() {
    if (this.subjectFormHTML._loaded) return this.subjectFormHTML.info
    return this.subjectFormCDN.info
  }

  /**
   * 关联人物
   */
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
          _image: images.medium,
          name: nameCn || name,
          nameJP: name,
          desc: (actors[0] && actors[0].name) || roleName
        })
      )
    }
    return this.subjectFormCDN.crt || []
  }

  /**
   * 制作人员
   */
  @computed get staff() {
    if (this.subject._loaded) {
      const { staff } = this.subject
      return (staff || []).map(
        ({ id, images = {}, name, name_cn: nameCn, jobs = [] }) => ({
          id,
          image: images.grid,
          _image: images.medium,
          name: nameCn || name,
          nameJP: name,
          desc: jobs[0]
        })
      )
    }
    return this.subjectFormCDN.staff || []
  }

  /**
   * 关联条目
   */
  @computed get relations() {
    if (this.subject._loaded) {
      return (this.subjectFormHTML.relations || []).map(
        ({ id, image, title, type }) => ({
          id,
          image,
          name: title,
          desc: type
        })
      )
    }
    return (this.subjectFormCDN.relations || []).map(item => ({
      id: item.id,
      image: item.image,
      name: item.title,
      desc: item.type
    }))
  }

  /**
   * 单行本
   */
  @computed get comic() {
    if (this.subject._loaded) {
      return this.subjectFormHTML.comic || []
    }
    return this.subjectFormCDN.comic || []
  }

  /**
   * 猜你喜欢
   */
  @computed get like() {
    if (this.subject._loaded) {
      return this.subjectFormHTML.like || []
    }
    return this.subjectFormCDN.like || []
  }

  /**
   * 条目类别
   */
  @computed get titleLabel() {
    // bangumiInfo只有动画的数据
    let label = MODEL_SUBJECT_TYPE.getTitle(this.subjectType)
    if (label === '动画') {
      const { bangumiInfo } = this.state
      label = String(bangumiInfo.type).toUpperCase() || label
    } else {
      label = this.subjectFormHTML.type || label
    }
    return label === '动画' ? 'TV' : label
  }

  /**
   * bilibili放送信息
   */
  @computed get bilibiliSite() {
    const { bangumiInfo } = this.state
    return bangumiInfo?.sites?.find(item => item.site === 'bilibili') || {}
  }

  /**
   * 爱奇艺放送信息
   */
  @computed get iqiyiSite() {
    const { bangumiInfo } = this.state
    return bangumiInfo?.sites?.find(item => item.site === 'iqiyi') || {}
  }

  /**
   * 优酷放送信息
   */
  @computed get youkuSite() {
    const { bangumiInfo } = this.state
    return bangumiInfo?.sites?.find(item => item.site === 'youku') || {}
  }

  /**
   * 关联: 前传和续集, 或系列: 若为单行本, relations第一项则为系列
   * 前传
   */
  @computed get subjectPrev() {
    const { relations = [] } = this.subjectFormHTML
    return relations.find(item => item.type === '前传')
  }

  /**
   * 续集
   */
  @computed get subjectAfter() {
    const { relations = [] } = this.subjectFormHTML
    return relations.find(item => item.type === '续集')
  }

  /**
   * 系列
   */
  @computed get subjectSeries() {
    const { relations = [] } = this.subjectFormHTML
    return relations?.[0]?.type === '系列' ? relations[0] : null
  }

  /**
   * 动画化
   */
  @computed get subjectAnime() {
    if (!(this.titleLabel || '').includes('系列')) {
      return null
    }

    const { relations = [] } = this.subjectFormHTML
    const find = relations.find(item => item.type === '动画' || item.type === '其他')

    // 部分条目维护不够好, 动画化条目标签为其他, 若日文名字相等都认为是动画化
    if (
      find?.type === '动画' ||
      (find?.type === '其他' && this.jp.includes(find?.title))
    ) {
      return find
    }
    return null
  }

  /**
   * 高清资源
   */
  @computed get hd() {
    const { HD = [] } = getOTA()
    if (HD.includes(Number(this.subjectId))) {
      return this.subjectId
    }

    // 若为单行本则还需要找到系列, 用系列id查询
    if (this.subjectSeries) {
      const { id } = this.subjectSeries
      if (HD.includes(Number(id))) {
        return id
      }
    }

    return false
  }

  /**
   * 计算本条目存在在多少个自己创建的目录里面
   */
  @computed get catalogs() {
    return usersStore.catalogs()
  }

  /**
   * 目录详情
   */
  catalogDetail(id) {
    return computed(() => discoveryStore.catalogDetail(id)).get()
  }

  /**
   * 是否存在在目录中
   */
  @computed get catalogIncludes() {
    const { list } = this.catalogs
    let num = 0
    list.forEach(item => {
      const { list } = this.catalogDetail(item.id)
      if (list.some(i => i.id == this.subjectId)) {
        num += 1
      }
    })

    return num
  }

  // -------------------- page --------------------
  /**
   * 显示收藏管理
   */
  showManageModel = () => {
    t('条目.显示收藏管理', {
      subjectId: this.subjectId
    })

    this.setState({
      visible: true
    })
  }

  /**
   * 隐藏管理进度信息弹窗
   */
  closeManageModal = () =>
    this.setState({
      visible: false
    })

  /**
   * 章节倒序
   */
  toggleReverseEps = () => {
    t('条目.章节倒序', {
      subjectId: this.subjectId
    })

    const { epsReverse } = this.state
    this.setState({
      epsReverse: !epsReverse
    })
    this.setStorage(undefined, undefined, this.namespace)
  }

  /**
   * 吐槽倒序
   */
  toggleReverseComments = () => {
    t('条目.吐槽倒序', {
      subjectId: this.subjectId
    })

    const { _reverse } = this.subjectComments
    this.fetchSubjectComments(true, !_reverse)
  }

  /**
   * 书籍章节输入框改变
   * @params {*} name 字段
   * @params {*} text 文字
   */
  changeText = (name, text) => {
    t('条目.书籍章节输入框改变', {
      subjectId: this.subjectId
    })

    try {
      this.setState({
        [name]: String(text)
      })
    } catch (error) {
      warn(namespace, 'changeText', error)
    }
  }

  /**
   * 在线源头选择
   * @params {*} key
   */
  onlinePlaySelected = key => {
    try {
      t('条目.搜索源', {
        type: key,
        subjectId: this.subjectId,
        subjectType: this.type
      })

      const { _aid } = this.params
      const { bangumiInfo } = this.state
      const { sites = [] } = bangumiInfo
      let item
      let url
      switch (key) {
        case 'AGE动漫':
          if (_aid || findAnime(this.subjectId).ageId) {
            url = `${SITE_AGEFANS()}/detail/${_aid || findAnime(this.subjectId).ageId}`
          } else {
            url = `${SITE_AGEFANS()}/search?query=${encodeURIComponent(
              this.cn || this.jp
            )}&page=1`
          }
          break

        case 'Anime1':
          url = `https://anime1.me/?s=${encodeURIComponent(s2t(this.cn || this.jp))}`
          break

        case '迅播动漫':
          url = `${SITE_XUNBO()}/search.php?searchword=${encodeURIComponent(
            this.cn || this.jp
          )}`
          break

        case '奇奇动漫':
          url = `https://www.qiqidongman.com/vod-search-wd-${encodeURIComponent(
            this.cn || this.jp
          )}.html`
          break

        case 'Hanime1':
          url = `https://hanime1.me/search?query=${encodeURIComponent(
            this.jp || this.cn
          )}`
          break

        case '人人影视':
          url = `${SITE_RRYS()}/search?keyword=${encodeURIComponent(
            this.cn || this.jp
          )}&type=resource`
          break

        default:
          item = sites.find(item => item.site === key)
          if (item) {
            url = getBangumiUrl(item)
          }
          break
      }

      if (url) {
        copy(url)
        info('已复制地址')
        setTimeout(() => {
          open(url)
        }, 1600)
      }
    } catch (error) {
      warn(namespace, 'onlinePlaySelected', error)
    }
  }

  onlineComicSelected = key => {
    try {
      let _key
      if (key.includes('[绅士漫画]')) {
        _key = '绅士漫画'
      } else if (key.includes('[Mangabz]')) {
        _key = 'Mangabz'
      } else if (key.includes('[manhua1234]')) {
        _key = 'manhua1234'
      } else if (key.includes('[77mh]')) {
        _key = '77mh'
      }

      t('条目.搜索源', {
        type: _key,
        subjectId: this.subjectId,
        subjectType: this.type
      })

      let url
      let q
      switch (_key) {
        case '绅士漫画':
          q = key.replace('[绅士漫画] ', '').replace(' (需飞机)', '')
          url = `${SITE_WNACG()}/search/?q=${encodeURIComponent(
            q
          )}&f=_all&s=create_time_DESC`
          break

        case 'Mangabz':
          q = key.replace('[Mangabz] ', '')
          url = `${SITE_MANGABZ()}/search?title=${encodeURIComponent(q)}`
          break

        case 'manhua1234':
          q = key.replace('[manhua1234] ', '')
          url = `${SITE_MANHUA1234()}/search/?keywords=${encodeURIComponent(q)}`
          break

        case '77mh':
          q = key.replace('[77mh] ', '')
          url = `${SITE_77MH()}/m.php?k=${encodeURIComponent(q)}`
          break

        default:
          break
      }

      if (url) {
        copy(url)
        info('已复制地址')
        setTimeout(() => {
          open(url)
        }, 1600)
      }
    } catch (error) {
      warn(namespace, 'onlineComicSelected', error)
    }
  }

  onlineDiscSelected = key => {
    try {
      let _key

      if (key.includes('网易云')) {
        _key = 'music.163.com'
      } else if (key.includes('QQ音乐')) {
        _key = 'y.qq.com'
      } else if (key.includes('bilibili')) {
        _key = 'search.bilibili.com'
      }

      t('条目.搜索源', {
        type: _key,
        subjectId: this.subjectId,
        subjectType: this.type
      })

      let url
      let q
      switch (_key) {
        case 'music.163.com':
          q = key.replace('[网易云] ', '')
          url = `https://www.baidu.com/s?word=site%3Amusic.163.com+%E4%B8%93%E8%BE%91+${encodeURIComponent(
            q
          )}`
          break

        case 'y.qq.com':
          q = key.replace('[QQ音乐] ', '')
          url = `https://www.baidu.com/s?word=site%3Ay.qq.com+%E4%B8%93%E8%BE%91+${encodeURIComponent(
            q
          )}`
          break

        case 'search.bilibili.com':
          q = key.replace('[bilibili] ', '')
          url = `https://search.bilibili.com/all?keyword=${encodeURIComponent(
            q
          )}&from_source=nav_suggest_new&order=stow&duration=0&tids_1=3`
          break

        default:
          break
      }

      if (url) {
        copy(url)
        info('已复制地址')
        setTimeout(() => {
          open(url)
        }, 1600)
      }
    } catch (error) {
      warn(namespace, 'onlineDiscSelected', error)
    }
  }

  toManhuadb = () => {
    t('条目.阅读漫画', {
      subjectId: this.subjectId,
      mid: this.source.mangaId
    })

    const url = `${SITE_MANHUADB()}/manhua/${this.source.mangaId}`
    copy(url)
    info('已复制地址')

    setTimeout(() => {
      open(url)
    }, 1600)
  }

  toWenku8 = () => {
    t('条目.阅读轻小说', {
      subjectId: this.subjectId,
      wid: this.source.wenkuId
    })

    const url = `${SITE_WK8()}/novel/${parseInt(this.source.wenkuId / 1000)}/${
      this.source.wenkuId
    }/index.htm`
    copy(url)
    info('已复制地址')

    setTimeout(() => {
      open(url)
    }, 1600)
  }

  /**
   * 前往PSNINE查看游戏奖杯
   */
  toPSNINE = () => {
    t('条目.查看奖杯', {
      subjectId: this.subjectId
    })

    open(`https://psnine.com/psngame?title=${encodeURIComponent(this.cn || this.jp)}`)
  }

  /**
   * 设置章节筛选
   */
  updateFilterEps = key => {
    let filterEps = parseInt(key.match(/\d+/g)[0])
    if (filterEps === 1) filterEps = 0

    t('条目.设置章节筛选', {
      subjectId: this.subjectId,
      filterEps
    })

    this.setState({
      filterEps
    })
    this.setStorage(undefined, undefined, this.namespace)
  }

  updateShowHeaderTitle = showHeaderTitle =>
    this.setState({
      showHeaderTitle
    })

  filterScores = label => {
    t('条目.筛选分数', {
      subjectId: this.subjectId
    })

    this.setState({
      filterScores: label === '全部' ? [] : label.split('-')
    })
    this.setStorage(undefined, undefined, this.namespace)
  }

  /**
   * 去用户评分页面
   * @param {*} navigation
   * @param {*} from
   * @param {*} status
   */
  toRating = (navigation, from, status) => {
    t('条目.跳转', {
      to: 'Rating',
      from,
      subjectId: this.subjectId,
      status
    })

    const { wish, collect, doing, on_hold: onHold, dropped } = this.subjectCollection
    navigation.push('Rating', {
      subjectId: this.subjectId,
      status,
      name: cnjp(this.cn, this.jp),
      wish,
      collect,
      doing,
      onHold,
      dropped
    })
  }

  /**
   * 展开收起功能块
   * @param {*} key
   */
  switchBlock = key => {
    t('条目.展开收起功能块', {
      key
    })

    systemStore.switchSetting(key)
  }

  /**
   * 展开收起功能块
   * @param {*} key
   */
  hiddenBlock = key => {
    t('条目.展开收起功能块', {
      key: `${key} | -1`
    })

    systemStore.setSetting(key, -1)
  }

  /**
   * 用于延迟底部块渲染
   * 优化条目页面进入渲染时, 同时渲染过多块导致掉帧的问题
   */
  rendered = () => {
    const { rendered } = this.state
    if (!rendered) {
      this.setState({
        rendered: true
      })
    }
  }

  /**
   * 显示/关闭管理目录模态框
   */
  toggleFolder = () => {
    if (!this.isLogin) {
      info('请先登录')
      return
    }

    const { folder } = this.state
    this.setState({
      folder: !folder
    })

    if (!folder) {
      t('条目.管理目录', {
        subjectId: this.subjectId
      })
    }
  }

  /**
   * 自定义放送时间
   */
  onSelectOnAir = (key, value) => {
    t('条目.自定义放送', {
      subjectId: this.subjectId
    })
    calendarStore.updateOnAirUser(this.subjectId, key, value)
  }

  resetOnAirUser = () => {
    t('条目.重置放送', {
      subjectId: this.subjectId
    })
    calendarStore.resetOnAirUser(this.subjectId)
  }

  // -------------------- action --------------------
  /**
   * 章节菜单操作
   */
  doEpsSelect = async (value, item, navigation) => {
    try {
      // iOS是本集讨论, 安卓是(+N)...
      if (value.includes('本集讨论') || value.includes('(+')) {
        t('条目.章节菜单操作', {
          title: '本集讨论',
          subjectId: this.subjectId
        })

        // 数据占位
        appNavigate(
          item.url,
          navigation,
          {
            _title: `ep${item.sort}.${item.name || item.name_cn}`,
            _group: this.subject.name || this.subject.name_cn,
            _groupThumb: getCoverMedium((this.subject.images || {}).medium),
            _desc: `时长:${item.duration} / 首播:${item.airdate}<br />${(
              item.desc || ''
            ).replace(/\r\n/g, '<br />')}`
          },
          {
            id: '条目.跳转',
            data: {
              from: '章节',
              subjectId: this.subjectId
            }
          }
        )
        return
      }

      if (value === '在线播放') {
        setTimeout(() => {
          showActionSheet(this.onlinePlayActionSheetData, index => {
            t('条目.章节菜单操作', {
              title: this.onlinePlayActionSheetData[index],
              subjectId: this.subjectId
            })

            const isSp = item.type === 1
            let url

            if (this.onlinePlayActionSheetData[index] === '柠萌瞬间') {
              // @notice 像一拳超人第二季这种 要处理EP偏移
              if (isSp) {
                url = `${HOST_NING_MOE}/detail?line=1&eps=1&bangumi_id=${this.ningMoeDetail.id}`
              } else {
                url = `${HOST_NING_MOE}/detail?line=1&eps=${
                  item.sort - this.ningMoeEpOffset
                }&bangumi_id=${this.ningMoeDetail.id}`
              }
            } else {
              // @todo 逻辑比较复杂, 暂时不处理EP偏移
              const { epsData } = this.state
              const { eps = [] } = this.subject
              const site = this.onlinePlayActionSheetData[index]
              let epIndex
              if (SITES.includes(site)) {
                if (isSp) {
                  url = getBangumiUrl({
                    id: item.id,
                    site
                  })
                } else {
                  epIndex = eps
                    .filter(item => item.type === 0)
                    .findIndex(i => i.id === item.id)
                  url =
                    epsData[site][epIndex] ||
                    getBangumiUrl({
                      id: item.id,
                      site
                    })
                }
              }
            }

            if (url) {
              open(url)
            }
          })
        }, 320)

        return
      }

      // 未收藏不能更改进度
      const { status = { name: '未收藏' } } = this.collection
      if (status.name !== '未收藏') {
        const status = MODEL_EP_STATUS.getValue(value)
        if (status) {
          t('条目.章节菜单操作', {
            title: '更新收视进度',
            subjectId: this.subjectId,
            status
          })

          // 更新收视进度
          await userStore.doUpdateEpStatus({
            id: item.id,
            status
          })
          feedback()

          userStore.fetchUserCollection()
          userStore.fetchUserProgress(this.subjectId)
        }

        if (value === '看到') {
          t('条目.章节菜单操作', {
            title: '批量更新收视进度',
            subjectId: this.subjectId
          })

          /**
           * 批量更新收视进度
           * @issue 多季度非1开始的番不能直接使用sort, 需要把sp去除后使用当前item.sort查找index
           */
          const { eps = [] } = this.subject
          const sort = eps
            .filter(i => i.type === 0)
            .sort((a, b) => (a.sort || 0) - (b.sort || 0))
            .findIndex(i => i.sort === item.sort)
          await userStore.doUpdateSubjectWatched({
            subjectId: this.subjectId,
            sort: sort === -1 ? item.sort : sort + 1
          })
          feedback()

          userStore.fetchUserCollection()
          userStore.fetchUserProgress(this.subjectId)
        }

        return
      }

      info('收藏了才能管理哦')
    } catch (error) {
      warn(namespace, 'doEpsSelect', error)
    }
  }

  /**
   * 管理收藏
   */
  doUpdateCollection = async values => {
    t('条目.管理收藏', {
      subjectId: this.subjectId
    })

    try {
      await collectionStore.doUpdateCollection(values)
      feedback()

      collectionStore.fetchCollection(this.subjectId)
      this.closeManageModal()
    } catch (error) {
      warn(namespace, 'doUpdateCollection', error)
    }
  }

  /**
   * 更新书籍下一个章节
   */
  doUpdateNext = async name => {
    t('条目.更新书籍下一个章节', {
      subjectId: this.subjectId
    })

    try {
      const { chap, vol } = this.state
      const next = String(parseInt(this.state[name] || 0) + 1)
      await collectionStore.doUpdateBookEp({
        subjectId: this.subjectId,
        chap,
        vol,
        [name]: next
      })
      feedback()

      this.setState({
        [name]: next
      })
      info('更新成功')
    } catch (error) {
      warn(namespace, 'doUpdateNext', error)
    }
  }

  /**
   * 更新书籍章节
   */
  doUpdateBookEp = async () => {
    t('条目.更新书籍章节', {
      subjectId: this.subjectId
    })

    try {
      const { chap, vol } = this.state
      await collectionStore.doUpdateBookEp({
        subjectId: this.subjectId,
        chap,
        vol
      })
      feedback()
      info('更新成功')
    } catch (error) {
      warn(namespace, 'doUpdateBookEp', error)
    }
  }

  /**
   * 输入框更新章节
   */
  doUpdateSubjectEp = async () => {
    const { watchedEps } = this.state
    t('条目.输入框更新章节', {
      subjectId: this.subjectId
    })

    try {
      collectionStore.doUpdateSubjectEp(
        {
          subjectId: this.subjectId,
          watchedEps
        },
        async () => {
          feedback()

          userStore.fetchUserCollection()
          userStore.fetchUserProgress(this.subjectId)
          this.fetchSubjectFormHTML()
          this.setStorage(undefined, undefined, this.namespace)
          info('更新成功')
        }
      )
    } catch (error) {
      warn(namespace, 'doUpdateSubjectEp', error)
    }
  }

  /**
   * 章节按钮长按
   */
  doEpsLongPress = async ({ id }) => {
    t('条目.章节按钮长按', {
      subjectId: this.subjectId
    })

    try {
      const userProgress = this.userProgress
      let status
      if (userProgress[id]) {
        // 已观看 -> 撤销
        status = MODEL_EP_STATUS.getValue('撤销')
      } else {
        // 未观看 -> 看过
        status = MODEL_EP_STATUS.getValue('看过')
      }

      await userStore.doUpdateEpStatus({
        id,
        status
      })
      feedback()

      userStore.fetchUserCollection()
      userStore.fetchUserProgress(this.subjectId)
    } catch (error) {
      warn(namespace, 'doEpsLongPress', error)
    }
  }

  /**
   * 删除收藏
   */
  doEraseCollection = async () => {
    const { formhash } = this.subjectFormHTML
    if (!formhash) {
      return
    }

    t('条目.删除收藏', {
      subjectId: this.subjectId
    })

    try {
      await userStore.doEraseCollection(
        {
          subjectId: this.subjectId,
          formhash
        },
        () => {}, // 因为删除后是302, 使用fail去触发
        () => {
          feedback()
          info('删除收藏成功')

          this.fetchCollection()
          userStore.fetchUserCollection()
        }
      )
    } catch (error) {
      warn(namespace, 'doEraseCollection', error)
    }
  }

  /**
   * 翻译简介
   */
  doTranslate = async () => {
    if (this.state.translateResult.length) {
      return
    }

    t('条目.翻译简介', {
      subjectId: this.subjectId
    })

    let hide
    try {
      hide = loading('请求中...')
      const response = await baiduTranslate(this.summary)
      hide()

      const { trans_result: translateResult } = JSON.parse(response)
      if (Array.isArray(translateResult)) {
        this.setState({
          translateResult
        })
        info('翻译成功')
        return
      }
      info('翻译失败, 请重试')
    } catch (error) {
      if (hide) hide()
      info('翻译失败, 请重试')
    }
  }

  /**
   * 翻译曲目
   */
  doDiscTranslate = async () => {
    if (this.state.discTranslateResult.length) {
      return
    }

    t('条目.翻译曲目', {
      subjectId: this.subjectId
    })

    const discTitle = []
    this.disc.forEach(item => {
      item.disc.forEach((i, index) => {
        discTitle.push(i.title.replace(`${index + 1} `, ''))
      })
    })

    let hide
    try {
      hide = loading('请求中...')
      const response = await baiduTranslate(discTitle.join('\n'))
      hide()

      const { trans_result: discTranslateResult } = JSON.parse(response)
      if (Array.isArray(discTranslateResult)) {
        this.setState({
          discTranslateResult
        })
        info('翻译成功')
        return
      }
      info('翻译失败, 请重试')
    } catch (error) {
      if (hide) hide()
      info('翻译失败, 请重试')
    }
  }
}
