/*
 * @Author: czy0729
 * @Date: 2023-02-27 20:20:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-15 21:08:36
 *
 * 首页数据请求: 条目信息队列请求 / 收藏时间线 / 在玩游戏与初始化请求编排
 */
import { collectionStore, subjectStore, systemStore, timelineStore, userStore } from '@stores'
import { feedback, getTimestamp, info, queue } from '@utils'
import { logger } from '@utils/dev'
import { t } from '@utils/fetch'
import { decode } from '@utils/thirdParty/protobuf'
import {
  D,
  H1,
  H6,
  M5,
  MODEL_COLLECTION_STATUS,
  MODEL_COLLECTIONS_ORDERBY,
  MODEL_SUBJECT_TYPE,
  WEB
} from '@constants'
import Computed from './computed'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

import type { UserCollectionItem } from '@utils/fetch.v0/types'
import type { CollectionsOrder, CollectionStatus, SubjectId, SubjectType } from '@types'

/** 是否重新授权中 */
let reOauthing: boolean

/** 首屏队列等待全量收视进度的上限 (毫秒), 超时按未刷新处理由单条目请求兜底 */
const USER_PROGRESS_ALL_TIMEOUT = 3000

/** 等待 Promise, 超时返回 fallback; Promise 先完成时清除计时器 */
function withTimeout(promise: Promise<boolean>, ms: number, fallback: boolean) {
  let timer: ReturnType<typeof setTimeout>
  const timeout = new Promise<boolean>(resolve => {
    timer = setTimeout(() => resolve(fallback), ms)
  })
  return Promise.race([
    promise.then(
      value => {
        clearTimeout(timer)
        return value
      },
      () => {
        clearTimeout(timer)
        return fallback
      }
    ),
    timeout
  ])
}

export default class Fetch extends Computed {
  /** 进行中的全量收视进度请求, 供并发调用复用 (in-flight 去重) */
  userProgressAllTask: Promise<boolean> | null = null

  /** 队列代号, 登录态切换时自增, 用于作废旧队列的进度写入与快照清理 */
  queueGeneration = 0

  /** 作废正在执行的队列 (登录态切换时调用); 进度由调用方的 initStore 统一复位 */
  resetQueue = () => {
    this.queueGeneration += 1
  }

  /** 初始化请求 */
  initFetch = async (refresh: boolean = false) => {
    if (this.state.progress.fetching) {
      info('正在刷新条目信息')
      return
    }

    // 本次刷新所属的代号: initQueue 的网络等待期间若登录态切换 (resetQueue 自增) 则放弃
    const generation = this.queueGeneration

    // 收视进度与条目信息解耦: 手动刷新强制拉, 自动路径走 1 小时节流
    // 与收藏拉取并发, 结果在 initQueue 内等待, 全量成功时队列内的单条目进度刷新可跳过
    const userProgressAllTask = this.fetchUserProgressAll(refresh)

    let { _loaded } = this.collection
    if (typeof _loaded !== 'number') _loaded = 0

    // 6 天强制刷新一次
    const needFullFetch =
      refresh || getTimestamp() - _loaded > D * 6 || !this.collection.list.length

    if (!needFullFetch) {
      // 不需要全刷新也至少刷新首屏
      const result = await this.fetchCollectionTimelines()
      this.initQueue(6, userProgressAllTask, generation).catch(error => {
        logger.error(NAMESPACE, 'initQueue', error)
      })
      return result
    }

    let queued: boolean | 'busy'
    try {
      queued = await this.initQueue(undefined, userProgressAllTask, generation)
    } catch (error) {
      logger.error(NAMESPACE, 'initQueue', error)
      return true
    }

    // 已有队列在跑: 本次没有真正排队, 也不需要再拉收藏时间线
    if (queued === 'busy') return true

    if (queued) {
      this.fetchCollectionTimelines()
      return true
    }

    // 可能是 access_token 过期了, 需要重新刷新 access_token
    if (!userStore.isWebLogin || reOauthing) return true

    reOauthing = true
    const authorized = await userStore.reOauth()
    reOauthing = false
    if (!authorized) return true

    // oauth 成功后重新刷新数据, 全量进度同样需要重新拉取
    // (不传任务时队列会对每条收藏各发一次进度请求, 收藏多时请求量大且易触发限流)
    feedback()
    info('重新授权成功')
    t('其他.重新授权')

    let result: boolean | 'busy'
    try {
      result = await this.initQueue(undefined, this.fetchUserProgressAll(true), generation)
    } catch (error) {
      logger.error(NAMESPACE, 'initQueue', error)
      result = true
    }
    if (result !== 'busy') this.fetchCollectionTimelines()
    return result
  }

  /** 初始化进度和条目等数据 */
  initQueue = async (
    count?: number,
    userProgressAllTask?: Promise<boolean>,
    generation: number = this.queueGeneration
  ): Promise<boolean | 'busy'> => {
    const [collection, skipUserProgress] = await Promise.all([
      userStore.fetchCollection(),
      // 弱网下全量进度响应可能达数秒, 超时按未刷新处理继续进队列, 由单条目请求兜底
      userProgressAllTask
        ? withTimeout(userProgressAllTask, USER_PROGRESS_ALL_TIMEOUT, false)
        : Promise.resolve(false)
    ])

    // 网络等待期间登录态切换: 这次拿到的收藏属于旧账号, 不能再驱动队列 (也不能返回 false 触发重新授权)
    if (generation !== this.queueGeneration) return 'busy'

    // 本次请求确实成功 (拿到过有效响应), 只是在看收藏为空: 用户是真的 0 在看, 授权正常, 不能当成过期
    // (_ok 缺失表示旧缓存或请求失败, 落回原有分支)
    if (collection?._ok && !collection.list.length) return true

    if (collection?.list?.length) {
      return this.fetchSubjectsQueue(collection.list, count, skipUserProgress)
    }

    return false
  }

  /** 加载 bangumi-data */
  fetchBangumiData = async () => {
    if (this.state.loadedBangumiData) return

    await decode('bangumi-data')
    this.setState({
      loadedBangumiData: true
    })
  }

  /** 取空闲的条目进度指示位 */
  getFetchingSubjectKey = (): 'fetchingSubjectId1' | 'fetchingSubjectId2' =>
    this.state.progress.fetchingSubjectId2 ? 'fetchingSubjectId1' : 'fetchingSubjectId2'

  /** 写条目进度指示位; 队列代号变化 (登录态切换) 后不再写入 */
  setFetchingSubjectId = (
    key: 'fetchingSubjectId1' | 'fetchingSubjectId2',
    subjectId: SubjectId,
    generation: number = this.queueGeneration
  ) => {
    if (generation !== this.queueGeneration) return

    this.setState({
      progress: {
        [key]: subjectId
      }
    })
  }

  /** 请求条目信息 */
  fetchSubject = async (
    subjectId: SubjectId,
    index: number = 0,
    refreshUserProgress: boolean = false,
    // 队列代号: 队列内传入入队时的代号, 单独调用默认取当前代号
    generation: number = this.queueGeneration
  ) => {
    let flag = false

    const subject = this.subject(subjectId)
    let { _loaded } = subject
    if (typeof _loaded !== 'number') _loaded = 0

    // 每个条目再次请求间隔以 6 小时为间隔 index 为递增
    if (subject?._responseGroup !== 'large' || getTimestamp() - _loaded >= H6 * (index + 1)) {
      flag = true
    }

    if (flag) {
      const key = this.getFetchingSubjectKey()
      this.setFetchingSubjectId(key, subjectId, generation)

      // 全量收视进度刚刷新成功时跳过单条目进度请求, 数据已被全量覆盖
      if (refreshUserProgress) await this.fetchUserProgress(subjectId)
      await subjectStore.fetchSubject(subjectId)

      this.setFetchingSubjectId(key, 0, generation)
      return true
    }

    return true
  }

  /** 队列请求条目信息 */
  fetchSubjectsQueue = async (
    list: UserCollectionItem[] = [],
    count?: number,
    skipUserProgress: boolean = false
  ): Promise<true | 'busy'> => {
    // 已有队列在跑: 返回独立标记, 既不能当成授权过期, 也不能当成本次真的跑过队列
    if (this.state.progress.fetching) return 'busy'

    const generation = this.queueGeneration
    const sortedList = this.sortList(list)
    const limitedList = typeof count === 'number' && count ? sortedList.slice(0, count) : sortedList

    // 进度总数取本次实际入队条目数 (由 sortList + count 截断逻辑决定), 与筛选栏显示的收藏总数无关
    const total = limitedList.length

    // 空列表不进 fetching, 也不写 progress, 避免无谓的状态变更
    if (!total) return true

    // 用局部计数而不是读 state 自增: 并发任务 (queue 内部 pLimit) 同时完成时读改写会丢增量
    let done = 0
    const fetchs = limitedList.map(({ subject_id }, index) => async () => {
      try {
        // 全量收视进度已刷新成功时跳过单条目进度请求, 数据已被全量覆盖
        return await this.fetchSubject(subject_id, index, !skipUserProgress, generation)
      } finally {
        // 每个条目结束都累加, 最终 current 等于本次入队条目数
        done += 1
        // 队列已被作废 (登录态切换) 时不再写进度
        if (generation === this.queueGeneration) {
          this.setState({
            progress: {
              current: done
            }
          })
        }
      }
    })

    this.setState({
      progress: {
        fetching: true,
        current: 0,
        total
      }
    })

    try {
      await queue(fetchs, 2)
    } catch (error) {
      // 任一请求失败不能中断队列, 否则 progress.fetching 永久为 true, 后续刷新会被拦截
      logger.error(NAMESPACE, 'fetchSubjectsQueue', error)
    } finally {
      // 队列已被作废时不能复位新一轮队列的进度与快照
      if (generation === this.queueGeneration) {
        this.setState({
          progress: EXCLUDE_STATE.progress
        })
        // 队列结束后列表按真实收藏重算, 清掉本次刷新期间的快照
        this.clearListSnapshots()
      }
    }

    return true
  }

  /** 请求条目收视进度 */
  fetchUserProgress = (subjectId?: SubjectId) => {
    return userStore.fetchUserProgress(subjectId)
  }

  /**
   * 全量刷新收视进度
   *
   * 不带 subject_id 请求 /user/{userId}/progress, 一次返回所有收藏条目的每章状态,
   * 用于上游进度 (网页端 / 其他设备) 变化后的及时同步, 避免逐条目受 6 小时节流闸门约束
   *
   * 并发调用直接复用进行中的请求 (in-flight 去重)
   *
   * @return 请求成功 (含节流命中) 返回 true, 未登录 / 不支持 / 请求失败返回 false
   */
  fetchUserProgressAll = (refresh: boolean = false) => {
    // refresh=true 强制发起新请求, 不复用进行中的旧任务
    // (典型场景: reOauth 后旧 token 的请求可能还卡在重试中, 必须用新 token 重拉)
    if (!refresh && this.userProgressAllTask) return this.userProgressAllTask

    const task = this.fetchUserProgressAllTask(refresh).finally(() => {
      if (this.userProgressAllTask === task) this.userProgressAllTask = null
    })
    this.userProgressAllTask = task
    return task
  }

  /** 全量刷新收视进度实现, 由 fetchUserProgressAll 包装以做 in-flight 去重 */
  fetchUserProgressAllTask = async (refresh: boolean = false) => {
    try {
      if (!this.isLogin) return false

      // WEB 构建走 fetchUserProgressV0, 仅支持单条目, 全量模式不可用
      if (WEB) return false

      if (!refresh) {
        // 上次成功: 1 小时节流
        if (getTimestamp() - Number(this.state.lastFetchedUserProgress) < H1) return true

        // 上次失败: 5 分钟抑制窗口, 避免离线 / 弱网下反复切 Tab 持续发全量请求
        if (getTimestamp() - Number(this.state.lastFailedUserProgress) < M5) return false
      }

      const data = await this.fetchUserProgress()

      // 成功响应是无参接口返回的数组; undefined 表示请求失败,
      // { code, error } 表示 API 错误体 (如 invalid_token), fetchAPI 不抛错而是原样返回。
      // 成功写节流时间戳; 失败写抑制窗口, 窗口内不再重发, 由单条目请求兜底
      if (!Array.isArray(data)) {
        logger.error(NAMESPACE, 'fetchUserProgressAll', '全量收视进度请求失败')
        this.setState({
          lastFailedUserProgress: getTimestamp()
        })
        return false
      }

      this.setState({
        lastFetchedUserProgress: getTimestamp()
      })
      return true
    } catch (error) {
      logger.error(NAMESPACE, 'fetchUserProgressAll', error)
      this.setState({
        lastFailedUserProgress: getTimestamp()
      })
      return false
    }
  }

  /** 请求在玩的游戏 */
  fetchDoingGames = (refresh?: boolean) => {
    return collectionStore.fetchUserCollections(
      {
        userId: this.usersInfo.username || this.userId,
        subjectType: MODEL_SUBJECT_TYPE.getLabel<SubjectType>('游戏'),
        type: MODEL_COLLECTION_STATUS.getValue<CollectionStatus>('在看'),
        order: MODEL_COLLECTIONS_ORDERBY.getValue<CollectionsOrder>('收藏时间'),
        tag: ''
      },
      refresh
    )
  }

  /** 追踪特定用户收藏时间线 */
  fetchCollectionTimelines = () => {
    if (!this.isLogin) return false

    const { lastfetchedCollectionTimelines } = this.state
    if (getTimestamp() - Number(lastfetchedCollectionTimelines) < H1) return true

    const { collectionTimelines } = systemStore.setting
    if (!collectionTimelines?.length) return false

    this.setState({
      lastfetchedCollectionTimelines: getTimestamp()
    })
    this.save()

    return queue(
      collectionTimelines.map(userName => () => timelineStore.fetchCollectionTimelines(userName)),
      1
    ).catch(error => {
      logger.error(NAMESPACE, 'fetchCollectionTimelines', error)
      return false
    })
  }
}
