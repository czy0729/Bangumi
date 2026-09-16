/*
 * @Author: czy0729
 * @Date: 2024-09-07 01:42:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 06:02:19
 */
import { randomizeImgHost } from '@utils'
import { getManualDoubanId, getPreview, matchMovie, search } from '@utils/douban'
import { get } from '@utils/kv'
import Action from './action'

import type { ResultData } from '@utils/kv/type'

export default class Fetch extends Action {
  /** 从 donban 匹配条目, 并获取官方剧照信息 */
  fetchMovieFromDouban = async () => {
    const { cn, jp, year } = this.params

    try {
      /** 手动映射优先 */
      const manualId = getManualDoubanId(this.subjectId)
      const q = cn || jp
      if (manualId || q) {
        const result = manualId ? [] : await search(q)
        const doubanId = manualId || matchMovie(q, result, jp, year)
        const preview = await getPreview(doubanId, undefined, 40)
        if (preview.data.length) {
          this.setState({
            epsThumbs: preview.data
              .slice()
              .reverse()
              .map(item => randomizeImgHost(item)),
            epsThumbsHeader: {
              Referer: preview.referer
            }
          })
          this.save()
        }
      }
    } catch (error) {
      /** 抓取异常不外抛 */
      this.error('fetchMovieFromDouban', error)
    }
  }

  /** 下载预数据 */
  getThirdParty = async () => {
    try {
      const data = await get<
        ResultData<{
          epsThumbs?: string[]
          epsThumbsHeader?: { Referer?: string }
        }>
      >(`douban_${this.subjectId}`)
      if (!data) return true

      const { epsThumbs = [], epsThumbsHeader = {} } = data
      this.setState({
        epsThumbs: epsThumbs.map(item => randomizeImgHost(item)),
        epsThumbsHeader
      })
      this.save()

      return false
    } catch (error) {
      return true
    }
  }
}
