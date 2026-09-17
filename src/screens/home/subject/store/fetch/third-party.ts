/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 07:24:33
 */
import { getBangumiUrl, HTMLDecode, HTMLTrim, postTask, unzipBangumiData } from '@utils'
import { MAX_RESULTS, search as searchMV } from '@utils/bilibili'
import { logger } from '@utils/dev'
import {
  getManualDoubanId,
  getPreview,
  getTrailer,
  getVideo,
  matchGame,
  matchMovie,
  search
} from '@utils/douban'
import { xhrTimeout } from '@utils/fetch'
import { decode, get as protoGet } from '@utils/thirdParty/protobuf'
import { DEV, HOST_AC, HOST_AC_API, HOST_AC_M, WEB } from '@constants'
import Oss from './oss'

import type { Sites, DeepPartial } from '@types'
import type { Cat, DoubanId, SearchItem } from '@utils/douban/types'

/** 一次启动内第三方请求频率限制 */
const GLOBAL_FETCH_LIMIT = DEV ? 4 : 8
let globalFetchThirdPartyCount = 0

/** 未走到平台匹配的原因 */
type MatchSkip = 'web' | 'nsfw' | 'no-query'

/** 手动刷新的结果 (timeout 表示已放弃等待, 后台可能稍后才拿到数据) */
export type ThumbsRefreshResult = 'updated' | 'empty' | 'timeout'

/** 手动刷新整体超时阈值 (保证 loading 一定复位) */
const REFRESH_THUMBS_TIMEOUT = 30000

/** 第三方内容源 (条目数据 / 剧照平台 / 视频平台) */
export default class ThirdParty extends Oss {
  /** 平台匹配诊断日志 (单行 JSON, 仅 DEV): candidates 按实际传入顺序输出, 不重排 */
  private logDoubanMatch = ({
    cat,
    q,
    jp,
    result = [],
    doubanId = false,
    skip,
    manual = false
  }: {
    /** 匹配品类 */
    cat: Cat

    /** 查询词 */
    q: string

    /** 原名 */
    jp: string

    /** 搜索返回的全部候选 */
    result?: SearchItem[]

    /** 命中的 id */
    doubanId?: DoubanId

    /** 未走到匹配时的原因 */
    skip?: MatchSkip

    /** 是否来自手动映射 */
    manual?: boolean
  }) => {
    if (!DEV) return

    /** 命中项反查, 便于肉眼核对是否选错 */
    const hit = result.find(item => item.id === doubanId)
    this.log(
      'doubanMatch',
      JSON.stringify({
        tag: 'doubanMatch',
        cat,
        type: this.type,
        subjectId: this.subjectId,
        q,
        jp,
        year: this.year,
        skip: skip || '',
        manual,
        doubanId,
        hit: hit ? [hit.id, hit.title, hit.year] : null,
        /**
         * 前四位与测试候选构造器口径一致 (id / title / name / year)
         *  - game 用 desc 取代 year, 因为 matchGame 读的是 desc
         *  - 影视第五列为接口原始顺序 index, search 会重排, index 是还原接口顺序的唯一凭据
         * */
        candidates: result.map(item =>
          cat === 'game'
            ? [item.id, item.title, item.name, item.desc]
            : [item.id, item.title, item.name, item.year, item.index]
        )
      })
    )
  }

  /**
   * 匹配 bangumi-data 条目信息
   *  - 自动流程与手动刷新共用, 保证平台站点数据 (bangumiInfo) 就绪
   * */
  private resolveBangumiData = async (name: string) => {
    await decode('bangumi-data')

    /**
     * 压缩的 bangumi-data 数据
     * - 若匹配到数据, 使用其中的 sites 数据进行对应平台 api 查找缩略图
     * */
    const item = protoGet('bangumi-data').find(
      item =>
        item.id == this.subjectId || item.j === HTMLDecode(name) || item.c === HTMLDecode(name)
    )

    /** 解压的 bangumi-data 数据  */
    let unzipItem: ReturnType<typeof unzipBangumiData>
    if (item) {
      unzipItem = unzipBangumiData(item)
      this.setState({
        bangumiInfo: {
          sites: unzipItem.sites as { site: Sites; id: string }[],
          type: unzipItem.type
        }
      })
    }

    return { item, unzipItem }
  }

  /**
   * 装载第三方数据
   *  - bangumi-data
   *  - 章节缩略图
   * @param force 手动刷新时绕过云端缓存与全局限额判断 (自动流程不带此参数, 行为不变)
   * */
  fetchThirdParty = async (data: { name: string }, force: boolean = false) => {
    try {
      const { item, unzipItem } = await this.resolveBangumiData(data.name)

      /** 检测云端数据 (手动刷新时跳过) */
      const needUpdate = force ? true : await this.getThirdParty()
      if (!needUpdate || WEB) return

      /** 手动刷新不占用自动流程的全局额度 */
      if (!force) {
        if (globalFetchThirdPartyCount >= GLOBAL_FETCH_LIMIT) {
          logger.warn('fetchThirdParty', 'limit denied')
          return false
        }
        globalFetchThirdPartyCount += 1
      }

      if (unzipItem) {
        postTask(() => {
          this.fetchEpsThumbs(unzipItem, force)
        }, 0)
      }

      // 若没有匹配到, 在剧照平台 / 视频平台 查找
      if (!item && this.type === '动画') {
        this.fetchMovieFromDouban(this.cn, this.jp)
      } else if (this.type === '三次元') {
        /** 剧照平台优先, 视频条数不足返回上限时再从视频平台补齐 */
        this.fetchMovieFromDouban(this.cn, this.jp).then(updated => {
          if (!updated && this.state.videos.length < MAX_RESULTS) {
            this.fetchVideoFromBilibili(this.cn, this.jp)
          }
        })
      } else if (this.type === '书籍') {
        /** 书籍不请求视频 (暂时关闭) */
        // this.fetchVideoFromBilibili('', this.jp)
      } else if (this.type === '游戏') {
        this.fetchGameFromDouban(this.cn, this.jp)
      } else if (this.type === '音乐') {
        // 此方法需要用到 subjectFromHTML.info 需要延迟一下
        postTask(() => {
          this.fetchMVFromBilibili(this.cn, this.jp, this.artist)
        }, 2400)
      }
    } catch (error) {
      /** 抓取异常不外抛 */
      logger.error(this.namespace, 'fetchThirdParty', error)
    }
  }

  /**
   * 手动强制重新抓取预览截图
   *  - 绕过云端 7 天缓存 / 章节截图数量锁 / 全局第三方限额, 仅由用户主动触发
   *  - 来源分发与自动流程一致: 原站优先, 本轮未命中才回落到平台
   * @returns 截图或视频数据是否发生变化
   * */
  refreshThumbs = async (): Promise<ThumbsRefreshResult> => {
    if (WEB || this.state.thumbsRefreshing) return 'empty'

    /** 变更判定含内容: 只看条数会漏掉「内容变了但条数不变」 */
    const snapshot = () => {
      const thumbs = this.state.epsThumbs.join('|')
      const videos = this.state.videos.map(item => item.href).join('|')
      return `${thumbs}_${videos}`
    }
    const before = snapshot()
    let timer: ReturnType<typeof setTimeout> | undefined
    let timedOut = false

    this.setState({
      thumbsRefreshing: true
    })

    try {
      /** 整体兜总超时: 任一环节挂起都不能让 loading 一直转 */
      await Promise.race([
        this.runRefreshThumbs(),
        new Promise<void>(resolve => {
          timer = setTimeout(() => {
            timedOut = true
            resolve()
          }, REFRESH_THUMBS_TIMEOUT)
        })
      ])
    } catch (error) {
      logger.error(this.namespace, 'refreshThumbs', error)
    } finally {
      clearTimeout(timer)
      this.setState({
        thumbsRefreshing: false
      })
    }

    const changed = before !== snapshot()
    this.log('refreshThumbs', {
      subjectId: this.subjectId,
      type: this.type,
      cn: this.cn,
      jp: this.jp,
      timedOut,
      changed,
      referer: this.state.epsThumbsHeader?.Referer,
      thumbs: this.state.epsThumbs,
      videos: this.state.videos.map(item => item.href)
    })

    if (timedOut) return 'timeout'
    return changed ? 'updated' : 'empty'
  }

  /** 手动刷新主体 (由 refreshThumbs 统一兜总超时) */
  private runRefreshThumbs = async () => {
    const { item, unzipItem } = await this.resolveBangumiData(this.cn || this.jp)

    if (unzipItem) await this.fetchEpsThumbs(unzipItem, true)

    /** 分发与自动流程 (fetchThirdParty) 保持一致, 避免两边漂移 */
    if (!item && this.type === '动画') {
      await this.fetchMovieFromDouban(this.cn, this.jp)
    } else if (this.type === '三次元') {
      /** 剧照平台优先; 手动刷新不判条数, 总是重搜一次以应用最新的排序与补齐 */
      await this.fetchMovieFromDouban(this.cn, this.jp)
      await this.fetchVideoFromBilibili(this.cn, this.jp)
    } else if (this.type === '书籍') {
      /** 书籍不请求视频 (暂时关闭) */
      // await this.fetchVideoFromBilibili('', this.jp)
    } else if (this.type === '游戏') {
      await this.fetchGameFromDouban(this.cn, this.jp)
    } else if (this.type === '音乐') {
      await this.fetchMVFromBilibili(this.cn, this.jp, this.artist)
    }
  }

  /**
   * 获取章节的缩略图
   * @param force 手动刷新时跳过数量锁, 并以本轮原站是否命中来决定是否回落平台重抓
   * */
  fetchEpsThumbs = async (
    bangumiData: ReturnType<typeof unzipBangumiData>,
    force: boolean = false
  ) => {
    if (WEB) return false

    if (!force && this.state.epsThumbs.length >= 12) return false

    try {
      // 尝试从剧照平台找
      const cn = bangumiData?.titleTranslate?.['zh-Hans']?.[0]
      const jp = bangumiData.title
      const doubanUpdated = await this.fetchMovieFromDouban(cn, jp)

      /**
       * 剧照平台已有结果则不再请求视频平台
       * @note epsThumbsHeader 只有一个 Referer, 多平台图片混用必裂图, 只取第一个命中的平台
       * @note 手动刷新时改判本轮原站是否真的抓到数据, 未命中才会真正重抓平台截图
       */
      if (force ? doubanUpdated : this.state.epsThumbs.length) return true

      const allThumbs: string[] = []
      let thumbsHeader: Record<string, string> = {}

      // 视频平台
      if (!allThumbs.length && this.bilibiliSite.id) {
        try {
          const url = getBangumiUrl(this.bilibiliSite)
          const { _response } = await xhrTimeout(url)
          const match = _response.match(/"season_id":(\d+)/)
          if (match) {
            const seasonId = match[1]
            const { _response } = await xhrTimeout(
              `${HOST_AC_API}/pgc/web/season/section?season_id=${seasonId}`
            )
            const { message, result } = JSON.parse(_response) as {
              message: string
              result?: { main_section?: { episodes: { cover: string }[] } }
            }
            if (message === 'success' && result?.main_section?.episodes) {
              const thumbs = result.main_section.episodes.map(
                (item: { cover: string }) =>
                  `${item.cover.replace('http://', 'https://')}@192w_120h_1c.jpg`
              )
              allThumbs.push(...thumbs)
              thumbsHeader = { Referer: `${HOST_AC}/` }
            }
          }
        } catch {}
      }

      // 优酷
      if (!allThumbs.length && this.youkuSite.id) {
        try {
          const url = getBangumiUrl(this.youkuSite)
          const { _response } = await xhrTimeout(url)
          const match = _response.match(/showid:"(\d+)"/)
          if (match) {
            const showid = match[1]
            const { _response } = await xhrTimeout(
              `https://list.youku.com/show/module?id=${showid}&tab=point&callback=jQuery`
            )
            const thumbs = (
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

            allThumbs.push(...thumbs)
            thumbsHeader = { Referer: 'https://list.youku.com/' }
          }
        } catch {}
      }

      // 爱奇艺
      if (!allThumbs.length && this.iqiyiSite.id) {
        try {
          const url = getBangumiUrl(this.iqiyiSite)
          const { _response } = await xhrTimeout(url)
          const match = HTMLTrim(_response, true).match(/data-jpg-img="(.+?)"/g)
          if (match) {
            const thumbs = match
              .map((item: string) => `https:${item.replace(/(data-jpg-img="|")/g, '')}`)
              .filter((_item: string, index: number) => !!index)

            allThumbs.push(...thumbs)
            thumbsHeader = { Referer: 'https://www.iqiyi.com/' }
          }
        } catch {}
      }

      // qq 网站没有截屏, 不找

      // 统一更新状态
      if (allThumbs.length) {
        this.setState({
          epsThumbs: Array.from(new Set(allThumbs)),
          epsThumbsHeader: thumbsHeader
        })
        this.save()
        this.updateThirdParty()
      }
    } catch (error) {
      logger.error(this.namespace, 'fetchEpsThumbs', error)
    }
  }

  /**
   * 从剧照平台匹配条目, 并获取官方剧照信息
   * @returns 本轮是否抓取到数据
   * */
  fetchMovieFromDouban = async (cn: string, jp: string) => {
    if (WEB || this.nsfw) {
      this.logDoubanMatch({
        cat: 'subject',
        q: cn || jp,
        jp,
        skip: WEB ? 'web' : 'nsfw'
      })
      return false
    }

    try {
      /** 手动映射优先 */
      const manualId = getManualDoubanId(this.subjectId)
      const q = cn || jp
      if (manualId || q) {
        const result = manualId ? [] : await search(q)
        const doubanId = manualId || matchMovie(q, result, jp, this.year)

        /** 匹配诊断日志 (早于取图) */
        this.logDoubanMatch({
          cat: 'subject',
          q,
          jp,
          result,
          doubanId,
          manual: !!manualId
        })

        const [trailer, preview] = await Promise.all([getTrailer(doubanId), getPreview(doubanId)])

        this.log('fetchMovieFromDouban', {
          q,
          jp,
          year: this.year,
          doubanId,
          referer: preview.referer || trailer.referer,
          trailer: trailer.data.length,
          preview: preview.data.length
        })

        const updates: DeepPartial<typeof this.state> = {}
        if (trailer.data.length) {
          updates.videos = trailer.data
          updates.epsThumbsHeader = { Referer: trailer.referer }
        }
        if (preview.data.length) {
          updates.epsThumbs = preview.data.slice().reverse()
          updates.epsThumbsHeader = { ...updates.epsThumbsHeader, Referer: preview.referer }
        }

        if (Object.keys(updates).length) {
          this.setState(updates)
          this.save()
          this.updateThirdParty()
          return true
        }
      } else {
        /** 查询词为空, 未走到匹配 */
        this.logDoubanMatch({
          cat: 'subject',
          q,
          jp,
          skip: 'no-query'
        })
      }
    } catch (error) {
      /** 抓取异常不外抛 */
      logger.error(this.namespace, 'fetchMovieFromDouban', error)
    }

    return false
  }

  /** 从剧照平台匹配条目, 并获取预告视频 */
  fetchGameFromDouban = async (cn: string, jp: string) => {
    if (WEB || this.nsfw) {
      this.logDoubanMatch({
        cat: 'game',
        q: cn || jp,
        jp,
        skip: WEB ? 'web' : 'nsfw'
      })
      return false
    }

    try {
      /** 手动映射优先 */
      const manualId = getManualDoubanId(this.subjectId)
      const q = cn || jp
      if (manualId || q) {
        const result = manualId ? [] : await search(q, 'game')
        const doubanId = manualId || matchGame(q, result)

        /** 匹配诊断日志 (candidates 带 desc) */
        this.logDoubanMatch({
          cat: 'game',
          q,
          jp,
          result,
          doubanId,
          manual: !!manualId
        })

        const [videos, previews] = await Promise.all([
          getVideo(doubanId, 'game'),
          getPreview(doubanId, 'game')
        ])

        const updates: DeepPartial<typeof this.state> = {}
        if (videos.data.length) {
          updates.videos = videos.data
          updates.epsThumbsHeader = { Referer: videos.referer }
        } else {
          /** 剧照平台没有视频, 回落到视频平台搜索 (该方法自行落库, 游戏带类型后缀) */
          await this.fetchVideoFromBilibili(q, '', this.gameInfo?.isADV ? 'OP' : 'PV')
        }
        if (previews.data.length) {
          updates.epsThumbs = previews.data
          updates.epsThumbsHeader = { ...updates.epsThumbsHeader, Referer: previews.referer }
        }

        if (Object.keys(updates).length) {
          this.setState(updates)
          this.save()
          this.updateThirdParty()
        }
      } else {
        /** 查询词为空, 未走到匹配 */
        this.logDoubanMatch({
          cat: 'game',
          q,
          jp,
          skip: 'no-query'
        })
      }
    } catch (error) {
      /** 抓取异常不外抛 */
      logger.error(this.namespace, 'fetchGameFromDouban', error)
    }
  }

  /**
   * 从视频平台按标题搜索
   *  - 剧照平台没有数据 / 不适用剧照平台的类型 (三次元 / 书籍) 统一走这里
   *  - cn 传空字符串表示只用原名搜索 (书籍的中文译名与视频标题对不上)
   *  - suffix 是类型后缀, 只有游戏允许传 OP / PV; 传了才做收窄重搜, 过滤基准仍是原标题
   * */
  fetchVideoFromBilibili = async (
    cn: string,
    jp: string,
    suffix: 'OP' | 'PV' | '' = ''
  ): Promise<boolean> => {
    if (WEB || this.nsfw) return false

    const q = cn || jp
    if (!q) return false

    try {
      let videos = await searchMV(q, '')
      if (!videos.length && suffix) {
        videos = await searchMV(`${q} ${suffix}`, '', q)
      }
      if (!videos.length) return false

      this.setState({
        videos: videos.map(item => ({
          cover: item.cover,
          title: item.title,
          href: item.href,
          src: ''
        })),
        epsThumbsHeader: { Referer: HOST_AC_M }
      })

      this.save()
      this.updateThirdParty()
      return true
    } catch (error) {
      /** 抓取异常不外抛 */
      logger.error(this.namespace, 'fetchVideoFromBilibili', error)
    }

    return false
  }

  /** 从视频平台匹配音乐 MV */
  fetchMVFromBilibili = async (cn: string, jp: string, artist: string) => {
    if (WEB) return false

    try {
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
    } catch (error) {
      /** 抓取异常不外抛 */
      logger.error(this.namespace, 'fetchMVFromBilibili', error)
    }
  }
}
