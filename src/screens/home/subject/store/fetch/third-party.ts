/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 *
 * 第三方内容源编排 (bangumi-data 匹配 + 来源分发 + 手动刷新)
 */
import { HTMLDecode, postTask, unzipBangumiData } from '@utils'
import { MAX_RESULTS } from '@utils/bilibili'
import { logger } from '@utils/dev'
import { decode, get as protoGet } from '@utils/thirdParty/protobuf'
import { DEV, WEB } from '@constants'
import EpsThumbs from './eps-thumbs'

import type { Sites } from '@types'

/** 一次启动内第三方请求频率限制 */
const GLOBAL_FETCH_LIMIT = DEV ? 4 : 8
let globalFetchThirdPartyCount = 0

/** 手动刷新的结果 (timeout 表示已放弃等待, 后台可能稍后才拿到数据) */
export type ThumbsRefreshResult = 'updated' | 'empty' | 'timeout'

/** 手动刷新整体超时阈值 (保证 loading 一定复位) */
const REFRESH_THUMBS_TIMEOUT = 30000

/** 第三方数据装载与刷新 */
export default class ThirdParty extends EpsThumbs {
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
}
