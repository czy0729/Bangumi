/*
 * @Author: czy0729
 * @Date: 2026-10-01 05:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-01 05:51:35
 *
 * 详情拉取工具
 */
import { logger } from '@utils/dev'
import { queue } from '@utils/fetch'
import Crypto from '@utils/thirdParty/crypto'

import type { SubjectId } from '@types'

const TAG = '@stores/ota'

/** info */
export function log(method: string, ...others: unknown[]) {
  logger.info(TAG, method, ...others)
}

/** err */
function err(method: string, ...others: unknown[]) {
  logger.error(TAG, method, ...others)
}

/** 详情单文件并发数 */
const DETAIL_CONCURRENCY = 4

/**
 * 本轮冷启动已重试过的缺封面条目
 *
 * 模块级变量随 JS 重建清空, 因此缺封面的条目每轮冷启动都会重试一次
 */
const RETRIED = new Set<string>()

/** 缺封面的条目本轮冷启动是否已重试过 (未重试则顺带标记) */
export function isRetried(key: string) {
  if (RETRIED.has(key)) return true

  RETRIED.add(key)
  return false
}

/**
 * 本轮冷启动请求失败过的详情条目 (404 / 数据无效 / 异常)
 *
 * 模块级变量随 JS 重建清空, 失败条目每轮冷启动只请求一次,
 * 避免 CDN 上不存在的详情随翻页被反复请求
 */
const FAILED = new Set<string>()

/** 详情请求失败条目本轮冷启动是否已请求过 */
export function isFailed(key: string) {
  return FAILED.has(key)
}

type FetchDetailPageOptions<T> = {
  /** finger 排序下标 */
  list: number[]
  /** 状态键与缓存键前缀, 如 'anime' */
  name: string
  /** 日志方法名, 如 'onAnimePage' */
  label: string
  /** 已缓存详情 */
  cache: Record<string, Partial<T> | undefined>
  /** 下标 → 条目 ID */
  subjectId: (index: number) => SubjectId
  /** 单条详情地址 */
  getUrl: (subjectId: SubjectId) => string
  /** 是否已加载 (即判重字段) */
  isLoaded: (item: Partial<T>) => boolean
  /** 是否有封面 */
  hasCover: (item: T) => boolean
}

/**
 * 列表分页详情拉取
 *
 * 判重: 无详情且本轮未失败过的直接请求, 已加载但缺封面的每轮冷启动重试一次
 */
export async function fetchDetailPage<T extends object>(
  options: FetchDetailPageOptions<T>
): Promise<Record<string, T>> {
  const { list, name, label, cache, subjectId, getUrl, isLoaded, hasCover } = options
  const subjectIds: SubjectId[] = []
  list.forEach(index => {
    const id = subjectId(index)
    if (!id) return

    const key = `${name}_${id}`
    const item = cache[key]
    if (item && isLoaded(item)) {
      if (hasCover(item as T) || isRetried(key)) return
    } else if (isFailed(key)) {
      return
    }
    subjectIds.push(id)
  })
  if (!subjectIds.length) return {}

  const data = await fetchDetails<T>(subjectIds, name, getUrl, item => isLoaded(item))
  const keys = Object.keys(data)
  log(label, {
    total: list.length,
    requested: subjectIds.length,
    loaded: keys.length,
    noCover: keys.filter(key => !hasCover(data[key]))
  })
  return data
}

/**
 * 批量拉取 CDN 加密单文件详情
 *
 * 失败的条目不返回数据也不入库, 避免空详情被持久化后锁死;
 * 同时标记进 FAILED, 本轮冷启动内不再重试
 */
export async function fetchDetails<T extends object>(
  subjectIds: SubjectId[],
  keyPrefix: string,
  getUrl: (subjectId: SubjectId) => string,
  check: (item: T) => boolean
): Promise<Record<string, T>> {
  const datas =
    (await queue(
      subjectIds.map(subjectId => async () => {
        const key = `${keyPrefix}_${subjectId}`
        const url = getUrl(subjectId)
        try {
          const res = await fetch(url)
          if (!res.ok) {
            err(`${keyPrefix} 请求失败`, subjectId, { url, status: res.status })
            FAILED.add(key)
            return null
          }

          const item = Crypto.get<T>(await res.text())
          if (!item || typeof item !== 'object' || !check(item)) {
            err(`${keyPrefix} 数据无效`, subjectId, { url, item })
            FAILED.add(key)
            return null
          }

          log(`${keyPrefix} 数据`, subjectId, { url, item })
          return [subjectId, item] as const
        } catch (error) {
          err(`${keyPrefix} 请求异常`, subjectId, { url }, error)
          FAILED.add(key)
          return null
        }
      }),
      DETAIL_CONCURRENCY
    )) || []

  const data: Record<string, T> = {}
  datas.forEach(item => {
    if (!item) return

    const [subjectId, detail] = item
    data[`${keyPrefix}_${subjectId}`] = detail
  })
  return data
}
