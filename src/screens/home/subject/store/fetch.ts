/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-16 07:39:54
 */
import bangumiData from '@assets/json/thirdParty/bangumiData.min.json'
import { collectionStore, subjectStore, systemStore, monoStore } from '@stores'
import {
  HTMLDecode,
  HTMLTrim,
  getBangumiUrl,
  getTimestamp,
  unzipBangumiData
} from '@utils'
import { xhrCustom } from '@utils/fetch'
import {
  getPreview,
  getTrailer,
  getVideo,
  matchGame,
  matchMovie,
  search
} from '@utils/douban'
import { get, update } from '@utils/kv'
import { CDN_EPS, SITES } from '@constants'
import Computed from './computed'
import { NAMESPACE } from './ds'

export default class Fetch extends Computed {
  /** 条目信息 */
  fetchSubject = () => {
    return subjectStore.fetchSubject(this.subjectId)
  }

  /** 网页的条目信息 (书籍只有网页端有数据源, 需要初始值) */
  fetchSubjectFormHTML = async () => {
    const data = await subjectStore.fetchSubjectFormHTML(this.subjectId)

    const { watchedEps, book } = data
    this.setState({
      watchedEps: watchedEps || '0',
      chap: book.chap || '0',
      vol: book.vol || '0'
    })
    return data
  }

  /** 私有 CDN 的条目信息 */
  fetchSubjectFormCDN = async () => {
    const { setting } = systemStore
    const { _loaded } = this.subjectFormHTML
    if (!setting.cdn || _loaded) return true
    return subjectStore.fetchSubjectFormCDN(this.subjectId)
  }

  /** 装载条目云端缓存数据 */
  fetchSubjectFromOSS = async () => {}

  /** 装载第三方数据 */
  fetchThirdParty = async (data: { name: string }) => {
    // 若匹配到 bangumi-data 数据, 使用其中的 sites 数据进行对应平台 api 查找缩略图
    const item = bangumiData.find(
      item =>
        item.id == this.subjectId ||
        item.j === HTMLDecode(data.name) ||
        item.c === HTMLDecode(data.name)
    )
    let _item

    if (item) {
      _item = unzipBangumiData(item)
      this.setState({
        bangumiInfo: {
          sites: _item.sites,
          type: _item.type
        }
      })
    }

    // 先检测云端数据
    const needUpdate = await this.getThirdParty()
    if (!needUpdate) return

    if (item) {
      setTimeout(() => {
        this.fetchEpsThumbs(_item)
      }, 0)
    }

    // 若没有匹配到, 在豆瓣查找
    if ((!item && this.type === '动画') || this.type === '三次元') {
      this.fetchMovieFromDouban(this.cn, this.jp)
    } else if (this.type === '游戏') {
      this.fetchGameFromDouban(this.cn, this.jp)
    }
  }

  /** 用户收藏信息 */
  fetchCollection = () => {
    return collectionStore.fetchCollection(this.subjectId)
  }

  /** 条目留言 */
  fetchSubjectComments = (refresh?: boolean, reverse?: boolean) => {
    return subjectStore.fetchSubjectComments(
      {
        subjectId: this.subjectId
      },
      refresh,
      reverse
    )
  }

  /** 获取单集播放源 */
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
        this.setStorage(this.namespace)
      } catch (error) {
        console.error(NAMESPACE, 'fetchEpsData', error)
      }
    }
  }

  /** staff 数据 */
  fetchPersons = () => {
    return monoStore.fetchPersons({
      subjectId: this.subjectId
    })
  }

  /** 获取章节的缩略图 */
  fetchEpsThumbs = async bangumiData => {
    if (this.state.epsThumbs.length >= 12) return

    try {
      // bilibili
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
            this.setStorage(this.namespace)
            this.updateThirdParty()
          }
        }
      }

      // 优酷
      if (this.state.epsThumbs.length < 12 && this.youkuSite.id) {
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
          this.setStorage(this.namespace)
          this.updateThirdParty()
        }
      }

      // 爱奇艺
      if (this.state.epsThumbs.length < 12 && this.iqiyiSite.id) {
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
          this.setStorage(this.namespace)
          this.updateThirdParty()
        }
      }

      // qq网站没有截屏, 不找

      // 尝试从douban找
      if (
        (!this.state.epsThumbsHeader.Referer && this.state.epsThumbs.length < 12) ||
        this.state.epsThumbs.length === 0
      ) {
        const cn = bangumiData?.titleTranslate?.['zh-Hans']?.[0]
        const jp = bangumiData.title
        this.fetchMovieFromDouban(cn, jp)
      }
    } catch (error) {
      console.error('Subject', 'fetchEpsThumbs', error)
    }
  }

  /** 从donban匹配条目, 并获取官方剧照信息 */
  fetchMovieFromDouban = async (cn: string, jp: string) => {
    if (this.x18) return

    const q = cn || jp
    if (q) {
      const result = await search(q)
      const doubanId = matchMovie(q, result, jp)

      const trailer = await getTrailer(doubanId)
      if (trailer.data.length) {
        this.setState({
          videos: trailer.data,
          epsThumbsHeader: {
            Referer: trailer.referer
          }
        })
      }

      const preview = await getPreview(doubanId)
      if (preview.data.length) {
        this.setState({
          epsThumbs: preview.data.reverse(),
          epsThumbsHeader: {
            Referer: preview.referer
          }
        })
      }

      this.setStorage(this.namespace)
      this.updateThirdParty()
    }
  }

  /** 从donban匹配条目, 并获取预告视频 */
  fetchGameFromDouban = async (cn: string, jp: string) => {
    if (this.x18) return

    const q = cn || jp
    if (q) {
      const result = await search(q, 'game')
      const doubanId = matchGame(q, result)

      const videos = await getVideo(doubanId, 'game')
      if (videos.data.length) {
        this.setState({
          videos: videos.data,
          epsThumbsHeader: {
            Referer: videos.referer
          }
        })
      }

      const previews = await getPreview(doubanId, 'game')
      if (previews.data.length) {
        this.setState({
          epsThumbs: previews.data,
          epsThumbsHeader: {
            Referer: previews.referer
          }
        })
      }

      this.setStorage(this.namespace)
      this.updateThirdParty()
    }
  }

  /** 下载预数据 */
  getThirdParty = async () => {
    try {
      const data = await get(`douban_${this.subjectId}`)
      if (!data) return true

      const { ts, videos = [], epsThumbs = [], epsThumbsHeader = {} } = data
      if (
        videos.length + epsThumbs.length <= 2 ||
        getTimestamp() - ts >= 60 * 60 * 24 * 7
      ) {
        return true
      }

      this.setState({
        videos,
        epsThumbs,
        epsThumbsHeader
      })
      this.setStorage(this.namespace)

      return false
    } catch (error) {
      return true
    }
  }

  /** 上传预数据 */
  updateThirdParty = () => {
    setTimeout(() => {
      update(`douban_${this.subjectId}`, {
        videos: this.state.videos,
        epsThumbs: this.state.epsThumbs,
        epsThumbsHeader: this.state.epsThumbsHeader
      })
    }, 0)
  }
}
