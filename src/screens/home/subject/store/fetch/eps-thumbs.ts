/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 *
 * 章节缩略图 (bangumi-data 命中站点后逐个平台抓取)
 */
import { getBangumiUrl, HTMLTrim } from '@utils'
import { logger } from '@utils/dev'
import { xhrTimeout } from '@utils/fetch'
import { HOST_AC, HOST_AC_API, WEB } from '@constants'
import Douban from './douban'

import type { unzipBangumiData } from '@utils'

/** 章节缩略图抓取 */
export default class EpsThumbs extends Douban {
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
      if (this.bilibiliSite.id) {
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
}
