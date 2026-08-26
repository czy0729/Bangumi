/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-26 21:35:33
 */
import { monoStore, otaStore, subjectStore, systemStore, userStore } from '@stores'
import { getStorage, getTimestamp, optimize, postTask, queue, setStorage } from '@utils'
import { logger } from '@utils/dev'
import { xhrCustom } from '@utils/fetch'
import { get, update } from '@utils/kv'
import { API_ANITABI, D1, D7, DEV, WEB } from '@constants'
import Game from './game'

import type { Vib } from '@stores/subject/types'
import type { AnitabiData } from '../../types'

/** 一次启动内第三方请求频率限制 */
const GLOBAL_FETCH_LIMIT = DEV ? 1 : 8
let globalFetchVIBCount = 0
let globalFetchAnitabiCount = 0

/** 其他扩展数据 (anitabi / VIB / 图集总数 / 好友动态) */
export default class Extend extends Game {
  /** 获取圣地巡游信息 */
  fetchAnitabi = async () => {
    if (
      this.type !== '动画' ||
      this.nsfw ||
      systemStore.setting.showAnitabi === -1 ||
      !systemStore.setting.showAnitabi ||
      optimize(this.state.anitabi, D7)
    ) {
      return false
    }

    const now = getTimestamp()
    const snapshotId = `anitabi_${this.subjectId}` as const
    try {
      const snapshot = await get<AnitabiData>(snapshotId)
      if (snapshot && optimize(snapshot, D7)) {
        this.setState({
          anitabi: {
            ...snapshot,
            _loaded: now
          }
        })
        return true
      }
    } catch {}

    const fetchId = `fetchAnitabi|${this.subjectId}` as const
    let anitabi: Partial<AnitabiData> = {
      _loaded: now
    }
    try {
      const fetchedFlag = await getStorage(fetchId)
      if (!fetchedFlag) {
        if (globalFetchAnitabiCount >= GLOBAL_FETCH_LIMIT) {
          logger.warn('fetchAnitabi', 'limit denied')
          return false
        }
        globalFetchAnitabiCount += 1

        const { _response } = await xhrCustom({
          url: API_ANITABI(this.subjectId)
        })
        const data = (_response.length ? JSON.parse(_response) : {}) as AnitabiData
        if (data?.litePoints?.length) {
          anitabi = {
            ...data,
            _loaded: now
          }
        }

        // 无论有无数据都标记已请求, 避免无数据条目在快照过期前反复打接口
        setStorage(fetchId, true)

        postTask(() => {
          update(snapshotId, anitabi)
        }, 0)
      }
    } catch (error) {
      // 瞬时网络错误不标记、不写空结果, 否则会被 D7 节流锁住一周无法自愈
      logger.error(this.namespace, 'fetchAnitabi', error)
      return false
    }

    this.setState({
      anitabi
    })
    this.save()

    return true
  }

  /**
   * VIB 等评分数据
   * @optimize 12h
   * */
  fetchVIB = async () => {
    if (
      systemStore.setting.hideScore ||
      systemStore.setting.showRating !== true ||
      optimize(this.vib, D1)
    ) {
      return false
    }

    const snapshotId = `vib_${this.subjectId}`
    try {
      const snapshot = await get<Vib>(snapshotId)
      if (snapshot && getTimestamp() - Number(snapshot._loaded || 0) <= D1) {
        subjectStore.updateVIB(this.subjectId, snapshot)
        if (!snapshot.avg) {
          postTask(() => {
            subjectStore.fetchVIB(this.subjectId)
          }, 0)
        }
        return true
      }
    } catch {}

    try {
      await subjectStore.fetchVIB(this.subjectId)
      if (WEB) return true

      if (this.type === '动画') {
        if (globalFetchVIBCount >= GLOBAL_FETCH_LIMIT) {
          logger.warn('fetchVIB', 'limit denied')
          return false
        }
        globalFetchVIBCount += 1

        await subjectStore.fetchMAL(this.subjectId, this.jp || this.cn)
        await subjectStore.fetchAniDB(this.subjectId, this.jp || this.cn)
      }
      if (this.vib._loaded) update(snapshotId, this.vib)
      return true
    } catch {}

    return false
  }

  /** 获取图集关键字信息 */
  fetchPicTotal = async () => {
    const { lastFetchPicTotalTS } = this.state
    const now = getTimestamp()
    if (lastFetchPicTotalTS && now - Number(lastFetchPicTotalTS || 0) <= D7) return false

    await monoStore.fetchPicTotalBatch(
      [...new Set([...this.subjectKeywords, ...this.crtKeywords])]
        .filter(item => !/[ －]/.test(item))
        .slice(0, 6)
    )
    this.setState({
      lastFetchPicTotalTS: now
    })
    this.save()

    return true
  }

  private _fetchFriendsRating = false

  /** 获取好友动态 */
  fetchFriendsRating = () => {
    if (
      this._fetchFriendsRating ||
      !userStore.isLogin ||
      systemStore.setting.subjectRecentType !== '好友'
    ) {
      return false
    }

    this._fetchFriendsRating = true

    return queue(
      [
        () =>
          subjectStore.fetchRating(
            {
              subjectId: this.subjectId,
              status: 'doings',
              isFriend: true
            },
            true
          ),
        () =>
          subjectStore.fetchRating(
            {
              subjectId: this.subjectId,
              status: 'collections',
              isFriend: true
            },
            true
          )
      ],
      1
    )
  }

  /** 装载找条目快照数据 */
  fetchSnapshot = async () => {
    if (this.type === '动画') {
      if (this.animeInfo?.i) otaStore.fetchAnime(this.animeInfo.i)
      return
    }

    if (this.type === '游戏') {
      await this.fetchExternalScreenshots()
      if (this.gameInfo?.i) otaStore.fetchGame(this.gameInfo.i)
      return
    }
  }
}
