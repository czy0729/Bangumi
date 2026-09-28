/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 21:00:00
 *
 * 视频平台数据 (搜索视频 / 音乐 MV)
 */
import { search as searchMV } from '@utils/bilibili'
import { logger } from '@utils/dev'
import { HOST_AC_M, WEB } from '@constants'
import Oss from './oss'

/** 视频平台匹配与取视频 */
export default class Bilibili extends Oss {
  /**
   * 从视频平台按标题搜索并映射视频数据, 不落库
   *  - cn 传空字符串表示只用原名搜索 (书籍的中文译名与视频标题对不上)
   *  - suffix 是类型后缀, 只有游戏允许传 OP / PV; 传了才做收窄重搜, 过滤基准仍是原标题
   * */
  searchVideosFromBilibili = async (
    cn: string,
    jp: string,
    suffix: 'OP' | 'PV' | '' = ''
  ) => {
    if (WEB || this.nsfw) return []

    const q = cn || jp
    if (!q) return []

    try {
      let videos = await searchMV(q, '')
      if (!videos.length && suffix) {
        videos = await searchMV(`${q} ${suffix}`, '', q)
      }

      return videos.map(item => ({
        cover: item.cover,
        title: item.title,
        href: item.href,
        src: ''
      }))
    } catch (error) {
      /** 抓取异常不外抛 */
      logger.error(this.namespace, 'searchVideosFromBilibili', error)
      return []
    }
  }

  /**
   * 从视频平台按标题搜索并落库
   *  - 剧照平台没有数据 / 不适用剧照平台的类型 (三次元 / 书籍) 统一走这里
   * */
  fetchVideoFromBilibili = async (
    cn: string,
    jp: string,
    suffix: 'OP' | 'PV' | '' = ''
  ): Promise<boolean> => {
    const videos = await this.searchVideosFromBilibili(cn, jp, suffix)
    if (!videos.length) return false

    try {
      this.setState({
        videos,
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
