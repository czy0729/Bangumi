/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-19 00:41:33
 */
import { _, collectionStore, rakuenStore, subjectStore, userStore } from '@stores'
import { getTimestamp } from '@utils'
import { queue } from '@utils/fetch'
import { M15, SHARE_MODE, WEB } from '@constants'
import Action from './action'
import { EXCLUDE_STATE, RESET_STATE } from './ds'

import type { ApiSubjectResponse } from '@stores/subject/types'
import type { STATE } from './ds'

/** 条目页面状态机 */
export default class ScreenSubject extends Action {
  /** 是否完成过一次全部请求 */
  private _initDoned = false

  /** 初始化 */
  init = async (): Promise<boolean> => {
    const now = getTimestamp()
    const { _loaded } = this.state
    const needRefresh = !this._initDoned || !_loaded || now - Number(_loaded) > M15
    const loadedTime = needRefresh ? now : _loaded

    try {
      const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(
        this.namespace
      )
      this.setState({
        ...storageData,
        ...EXCLUDE_STATE,
        focused: true,
        _loaded: loadedTime
      })

      // 请求条目快照
      this.fetchSubjectFromOSS()
      if (!needRefresh) return true

      await queue([
        // 手动刷新全局条目收藏状态
        () => collectionStore.fetchCollectionStatusQueue([this.subjectId]),
        () => this.onHeaderRefresh()
      ])
      return true
    } catch (error) {
      this.setState({
        ...EXCLUDE_STATE,
        focused: true,
        _loaded: loadedTime
      })
      return true
    }
  }

  /** 访问快照, 加速未缓存条目首屏数据渲染 */
  onHeaderRefresh = async () => {
    /** ==================== 收藏核心数据 ==================== */
    queue(
      [
        () => this.withFocus(() => this.fetchCollection(), 'fetchCollection', !SHARE_MODE),
        () =>
          this.withFocus(
            () =>
              userStore[userStore.isStorybookLogin ? 'fetchUserProgressV0' : 'fetchUserProgress'](
                this.subjectId
              ),
            'fetchUserProgress',
            !SHARE_MODE
          )
      ],
      1
    )
    if (!this.state.focused) return

    /** ==================== 条目核心数据 ==================== */
    this.log('fetchSubject')
    const data = (await this.fetchSubject()) as ApiSubjectResponse

    /** ==================== 条目次要数据 ==================== */
    await queue(
      [
        () => this.withFocus(() => this.fetchSnapshot(), 'fetchSnapshot'),
        () => this.withFocus(() => this.fetchSubjectFromHTML(), 'fetchSubjectFromHTML'),
        () => this.withFocus(() => this.fetchThirdParty(data), 'fetchThirdParty')
      ],
      2
    )

    /** ==================== 非必要扩展数据 ==================== */
    await this.waitUntilScrolled()

    queue(
      [
        () => this.withFocus(() => this.fetchAnitabi(), 'fetchAnitabi'),
        () =>
          this.withFocus(
            // 网页端走的反代, 很容易请求挂起, 需要第一时间回去云端缓存数据
            () => this.fetchCommentsFromOSS(),
            'fetchCommentsFromOSS',
            WEB
          ),
        () => this.withFocus(() => this.fetchTrackComments(), 'fetchTrackComments'),
        () => this.withFocus(() => this.fetchSubjectComments(true), 'fetchSubjectComments'),
        () => this.withFocus(() => this.fetchVIB(), 'fetchVIB'),
        () => this.withFocus(() => this.fetchEpsData(), 'fetchEpsData'),
        () => this.withFocus(() => this.fetchPicTotal(), 'fetchPicTotal'),
        () =>
          this.withFocus(
            // 对集数大于 1000 的条目, 旧 API 并不会返回大于 1000 章节的信息, 暂时到新的 API 里取
            () => subjectStore.fetchSubjectEpV2(this.subjectId),
            'subjectStore.fetchSubjectEpV2',
            this.subject.eps?.length >= 1000
          ),
        () =>
          this.withFocus(
            // NSFW 条目不再返回数据, 旧接口 staff 也错乱, 主动请求网页的 staff 数据
            () => this.fetchPersons(),
            'fetchPersons',
            data?.code === 404
          ),
        () =>
          this.withFocus(
            // NSFW 条目不再返回数据, 需要从单独的对应子页面里面获取一页信息
            () => rakuenStore.fetchReviews(this.subjectId, true),
            'rakuenStore.fetchReviews',
            !!data?.v0
          ),
        () =>
          this.withFocus(
            // NSFW 条目不再返回数据, 需要从单独的对应子页面里面获取一页信息
            () => rakuenStore.fetchBoard(this.subjectId),
            'rakuenStore.fetchBoard',
            !!data?.v0
          ),
        () => this.withFocus(() => (this._initDoned = true), 'this._initDoned = true')
      ],
      2
    )

    return true
  }

  /** 销毁页面 */
  unmount = () => {
    this.setState(RESET_STATE)
  }

  /** 每个请求都判断 this.state.focused 判断用户在未请求完就退出页面需要尽快终止余下请求 */
  private withFocus<T>(fn: () => T, desc: string = '', extraCondition: boolean = true) {
    if (!this.state.focused) {
      this.warn('withFocus', 'cancel', `(${desc})`)
      return
    }

    if (!extraCondition) {
      this.warn('withFocus', 'extraCondition cancel', `(${desc})`)
      return
    }

    this.log(desc)
    return fn()
  }

  /** 等待页面滚动到阈值 */
  private waitUntilScrolled = () =>
    new Promise<void>(resolve => {
      if (!this.state.focused) return resolve()
      if (this.onScrollY >= _.window.height / 2) return resolve()

      const timer = setInterval(() => {
        this.warn('waitUntilScrolled', '...', this.onScrollY)

        if (!this.state.focused) {
          clearInterval(timer)
          resolve()
          return
        }

        if (this.onScrollY >= _.window.height / 2) {
          clearInterval(timer)
          resolve()
        }
      }, 800)
    })
}
