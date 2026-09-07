/*
 * @Author: czy0729
 * @Date: 2026-09-07 03:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-07 21:21:39
 *
 * 媒体信息列队请求: 按 key 去重、回调登记、失败冷却、串行限速
 */
import { rakuenStore, subjectStore } from '@stores'
import { sleep } from '@utils'
import { logger } from '@utils/dev'
import { MEDIA_FAIL_COOLDOWN } from '../ds'
import { COMPONENT } from './ds'

import type { MonoId, TopicId } from '@types'

const TAG = `${COMPONENT}/media-queue` as const

/** 存放等待发起获取媒体信息的 id */
const IDS: { type: string; id: string }[] = []

/** IDS 的 Set 索引，用于 O(1) 去重检查 */
const IDS_SET = new Set<string>()

/** 已获取过媒体信息的 id，用于 O(1) 去重检查 */
const LOADED_IDS = new Set<string>()

/** 排队项的回调, key 为 type:id, 该项处理完成后统一触发 */
const CALLBACKS = new Map<string, ((result?: boolean) => void)[]>()

/** 处理中的 key (shift 后到复位前), 用于区分「在途」与「已完结」 */
let LOADING_KEY: string | null = null

/** 失败项的冷却记录, key 为 type:id, value 为失败时间戳; 冷却期内同 key 不再入队 */
const FAILED_AT = new Map<string, number>()

/** 是否获取中 */
let loading = false

/** 生成去重 key */
function getMediaKey(type: string, id: string) {
  return `${type}:${id}`
}

/** 登记回调 */
function registerCallback(key: string, onLoaded: (result?: boolean) => void) {
  const callbacks = CALLBACKS.get(key)
  if (callbacks) callbacks.push(onLoaded)
  else CALLBACKS.set(key, [onLoaded])
}

/** 触发某个 key 的全部回调, 单个回调异常隔离不影响其他 */
function fireCallbacks(key: string, result?: boolean) {
  const callbacks = CALLBACKS.get(key)
  if (!callbacks?.length) return

  CALLBACKS.delete(key)
  callbacks.forEach(onLoaded => {
    try {
      onLoaded(result)
    } catch (error) {
      logger.error(TAG, 'fireCallbacks', error)
    }
  })
}

/** 列队请求媒体信息 */
export async function fetchMediaQueue(
  type?: string,
  id?: unknown,
  onLoaded?: (result?: boolean) => void
) {
  if (type && id) {
    // 针对 chrome 的「复制指向突出显示的内容的链接」, 清理 key
    const _id = String(id).split('#')[0]

    const key = getMediaKey(type, _id)

    // 冷却期内的失败项直接回调 false, 不再入队, 避免网络异常时请求放大
    const failedAt = FAILED_AT.get(key)
    if (failedAt && Date.now() - failedAt < MEDIA_FAIL_COOLDOWN) {
      onLoaded?.(false)
    } else {
      if (failedAt) FAILED_AT.delete(key)

      // 已完结的直接回调, 由调用方重读 store 自行判空; 在途的登记回调等完成再触发
      if (LOADED_IDS.has(key) && LOADING_KEY !== key) {
        onLoaded?.(true)
      } else {
        if (onLoaded) registerCallback(key, onLoaded)

        if (!IDS_SET.has(key) && !LOADED_IDS.has(key) && LOADING_KEY !== key) {
          if (IDS.length <= 16) {
            IDS.push({ type, id: _id })
            IDS_SET.add(key)
          } else {
            // 列队已满且无人认领, 兜底触发避免回调悬挂
            fireCallbacks(key, false)
          }
        }
      }
    }
  }

  if (!IDS.length) return

  if (loading) return

  const item = IDS.shift()
  const key = getMediaKey(item.type, item.id)
  IDS_SET.delete(key)
  LOADED_IDS.add(key)
  LOADING_KEY = key

  try {
    logger.log(TAG, 'fetchMediaQueue', IDS, item)

    loading = true
    let result: boolean | undefined
    if (item.type === 'subject') {
      result = await subjectStore.fetchSubjectSnapshot(item.id)
    } else if (item.type === 'topic') {
      result = await rakuenStore.fetchTopicSnapshot(item.id as TopicId)
    } else if (item.type === 'mono') {
      result = !!(await subjectStore.fetchMono(item.id as MonoId))?._loaded
    }

    // 仅复位 LOADING_KEY, 回调内同步重入可见干净状态, 无悬挂窗口;
    // loading 留待 sleep 后复位, 作为限速闸门避免并行请求
    LOADING_KEY = null

    // 回调只读本地 store, 取完数据即触发, 无需等待限速
    fireCallbacks(key, result)

    await sleep()
    loading = false

    void fetchMediaQueue().catch(() => {
      loading = false
    })
  } catch {
    // 失败项不算已完结, 从标记移除并进入冷却, 后续请求冷却后可重新入队真实重试
    LOADED_IDS.delete(key)
    FAILED_AT.set(key, Date.now())
    LOADING_KEY = null
    loading = false
    fireCallbacks(key, false)

    // 失败不搁置后续排队项
    void fetchMediaQueue().catch(() => {
      loading = false
    })
  }
}
