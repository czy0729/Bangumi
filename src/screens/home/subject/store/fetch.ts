/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-15 05:34:02
 */
import {
  collectionStore,
  monoStore,
  otaStore,
  subjectStore,
  systemStore,
  usersStore
} from '@stores'
import {
  getBangumiUrl,
  getStorage,
  getTimestamp,
  HTMLDecode,
  HTMLTrim,
  omit,
  opitimize,
  postTask,
  queue,
  setStorage,
  titleCase,
  unzipBangumiData
} from '@utils'
import { search as searchMV } from '@utils/bilibili'
import { getPreview, getTrailer, getVideo, matchGame, matchMovie, search } from '@utils/douban'
import { xhrCustom } from '@utils/fetch'
import { get, update } from '@utils/kv'
import { decode, get as protoGet } from '@utils/protobuf'
import {
  API_ANITABI,
  CDN_EPS,
  D1,
  D7,
  H1,
  HOST_AC,
  HOST_AC_API,
  HOST_AC_M,
  M5,
  SITES,
  WEB
} from '@constants'
import { UserId } from '@types'
import { AnitabiData } from '../types'
import Computed from './computed'
import { NAMESPACE } from './ds'

export default class Fetch extends Computed {
  /**
   * 条目信息
   * @opitimize 60s
   */
  fetchSubject = () => {
    if (this.subject._responseGroup !== 'large' && opitimize(this.subject, M5)) {
      return this.subject
    }

    return subjectStore.fetchSubject(this.subjectId)
  }

  /** 网页的条目信息 (书籍只有网页端有数据源, 需要初始值) */
  fetchSubjectFromHTML = async (refresh: boolean = false) => {
    if (!refresh && opitimize(this.subjectFormHTML, M5)) return false

    const data = await subjectStore.fetchSubjectFromHTML(this.subjectId)
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
    if (this.subjectFormHTML._loaded && (this.cn || this.jp)) return

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

      if (_loaded - ts >= D7) this.updateSubjectThirdParty()
    } catch (error) {}
  }

  /** 装载云端条目留言缓存数据 */
  fetchCommentsFromOSS = async () => {
    if (this.subjectComments._loaded) return

    try {
      const data = await get(`comments_${this.subjectId}`)

      // 云端没有数据存在, 本地计算后上传
      if (!data) {
        this.updateCommentsThirdParty()
        return
      }

      const { ts, ...comments } = data
      const _loaded = getTimestamp()
      if (typeof comments === 'object') {
        this.setState({
          comments
        })
      }

      if (_loaded - ts >= D1) this.updateCommentsThirdParty()
    } catch (error) {}
  }

  /** 装载第三方数据 */
  fetchThirdParty = async (data: { name: string }) => {
    await decode('bangumi-data')

    // 若匹配到 bangumi-data 数据, 使用其中的 sites 数据进行对应平台 api 查找缩略图
    const item = protoGet('bangumi-data').find(
      item =>
        item.id == this.subjectId ||
        item.j === HTMLDecode(data.name) ||
        item.c === HTMLDecode(data.name)
    )

    let _item: ReturnType<typeof unzipBangumiData>
    if (item) {
      _item = unzipBangumiData(item)
      this.setState({
        bangumiInfo: {
          sites: _item.sites as any,
          type: _item.type
        }
      })
    }

    // 先检测云端数据
    const needUpdate = await this.getThirdParty()
    if (!needUpdate) return

    if (WEB) return

    if (item) {
      postTask(() => {
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
      postTask(() => {
        this.fetchMVFromBilibili(this.cn, this.jp, this.artist)
      }, 2400)
    }
  }

  /** 用户每集收看进度 */
  fetchCollection = () => {
    return collectionStore.fetchCollection(this.subjectId)
  }

  /** 条目留言 */
  fetchSubjectComments = async (refresh?: boolean, reverse?: boolean) => {
    const data = await subjectStore.fetchSubjectComments(
      {
        subjectId: this.subjectId,
        interest_type: this.state.filterStatus,
        version: this.state.filterVersion
      },
      refresh,
      reverse
    )
    this.updateCommentsThirdParty()
    return data
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
      if (!collection._loaded || now - Number(collection._loaded) >= H1) {
        fetchs.push(() => collectionStore.fetchUsersCollection(item, this.subjectId))
      }
    })

    postTask(() => {
      this.fetchTrackUsersInfo(userIds)
    }, 0)
    return queue(fetchs, 1)
  }

  /** 获取单集播放源 */
  fetchEpsData = async () => {
    if (this.type !== '动画' || this.nsfw || opitimize(this.state.epsData, D7)) return false

    const epsData = {
      _loaded: getTimestamp()
    }

    try {
      const { _response } = await xhrCustom({
        url: CDN_EPS(this.subjectId)
      })

      SITES.forEach(item => (epsData[item] = {}))
      JSON.parse(_response).eps.forEach((item: any, index: number) => {
        item.sites.forEach((i: any) => {
          if (SITES.includes(i.site)) epsData[i.site][index] = i.url
        })
      })
    } catch (error) {
      console.error(NAMESPACE, 'fetchEpsData', error)
    }

    this.setState({
      epsData
    })
    this.save()
  }

  /** staff 数据 */
  fetchPersons = () => {
    return monoStore.fetchPersons({
      subjectId: this.subjectId
    })
  }

  /** 获取章节的缩略图 */
  fetchEpsThumbs = async (bangumiData: ReturnType<typeof unzipBangumiData>) => {
    if (WEB) return false

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
            url: `${HOST_AC_API}/pgc/web/season/section?season_id=${seasonId}`
          })
          const { message, result } = JSON.parse(_response)
          if (message === 'success' && result?.main_section?.episodes) {
            this.setState({
              epsThumbs: Array.from(
                new Set(
                  result.main_section.episodes.map(
                    (item: { cover: string }) =>
                      `${item.cover.replace('http://', 'https://')}@192w_120h_1c.jpg`
                  )
                )
              ),
              epsThumbsHeader: {
                Referer: `${HOST_AC}/`
              }
            })
            this.save()
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
                  .map((item: string) => {
                    const match = item.match(/src="(.+?)"/)
                    if (match) {
                      return match[1].replace(/\\\//g, '/').replace('http://', 'https://')
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
          this.save()
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
                  .map((item: string) => `https:${item.replace(/(data-jpg-img="|")/g, '')}`)
                  .filter((_item: any, index: number) => !!index)
              )
            ),
            epsThumbsHeader: {
              Referer: 'https://www.iqiyi.com/'
            }
          })
          this.save()
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
    if (WEB || this.nsfw) return false

    const q = cn || jp
    if (q) {
      const result = await search(q)
      const doubanId = matchMovie(q, result, jp, this.year)
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

      this.save()
      this.updateThirdParty()
    }
  }

  /** 从 donban 匹配条目, 并获取预告视频 */
  fetchGameFromDouban = async (cn: string, jp: string) => {
    if (WEB || this.nsfw) return false

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

      this.save()
      this.updateThirdParty()
    }
  }

  /** 从 bilibili 匹配音乐 MV */
  fetchMVFromBilibili = async (cn: string, jp: string, artist: string) => {
    if (WEB) return false

    const videos = await searchMV(cn || jp, artist)
    if (videos.length) {
      this.setState({
        videos,
        epsThumbsHeader: {
          Referer: HOST_AC_M
        }
      })

      this.save()
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
        getTimestamp() - ts >= D7 ||
        // 最后一次逻辑修正的时间戳
        ts < getTimestamp('2024-09-10 18:00:00')
      ) {
        return true
      }

      this.setState({
        videos,
        epsThumbs,
        epsThumbsHeader
      })
      this.save()

      return false
    } catch (error) {
      return true
    }
  }

  /** 上传条目预数据 */
  updateSubjectThirdParty = () => {
    postTask(() => {
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

  /** 上传留言预数据 */
  updateCommentsThirdParty = () => {
    if (this.state.filterStatus !== '') return

    postTask(() => {
      const data = this.subjectComments

      // 不允许有自定义筛选过的数据同步到云端
      if (!data?.list?.length || !data?._loaded || data?.version || data?._reverse) {
        return false
      }

      update(`comments_${this.subjectId}`, {
        list: data.list.slice(0, 40),
        pagination: {
          page: 1,
          pageTotal: 1
        },
        _loaded: data._loaded,
        _reverse: false
      })
    }, 10000)
  }

  /** 上传预数据 */
  updateThirdParty = () => {
    postTask(() => {
      update(`douban_${this.subjectId}`, {
        videos: this.state.videos,
        epsThumbs: this.state.epsThumbs,
        epsThumbsHeader: this.state.epsThumbsHeader
      })
    }, 0)
  }

  /** 装载找条目快照数据 */
  fetchOTA = () => {
    if (this.type === '动画') {
      if (this.animeInfo?.i) otaStore.fetchAnime(this.animeInfo.i)
      return
    }

    if (this.type === '游戏') {
      if (this.gameInfo?.i) otaStore.fetchGame(this.gameInfo.i)
      return
    }
  }

  /** 获取圣地巡游信息 */
  fetchAnitabi = async () => {
    if (
      this.type !== '动画' ||
      this.nsfw ||
      systemStore.setting.showAnitabi === -1 ||
      !systemStore.setting.showAnitabi ||
      opitimize(this.state.anitabi, D1)
    ) {
      return false
    }

    const now = getTimestamp()
    const snapshotId = `anitabi_${this.subjectId}`
    try {
      const snapshot = await get(snapshotId)
      if (opitimize(snapshot, D1)) {
        this.setState({
          anitabi: {
            ...snapshot,
            _loaded: now
          }
        })
        return true
      }
    } catch (error) {}

    const fetchId = `fetchAnitabi|${this.subjectId}`
    let anitabi: Partial<AnitabiData> = {
      _loaded: now
    }
    try {
      const fetched = await getStorage(fetchId)
      if (!fetched) {
        const { _response } = await xhrCustom({
          url: API_ANITABI(this.subjectId)
        })
        const data: AnitabiData = _response.length ? JSON.parse(_response) : {}
        if (data?.litePoints?.length) {
          anitabi = {
            ...data,
            _loaded: now
          }
        }

        postTask(() => {
          update(snapshotId, anitabi)
        }, 0)
      }
    } catch (error) {
      setStorage(fetchId, true)
    }

    this.setState({
      anitabi
    })
    this.save()

    return true
  }

  /**
   * VIB 等评分数据
   * @opitimize 12h
   * */
  fetchVIB = async () => {
    if (
      systemStore.setting.hideScore ||
      systemStore.setting.showRating !== true ||
      opitimize(this.vib, D1)
    ) {
      return false
    }

    try {
      const snapshotId = `vib_${this.subjectId}`
      const snapshot = await get(snapshotId)
      if (snapshot?._loaded && getTimestamp() - Number(snapshot?._loaded) <= D1) {
        subjectStore.updateVIB(this.subjectId, snapshot)
        if (!snapshot?.avg) {
          postTask(() => {
            subjectStore.fetchVIB(this.subjectId)
          }, 0)
        }
        return true
      }

      await subjectStore.fetchVIB(this.subjectId)
      if (WEB) return true

      if (this.type === '动画') {
        await subjectStore.fetchMAL(this.subjectId, this.jp || this.cn)
        await subjectStore.fetchAniDB(this.subjectId, this.jp || this.cn)
      }
      if (this.vib._loaded) update(snapshotId, this.vib)

      return true
    } catch (error) {}

    return false
  }

  private _fetchPicTotal = false

  /** 获取图集关键字信息 */
  fetchPicTotal = async () => {
    if (this._fetchPicTotal) return false

    await monoStore.fetchPicTotalBatch(
      [...new Set([...this.subjectKeywords, ...this.crtKeywords])].filter(
        (_item, index) => index < 6
      )
    )

    this._fetchPicTotal = true
    return true
  }
}
