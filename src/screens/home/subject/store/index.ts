/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 07:19:57
 */
import { collectionStore, rakuenStore, subjectStore, userStore } from '@stores'
import { ApiSubjectResponse } from '@stores/subject/types'
import { getTimestamp, postTask } from '@utils'
import { queue } from '@utils/fetch'
import { M5, SHARE_MODE, WEB } from '@constants'
import Action from './action'
import { EXCLUDE_STATE, RESET_STATE, STATE } from './ds'

/** 条目页面状态机 */
export default class ScreenSubject extends Action {
  /** 是否完成过一次全部请求 */
  private _initDoned = false

  /** 初始化 */
  init = async (): Promise<boolean> => {
    const now = getTimestamp()
    const { _loaded } = this.state
    const needRefresh = !this._initDoned || !_loaded || now - Number(_loaded) > M5
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

  /** 每个请求都判断 this.state.focused 判断用户在未请求完就退出页面需要尽快终止余下请求 */
  private withFocus<T>(fn: () => T, extraCondition: boolean = true) {
    if (!this.state.focused || !extraCondition) return
    return fn()
  }

  /** 访问快照, 加速未缓存条目首屏数据渲染 */
  onHeaderRefresh = async () => {
    queue(
      [
        () =>
          this.withFocus(() => {
            this.log('fetchCollection')
            return this.fetchCollection()
          }, !SHARE_MODE),
        () =>
          this.withFocus(() => {
            this.log('fetchUserProgress')
            return userStore[
              userStore.isStorybookLogin ? 'fetchUserProgressV0' : 'fetchUserProgress'
            ](this.subjectId)
          }, !SHARE_MODE)
      ],
      1
    )
    if (!this.state.focused) return

    this.log('fetchSubject')
    const data = (await this.fetchSubject()) as ApiSubjectResponse

    queue(
      [
        () =>
          this.withFocus(() => {
            this.log('fetchOTA')
            return this.fetchOTA()
          }),
        () =>
          this.withFocus(() => {
            this.log('fetchThirdParty')
            return this.fetchThirdParty(data)
          }),
        () =>
          this.withFocus(() => {
            this.log('fetchAnitabi')
            return this.fetchAnitabi()
          }),
        () =>
          this.withFocus(() => {
            // 网页端走的反代, 很容易请求挂起, 需要第一时间回去云端缓存数据
            if (WEB) {
              this.log('fetchCommentsFromOSS')
              return this.fetchCommentsFromOSS()
            }

            // 客户端可以延迟获取, 若正常数据获取到, 会取消获取云端数据
            postTask(
              () =>
                this.withFocus(() => {
                  this.log('fetchCommentsFromOSS')
                  this.fetchCommentsFromOSS()
                }),
              6400
            )
          }),
        () =>
          this.withFocus(() => {
            this.log('fetchTrackComments')
            return this.fetchTrackComments()
          }),
        () =>
          this.withFocus(() => {
            this.log('fetchSubjectComments')
            return this.fetchSubjectComments(true)
          }),
        () =>
          this.withFocus(() => {
            this.log('fetchSubjectFromHTML')
            return this.fetchSubjectFromHTML()
          }),
        () =>
          this.withFocus(() => {
            this.log('fetchVIB')
            return this.fetchVIB()
          }),
        () =>
          this.withFocus(() => {
            this.log('fetchEpsData')
            return this.fetchEpsData()
          }),
        () =>
          this.withFocus(() => {
            this.log('fetchPicTotal')
            return this.fetchPicTotal()
          }),
        () =>
          this.withFocus(() => {
            // 对集数大于 1000 的条目, 旧 API 并不会返回大于 1000 章节的信息, 暂时到新的 API 里取
            if (this.subject.eps?.length >= 1000) {
              this.log('subjectStore.fetchSubjectEpV2')
              return subjectStore.fetchSubjectEpV2(this.subjectId)
            }
          }),
        () =>
          this.withFocus(() => {
            // NSFW 条目不再返回数据, 旧接口 staff 也错乱, 主动请求网页的 staff 数据
            this.log('fetchPersons')
            return this.fetchPersons()
          }, data?.code === 404),
        () =>
          this.withFocus(() => {
            // NSFW 条目不再返回数据, 需要从单独的对应子页面里面获取一页信息
            this.log('rakuenStore.fetchReviews')
            return rakuenStore.fetchReviews(this.subjectId, true)
          }, !!data?.v0),
        () =>
          this.withFocus(() => {
            // NSFW 条目不再返回数据, 需要从单独的对应子页面里面获取一页信息
            this.log('rakuenStore.fetchBoard')
            return rakuenStore.fetchBoard(this.subjectId)
          }, !!data?.v0),
        () =>
          this.withFocus(() => {
            this.log('this._initDoned = true')
            this._initDoned = true
          })
      ],
      2
    )

    return true
  }

  unmount = () => {
    this.setState(RESET_STATE)
  }
}
