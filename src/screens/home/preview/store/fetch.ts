/*
 * @Author: czy0729
 * @Date: 2024-09-07 01:42:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-07 01:45:05
 */
import { getPreview, matchMovie, search } from '@utils/douban'
import { get } from '@utils/kv'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 从 donban 匹配条目, 并获取官方剧照信息 */
  fetchMovieFromDouban = async () => {
    const { cn, jp } = this.params
    const q = cn || jp
    if (q) {
      const result = await search(q)
      const doubanId = matchMovie(q, result, jp)
      const preview = await getPreview(doubanId, undefined, 40)
      if (preview.data.length) {
        this.setState({
          epsThumbs: preview.data.slice().reverse(),
          epsThumbsHeader: {
            Referer: preview.referer
          }
        })
        this.save()
      }
    }
  }

  /** 下载预数据 */
  getThirdParty = async () => {
    try {
      const data = await get(`douban_${this.subjectId}`)
      if (!data) return true

      const { epsThumbs = [], epsThumbsHeader = {} } = data
      this.setState({
        epsThumbs,
        epsThumbsHeader
      })
      this.save()

      return false
    } catch (error) {
      return true
    }
  }
}
