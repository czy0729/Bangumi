/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 14:22:29
 */
import bangumiData from '@assets/json/thirdParty/bangumiData.min.json'
import {
  collectionStore,
  subjectStore,
  systemStore,
  monoStore,
  usersStore
} from '@stores'
import {
  HTMLDecode,
  HTMLTrim,
  getBangumiUrl,
  getTimestamp,
  unzipBangumiData,
  omit,
  opitimize,
  titleCase,
  queue
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
import { search as searchMV } from '@utils/bilibili'
import { get, update } from '@utils/kv'
import { API_ANITABI, CDN_EPS, SITES, STORYBOOK } from '@constants'
import { UserId } from '@types'
import Computed from './computed'
import { NAMESPACE } from './ds'
import { AnitabiData } from './types'

export default class Fetch extends Computed {
  /**
   * 条目信息
   * @opitimize 60s
   */
  fetchSubject = () => {
    if (this.subject._responseGroup !== 'large' && opitimize(this.subject, 60)) {
      return this.subject
    }

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

  /** 装载云端条目缓存数据 */
  fetchSubjectFromOSS = async () => {
    if (this.subjectFormHTML._loaded) return

    try {
      const data = await get(`subject_${this.subjectId}`)

      // 云端没有数据存在, 本地计算后上传
      if (!data) {
        this.updateSubjectThirdParty()
        return
      }

      const { ts, ...subject } = data
      const _loaded = getTimestamp()
      if (typeof subject === 'object' && !Array.isArray(subject)) {
        this.setState({
          subject: {
            ...subject,
            _loaded
          }
        })
      }

      if (_loaded - ts >= 60 * 60 * 24 * 7) this.updateSubjectThirdParty()
    } catch (error) {}
  }

  /** 私有 CDN 的条目信息 */
  fetchSubjectFormCDN = async () => {
    const { setting } = systemStore
    const { _loaded } = this.subjectFormHTML
    if (!setting.cdn || _loaded) return true
    return subjectStore.fetchSubjectFormCDN(this.subjectId)
  }

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
    } else if (this.type === '音乐') {
      // 此方法需要用到 subjectFromHTML.info 需要延迟一下
      setTimeout(() => {
        this.fetchMVFromBilibili(this.cn, this.jp, this.artist)
      }, 2000)
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

  private _fetchTrackUsersInfo = false

  /** 更新追踪特定用户的用户信息 */
  fetchTrackUsersInfo = async (userIds: UserId[]) => {
    if (this._fetchTrackUsersInfo || !userIds.length) return false

    await usersStore.init('usersInfo')

    for (let i = 0; i < userIds.length; i += 1) {
      const userId = userIds[i]
      const users = usersStore.usersInfo(userId)
      if (!users._loaded) {
        const data = await usersStore.fetchUsers({
          userId
        })
        if (data.userId) {
          usersStore.updateUsersInfo({
            avatar: data.avatar,
            userId: data.userId,
            userName: data.userName
          })
        }
      }
    }

    this._fetchTrackUsersInfo = true
  }

  /** 特别关注 */
  fetchTrackComments = () => {
    if (!this.subjectTypeValue) return false

    const userIds = systemStore.setting[`comment${titleCase(this.subjectTypeValue)}`]
    if (!userIds?.length) return false

    const fetchs = []
    const now = getTimestamp()
    userIds.forEach(item => {
      const collection = collectionStore.usersSubjectCollection(item, this.subjectId)
      if (!collection._loaded || now - Number(collection._loaded) >= 60 * 60) {
        fetchs.push(() => collectionStore.fetchUsersCollection(item, this.subjectId))
      }
    })

    setTimeout(() => {
      this.fetchTrackUsersInfo(userIds)
    }, 0)
    return queue(fetchs, 1)
  }

  /** 获取单集播放源 */
  fetchEpsData = async () => {
    if (STORYBOOK) return false

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
    if (STORYBOOK) return false

    if (this.state.epsThumbs.length >= 12) return false

    try {
      // 尝试从 douban 找
      const cn = bangumiData?.titleTranslate?.['zh-Hans']?.[0]
      const jp = bangumiData.title
      await this.fetchMovieFromDouban(cn, jp)

      // bilibili
      if (this.state.epsThumbs.length < 12 && this.bilibiliSite.id) {
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
    } catch (error) {
      console.error('Subject', 'fetchEpsThumbs', error)
    }
  }

  /** 从 donban 匹配条目, 并获取官方剧照信息 */
  fetchMovieFromDouban = async (cn: string, jp: string) => {
    if (STORYBOOK || this.x18) return false

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
          epsThumbs: preview.data.slice().reverse(),
          epsThumbsHeader: {
            Referer: preview.referer
          }
        })
      }

      this.setStorage(this.namespace)
      this.updateThirdParty()
    }
  }

  /** 从 donban 匹配条目, 并获取预告视频 */
  fetchGameFromDouban = async (cn: string, jp: string) => {
    if (STORYBOOK || this.x18) return false

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

  /** 从 bilibili 匹配音乐 MV */
  fetchMVFromBilibili = async (cn: string, jp: string, artist: string) => {
    if (STORYBOOK) return false

    const videos = await searchMV(cn || jp, artist)
    if (videos.length) {
      this.setState({
        videos,
        epsThumbsHeader: {
          Referer: 'https://m.bilibili.com'
        }
      })

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
        // 数量不够更新
        videos.length + epsThumbs.length <= 2 ||
        // 7 天更新一次
        getTimestamp() - ts >= 60 * 60 * 24 * 7 ||
        // 最后一次逻辑修正的时间戳
        ts < 1682762759
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

  /** 上传条目预数据 */
  updateSubjectThirdParty = () => {
    setTimeout(() => {
      const { _loaded, formhash } = this.subjectFormHTML

      // formhash 是登录并且可操作条目的用户的必有值
      if (!_loaded || !formhash) return

      update(`subject_${this.subjectId}`, {
        ...omit(this.subjectFormHTML, [
          'type',
          'watchedEps',
          'friend',
          'who',
          'formhash',
          '_loaded'
        ]),
        id: this.subjectId,
        type: this.subject.type,
        name: this.jp,
        name_cn: this.cn,
        image: this.subject.images?.common,
        eps: this.eps,
        collection: this.subjectCollection,
        summary: this.summary,
        rating: this.rating,
        rank: this.subject.rank || '',
        character: this.crt,
        staff: this.staff,
        titleLabel: this.titleLabel
      })
    }, 10000)
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

  /** 获取圣地巡游信息 */
  fetchAnitabi = async () => {
    if (STORYBOOK) return false

    const { showAnitabi } = systemStore.setting
    if (showAnitabi === -1 || !showAnitabi) return false

    const { _loaded } = this.state.anitabi
    if (_loaded && getTimestamp() - Number(_loaded) <= 60 * 60 * 24) return true

    try {
      const key = `anitabi_${this.subjectId}`
      const cloud = await get(key)
      if (cloud?._loaded && getTimestamp() - Number(cloud?._loaded) <= 60 * 60 * 24) {
        this.setState({
          anitabi: cloud
        })
        return true
      }

      const { _response } = await xhrCustom({
        url: API_ANITABI(this.subjectId)
      })
      const data: AnitabiData = _response.length ? JSON.parse(_response) : {}

      let anitabi: any
      if (!data?.litePoints?.length) {
        anitabi = {
          _loaded: getTimestamp()
        }
        this.setState({
          anitabi: {
            _loaded: getTimestamp()
          }
        })
      } else {
        anitabi = {
          ...data,
          _loaded: getTimestamp()
        }
      }
      this.setState({
        anitabi
      })
      this.setStorage(this.namespace)

      setTimeout(() => {
        update(key, anitabi)
      }, 0)

      return true
    } catch (error) {
      return false
    }
  }
}
