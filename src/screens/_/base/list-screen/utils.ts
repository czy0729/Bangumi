/*
 * @Author: czy0729
 * @Date: 2026-10-05 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-06 08:10:00
 *
 * 找XX 列表页公共逻辑: 筛选分组 / 条件清洗 / 列表过滤 / 查询与 init 骨架
 */
import { collectionStore } from '@stores'
import { logger } from '@utils/dev'

import type { SubjectId } from '@types'
import type { FilterItem } from './types'

const TAG = '@screens/_/base/list-screen'

/** 按列数把筛选项切成多行分组 (横向滚动用) */
export function groupItems<T>(list: readonly T[], column: number = 3): T[][] {
  const groups: T[][] = Array.from({ length: column }, (): T[] => [])
  list.forEach((item, index) => {
    groups[index % column].push(item)
  })
  return groups
}

/** 标题字号 (按长度动态: ≥20 字 → 13, ≥14 字 → 14, 其余 15) */
export function getTitleSize(title: string) {
  const length = String(title || '').length
  return length >= 20 ? 13 : length >= 14 ? 14 : 15
}

/** 摊平筛选表的二维分组, 非数组形态视为无候选项 */
function getOptions(data: readonly unknown[]) {
  if (!Array.isArray(data)) return []

  return data.reduce<unknown[]>((acc, item) => acc.concat(item as unknown[]), [])
}

/**
 * 清洗本地恢复的筛选条件
 *  - 以默认值的形态为准: 数组型仅保留合法项, 单值型不合法时回落默认值
 *  - 同时补齐新增筛选项的默认值
 *  - 默认值缺失时保留原值, 不写 undefined (候选表与默认值可能不同步)
 */
export function sanitizeQuery<T extends object>(
  query: unknown,
  defaults: T,
  filterDS: readonly FilterItem[]
): T {
  const source = query && typeof query === 'object' ? (query as Record<string, unknown>) : {}
  const result: Record<string, unknown> = { ...defaults, ...source }

  filterDS.forEach(({ type, data }) => {
    const options = getOptions(data)
    const fallback = defaults[type as keyof T]
    const value = result[type]

    if (Array.isArray(fallback)) {
      result[type] = Array.isArray(value)
        ? value.filter(item => options.includes(item))
        : [...fallback]
      return
    }

    if (value !== undefined && value !== '' && !options.includes(value) && fallback !== undefined) {
      result[type] = fallback
    }
  })

  return result as T
}

type FilterListOptions = {
  /** 数据源排序下标 */
  list?: number[]

  /** 页面筛选条件 (仅消费 collected) */
  query?: { collected?: string }

  /** 受限用户隐藏 NSFW 条目 (finger 的 x) */
  isExtremeLimit?: boolean

  /** 高级会员是否解锁 */
  advance?: boolean

  /** 非会员可见条数 */
  advanceLimit: number

  /** finger 取项, 数据带 x 的频道传入 */
  pick?: (index: number) => { x?: number } | undefined

  /** 下标 → 条目 ID */
  subjectId: (index: number) => SubjectId
}

/** 找XX 列表通用过滤: 受限隐藏 NSFW / 收藏隐藏 / 非会员截断 */
export function filterList(options: FilterListOptions): number[] {
  const { list, query, isExtremeLimit, advance, advanceLimit, pick, subjectId } = options
  let result = Array.isArray(list) ? [...list] : []

  if (isExtremeLimit && pick) {
    result = result.filter(item => pick(item)?.x !== 1)
  }

  if (query?.collected === '隐藏') {
    result = result.filter(item => !collectionStore.collect(subjectId(item)))
  }

  if (!advance) {
    result = result.slice(0, advanceLimit)
  }

  return result
}

type SearchStore = {
  state: { query: object }
  setState(state: object): void
}

/** 找XX 本地查询: 剔除页面本地维度后查询, 避免污染查询指纹 */
export function createSearch<S extends SearchStore, Q>(
  store: S,
  localSearch: (query: Q) => { list: number[] }
) {
  return () => {
    setTimeout(() => {
      const { collected, ...query } = store.state.query as Record<string, unknown>
      store.setState({
        data: localSearch(query as Q)
      })
    }, 80)
  }
}

type InitStore = {
  params?: { _tags?: string[] | string }
  state: { query: object }
  getStorageOnce(namespace: string): Promise<unknown>
  setState(state: object): void
  search(): void
  initQuery?(tags: string[]): void
}

type InitConfig = {
  /** 缓存命名空间 */
  namespace: string
  /** 筛选条件默认值 */
  defaults: Record<string, unknown>
  /** 筛选项表 */
  filterDS: readonly FilterItem[]
  /** 仅在无缓存时作为初始值的状态键 (已恢复的缓存态优先) */
  excludeState?: object
  /** 本地数据源加载 (仅首次进入) */
  initData: () => Promise<unknown>
  /** 额外初始化 (在默认 _tags 处理之后, search 之前执行) */
  onBeforeSearch?: (store: InitStore) => void
}

/** 找XX 页面统一 init: 恢复缓存 → 清洗筛选条件 → 首次加载数据源 → 查询 */
export function createInit(store: InitStore, config: InitConfig) {
  let fetched = false

  return async () => {
    const storageData = ((await store.getStorageOnce(config.namespace)) || {}) as {
      query?: unknown
    }
    const state: Record<string, unknown> = {
      ...(config.excludeState || {}),
      ...storageData,
      _loaded: fetched
    }

    /** 仅在恢复缓存时清洗, 再次进入页面保留当前筛选条件 */
    if (storageData.query) {
      state.query = sanitizeQuery(storageData.query, config.defaults, config.filterDS)
    }
    store.setState(state)

    if (!fetched) {
      fetched = true
      try {
        await config.initData()
      } catch (error) {
        /** 数据源解码失败: 置 fetched 避免反复重解大 bin, 流程继续以渲染空列表兜底, 不卡 Loading */
        logger.error(TAG, 'createInit', 'initData', error)
      }
    }

    const { _tags = [] } = store.params || {}
    if (_tags.length) store.initQuery?.(typeof _tags === 'string' ? [_tags] : _tags)

    config.onBeforeSearch?.(store)

    store.search()

    setTimeout(() => {
      store.setState({
        _loaded: true
      })
    }, 120)
  }
}
