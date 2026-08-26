/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-26 22:16:28
 */
import { getBangumiUrl, HTMLDecode, HTMLTrim, postTask, unzipBangumiData } from '@utils'
import { search as searchMV } from '@utils/bilibili'
import { logger } from '@utils/dev'
import { getPreview, getTrailer, getVideo, matchGame, matchMovie, search } from '@utils/douban'
import { xhrCustom } from '@utils/fetch'
import { decode, get as protoGet } from '@utils/protobuf'
import { DEV, HOST_AC, HOST_AC_API, HOST_AC_M, WEB } from '@constants'
import Oss from './oss'

import type { Sites, DeepPartial } from '@types'

/** 一次启动内第三方请求频率限制 */
const GLOBAL_FETCH_LIMIT = DEV ? 1 : 8
let globalFetchThirdPartyCount = 0

/** 第三方内容源 (bangumi-data / douban / bilibili) */
export default class ThirdParty extends Oss {
  /**
   * 装载第三方数据
   *  - bangumi-data
   *  - 章节缩略图
   * */
  fetchThirdParty = async (data: { name: string }) => {
    await decode('bangumi-data')

    /**
     * 压缩的 bangumi-data 数据
     * - 若匹配到数据, 使用其中的 sites 数据进行对应平台 api 查找缩略图
     * */
    const item = protoGet('bangumi-data').find(
      item =>
        item.id == this.subjectId ||
        item.j === HTMLDecode(data.name) ||
        item.c === HTMLDecode(data.name)
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

    /** 检测云端数据 */
    const needUpdate = await this.getThirdParty()
    if (!needUpdate || WEB) return

    if (globalFetchThirdPartyCount >= GLOBAL_FETCH_LIMIT) {
      logger.warn('fetchThirdParty', 'limit denied')
      return false
    }
    globalFetchThirdPartyCount += 1

    if (unzipItem) {
      postTask(() => {
        this.fetchEpsThumbs(unzipItem)
      }, 0)
    }

    // 若没有匹配到, 在 donban 查找
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

  /** 获取章节的缩略图 */
  fetchEpsThumbs = async (bangumiData: ReturnType<typeof unzipBangumiData>) => {
    if (WEB) return false

    if (this.state.epsThumbs.length >= 12) return false

    try {
      // 尝试从 douban 找
      const cn = bangumiData?.titleTranslate?.['zh-Hans']?.[0]
      const jp = bangumiData.title
      await this.fetchMovieFromDouban(cn, jp)

      /**
       * douban 已有结果则不再请求平台
       * @note epsThumbsHeader 只有一个 Referer, 多平台图片混用必裂图, 只取第一个命中的平台
       */
      if (this.state.epsThumbs.length) return true

      const allThumbs: string[] = []
      let thumbsHeader: Record<string, string> = {}

      // bilibili
      if (!allThumbs.length && this.bilibiliSite.id) {
        try {
          const url = getBangumiUrl(this.bilibiliSite)
          const { _response } = await xhrCustom({ url })
          const match = _response.match(/"season_id":(\d+)/)
          if (match) {
            const seasonId = match[1]
            const { _response } = await xhrCustom({
              url: `${HOST_AC_API}/pgc/web/season/section?season_id=${seasonId}`
            })
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
          const { _response } = await xhrCustom({ url })
          const match = _response.match(/showid:"(\d+)"/)
          if (match) {
            const showid = match[1]
            const { _response } = await xhrCustom({
              url: `https://list.youku.com/show/module?id=${showid}&tab=point&callback=jQuery`
            })
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
          const { _response } = await xhrCustom({ url })
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

  /** 从 donban 匹配条目, 并获取官方剧照信息 */
  fetchMovieFromDouban = async (cn: string, jp: string) => {
    if (WEB || this.nsfw) return false

    const q = cn || jp
    if (q) {
      const result = await search(q)
      const doubanId = matchMovie(q, result, jp, this.year)

      const [trailer, preview] = await Promise.all([getTrailer(doubanId), getPreview(doubanId)])

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
      }
    }
  }

  /** 从 donban 匹配条目, 并获取预告视频 */
  fetchGameFromDouban = async (cn: string, jp: string) => {
    if (WEB || this.nsfw) return false

    const q = cn || jp
    if (q) {
      const result = await search(q, 'game')
      const doubanId = matchGame(q, result)

      const [videos, previews] = await Promise.all([
        getVideo(doubanId, 'game'),
        getPreview(doubanId, 'game')
      ])

      const updates: DeepPartial<typeof this.state> = {}
      if (videos.data.length) {
        updates.videos = videos.data
        updates.epsThumbsHeader = { Referer: videos.referer }
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
}
