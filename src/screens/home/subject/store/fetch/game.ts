/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-26 22:15:26
 */
import { getTimestamp, optimize, postTask } from '@utils'
import { get, update } from '@utils/kv'
import { fetchVndbData, probeDlsiteImages } from '@utils/thirdParty/dlsite-vndb'
import { hltb } from '@utils/thirdParty/hltb'
import { D1 } from '@constants'
import ThirdParty from './third-party'

import type { DlsiteImage, VndbScreenshot } from '@utils/thirdParty/dlsite-vndb'
import type { HltbCache } from '@utils/thirdParty/hltb/types'
import type { DeepPartial } from '@types'

/** 游戏扩展数据 (VNDB/DLsite 截图 / 通关时长) */
export default class Game extends ThirdParty {
  /** 获取 VNDB/DLsite 外部截图 */
  fetchExternalScreenshots = async () => {
    if (this.type !== '游戏') return false
    if (!this.vndbId && !this.dlsiteId) return false

    if (this.hasExternalScreenshots && this.state.gameDuration.vndb) return true
    if (optimize(this.state.externalScreenshots, D1)) return true

    const now = getTimestamp()

    // 收集 VNDB 和 DLsite 的结果
    const results: {
      vndb?: { screenshots: VndbScreenshot[]; duration?: string }
      dlsite?: { images: DlsiteImage[] }
    } = {}

    const promises: Promise<void>[] = []

    if (this.vndbId) {
      promises.push(
        (async () => {
          const cacheKey = `vndb_${this.subjectId}` as const
          const hltbKey = `hltb_${this.subjectId}` as const

          try {
            const cache = await get<{ data?: VndbScreenshot[] }>(cacheKey)
            const hltbCache = await get<HltbCache>(hltbKey)
            if (Array.isArray(cache?.data) && cache.data.length && hltbCache?.vndb) {
              results.vndb = { screenshots: cache.data, duration: hltbCache.vndb }
              return
            }
          } catch {}

          try {
            const result = await fetchVndbData(this.vndbId)
            if (result) {
              const vndbDuration = `${(result.lengthMinutes / 60).toFixed(1)}h`
              results.vndb = { screenshots: result.screenshots, duration: vndbDuration }

              if (result.screenshots.length) {
                postTask(() => {
                  update(cacheKey, { data: result.screenshots })
                }, 0)
              }

              if (vndbDuration) {
                postTask(() => {
                  const { _loaded, ...rest } = this.state.gameDuration
                  update(hltbKey, { ...rest, vndb: vndbDuration })
                }, 0)
              }
            }
          } catch {}
        })()
      )
    }

    if (this.dlsiteId) {
      promises.push(
        (async () => {
          const cacheKey = `dlsite_${this.subjectId}` as const

          try {
            const cache = await get<{ data?: DlsiteImage[] }>(cacheKey)
            if (Array.isArray(cache?.data) && cache.data.length) {
              results.dlsite = { images: cache.data }
              return
            }
          } catch {}

          try {
            const images = await probeDlsiteImages(this.dlsiteId)
            results.dlsite = { images }

            if (images.length) {
              postTask(() => {
                update(cacheKey, { data: images })
              }, 0)
            }
          } catch {}
        })()
      )
    }

    await Promise.all(promises)

    // 统一更新状态
    const updates: DeepPartial<typeof this.state> = {
      externalScreenshots: {
        _loaded: now
      }
    }

    if (results.vndb) {
      updates.externalScreenshots = {
        ...updates.externalScreenshots,
        vndb: results.vndb.screenshots
      }
      if (results.vndb.duration) {
        updates.gameDuration = {
          vndb: results.vndb.duration
        }
      }
    }

    if (results.dlsite) {
      updates.externalScreenshots = {
        ...updates.externalScreenshots,
        dlsite: results.dlsite.images
      }
    }

    this.setState(updates)
    this.save()

    return true
  }

  /** 游戏通关时长 */
  fetchGameDuration = async () => {
    if (
      this.type !== '游戏' ||
      // 这个不是找 ADV 时长的
      this.hasExternalScreenshots ||
      this.state.gameDuration.mainStory ||
      this.state.gameDuration.vndb
    ) {
      return false
    }

    const now = getTimestamp()

    // 查询缓存
    const cacheKey = `hltb_${this.subjectId}` as const
    try {
      const cache = await get<HltbCache>(cacheKey)
      if (cache?.mainStory) {
        this.setState({
          gameDuration: {
            ...cache,
            _loaded: now
          }
        })
        this.save()
        return true
      }
    } catch {}

    // 不管如何，若请求过就不再抓取
    if (this.state.gameDuration._loaded) return false

    // 中日韩文字 Unicode 范围：中文 一-鿿，平假名 ぀-ゟ，片假名 ゠-ヿ，韩文 가-힯
    const CJK_RE = /[一-鿿぀-ゟ゠-ヿ가-힯]/
    const m = this.rawInfo.match(/(?:中文名|英文名|别名)[\s\S]*?<\/span>\s*([^<]+)/g)
    let englishName = ''
    if (m) {
      for (const item of m) {
        const text = item.match(/<\/span>\s*([^<]+)/)?.[1]?.trim() || ''
        // 不包含中日韩文字，选最长的
        if (!CJK_RE.test(text) && text.length > englishName.length) {
          englishName = text
        }
      }
    }

    if (!englishName && !CJK_RE.test(this.cn || '')) {
      englishName = this.cn
    } else if (!englishName && !CJK_RE.test(this.jp || '')) {
      englishName = this.jp
    }
    if (!englishName) return false

    const result = await hltb(englishName)
    if (result) {
      this.setState({
        gameDuration: {
          ...result,
          _loaded: now
        }
      })
      this.save()

      postTask(() => {
        const { _loaded, ...rest } = this.state.gameDuration
        update(cacheKey, rest)
      }, 0)

      return true
    }

    this.setState({
      gameDuration: {
        _loaded: now
      }
    })
    this.save()
    return false
  }
}
