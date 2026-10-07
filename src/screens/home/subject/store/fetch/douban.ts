/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-06 06:01:41
 *
 * 剧照平台数据 (影视 / 游戏的预告与剧照)
 */
import { MAX_RESULTS } from '@utils/bilibili'
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
import { DEV, HOST_AC_M, WEB } from '@constants'
import Bilibili from './bilibili'

import type { DeepPartial } from '@types'
import type { Cat, DoubanId, SearchItem } from '@utils/douban/types'

/** 未走到平台匹配的原因 */
type MatchSkip = 'web' | 'nsfw' | 'no-query'

/** 剧照平台匹配与取图 */
export default class Douban extends Bilibili {
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
        }

        /**
         * 无剧照且视频不足 (≤2 条) 时才从视频平台补齐 (有剧照视为内容已足够)
         *  - 结果在前 / 视频平台结果在后, 截断到 MAX_RESULTS
         *  - 游戏带类型后缀 (ADV 搜 OP, 其余搜 PV)
         */
        if (!previews.data.length && videos.data.length <= 2) {
          const videosMV = await this.searchVideosFromBilibili(
            q,
            '',
            this.gameInfo?.isADV ? 'OP' : 'PV'
          )
          if (videosMV.length) {
            updates.videos = [...(updates.videos || []), ...videosMV].slice(0, MAX_RESULTS)
            if (!updates.epsThumbsHeader?.Referer) {
              updates.epsThumbsHeader = { ...updates.epsThumbsHeader, Referer: HOST_AC_M }
            }
          }
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
}
