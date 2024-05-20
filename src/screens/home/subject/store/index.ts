/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-19 18:15:37
 */
import { collectionStore, rakuenStore, subjectStore, userStore } from '@stores'
import { ApiSubjectResponse } from '@stores/subject/types'
import { getTimestamp } from '@utils'
import { queue } from '@utils/fetch'
import { SHARE_MODE, STORYBOOK } from '@constants'
import Action from './action'
import { EXCLUDE_STATE } from './ds'

/** 条目页面状态机 */
class ScreenSubject extends Action {
  /** 是否完成过一次全部请求 */
  private _initDone = false

  /** 初始化 */
  init = async () => {
    // 是否需要更新数据
    const current = getTimestamp()
    const needRefresh =
      !this._initDone || !this.state._loaded || current - Number(this.state._loaded) > 60 * 5
    const _loaded = needRefresh ? current : this.state._loaded

    try {
      this.setState({
        ...(await this.getStorage(this.namespace)),
        ...EXCLUDE_STATE,
        _loaded
      })

      // 装载条目云端缓存数据
      this.fetchSubjectFromOSS()
      if (!needRefresh) return true

      // 手动刷新全局条目收藏状态
      collectionStore.fetchCollectionStatusQueue([this.subjectId])
      return this.onHeaderRefresh()
    } catch (error) {}

    this.setState({
      ...EXCLUDE_STATE,
      _loaded
    })
    return true
  }

  /**
   * 访问私有 cdn, 加速未缓存条目首屏数据渲染
   *  - 每个请求都判断 this.state.mounted 若用户在未请求完就退出页面需要尽快终止余下请求
   * */
  onHeaderRefresh = async () => {
    queue(
      [
        () => {
          if (!this.state.mounted || SHARE_MODE) return
          return this.fetchCollection()
        },
        () => {
          if (!this.state.mounted || SHARE_MODE) return
          if (userStore.isStorybookLogin) return userStore.fetchUserProgressV0(this.subjectId)
          return userStore.fetchUserProgress(this.subjectId)
        }
      ],
      1
    )

    if (!this.state.mounted) return

    const data = await this.fetchSubject()
    queue(
      [
        () => {
          if (!this.state.mounted) return
          return this.fetchOTA()
        },
        () => {
          if (!this.state.mounted) return
          return this.fetchThirdParty(data)
        },
        () => {
          if (!this.state.mounted) return
          return this.fetchAnitabi()
        },
        () => {
          if (!this.state.mounted) return

          // 网页端走的反代, 很容易请求挂起, 需要第一时间回去云端缓存数据
          if (STORYBOOK) return this.fetchCommentsFromOSS()

          // APP 端可以延迟获取, 若正常数据获取到, 会取消获取云端数据
          setTimeout(() => {
            if (!this.state.mounted) return
            this.fetchCommentsFromOSS()
          }, 6400)
        },
        () => {
          if (!this.state.mounted) return
          return this.fetchTrackComments()
        },
        () => {
          if (!this.state.mounted) return
          return this.fetchSubjectComments(true)
        },
        () => {
          if (!this.state.mounted) return
          return this.fetchSubjectFromHTML()
        },
        () => {
          if (!this.state.mounted) return
          return this.setRendered()
        },
        () => {
          if (!this.state.mounted) return
          return this.fetchVIB()
        },
        () => {
          if (!this.state.mounted) return
          return this.fetchEpsData()
        },
        () => {
          if (!this.state.mounted) return

          // 对集数大于 1000 的条目, 旧 API 并不会返回大于 1000 章节的信息, 暂时到新的 API 里取
          if (this.subject.eps?.length >= 1000) return subjectStore.fetchSubjectEpV2(this.subjectId)
        },
        () => {
          if (!this.state.mounted) return

          // NSFW 条目不再返回数据, 而旧接口 staff 也错乱, 主动请求网页的 staff 数据
          // @ts-expect-error
          if (data?.code === 404) return this.fetchPersons()
        },
        () => {
          if (!this.state.mounted) return

          // NSFW 条目若从 v0 接口中返回了条目信息, 是没有日志短列表信息的
          // 需要从单独的对应子页面里面获取一页信息
          if ((data as ApiSubjectResponse)?.v0)
            return rakuenStore.fetchReviews({ subjectId: this.subjectId })
        },
        () => {
          if (!this.state.mounted) return

          // NSFW 条目若从 v0 接口中返回了条目信息, 是没有帖子短列表信息的
          // 需要从单独的对应子页面里面获取一页信息
          if ((data as ApiSubjectResponse)?.v0) {
            return rakuenStore.fetchBoard({
              subjectId: this.subjectId
            })
          }
        },
        () => {
          if (!this.state.mounted) return
          this._initDone = true
        }
      ],
      2
    )

    return true
  }
}

export default ScreenSubject
