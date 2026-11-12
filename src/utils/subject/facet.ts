/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:30:00
 *
 * 分面计数: 各频道声明「item → 候选桶」的维度映射, 任意查询的全表条件计数
 *  - 逐 item 桶索引首建一次 (单值维度 Int16Array, 多值维度零拷贝引用 item 自身数组)
 *  - 每次查询一次前缀 / 后缀 AND 扫描 (纯数组读, 无分配, 毫秒级, 同步)
 *  - 查询指纹 → 全表结果强缓存, 会话内重复状态零计算
 * 桶函数与 search 谓词的一致性由 scripts/generate-filter-counts.js 构建期逐候选校验。
 */

/** 条件计数结果: 维度 key → 候选文案 → 数量 (含 FACET_ALL) */
export type FacetCounts = Record<string, Record<string, number>>

/** 「全部」(该维度不限制) 的计数键 */
export const FACET_ALL = '__all__'

export type FacetDim<I> = {
  /** 查询键 (FilterItem.type) */
  key: string

  /** 候选文案, 与筛选组 data 摊平后一致 */
  values: readonly (string | number)[]

  /**
   * item 在该维命中的候选下标
   *  - 单命中返回 number (无命中返回 -1), 多命中返回下标数组 (空数组 = 无命中)
   *  - 必须是 item 的纯函数 (与查询无关), 语义与 search 同维谓词一致
   *  */
  bucketsOf: (item: I) => number | readonly number[]
}

const EMPTY: readonly number[] = []

/** 年份文案 → 下标表, 返回 年份字符串前缀 → 桶下标 ('2000以前' 含 1000-2000) */
export function createYearBucket(values: readonly (string | number)[]) {
  const map = new Map(values.map((value, index) => [String(value), index] as const))
  const qian = map.get('2000以前')
  return (value: string | undefined) => {
    if (!value) return -1
    const year = Number(value.slice(0, 4))
    if (!year) return -1
    if (year <= 2000) return year >= 1000 && qian !== undefined ? qian : -1
    return map.get(String(year)) ?? -1
  }
}

/** 档位区间 → 桶 (逐候选独立判定, 与 search 的 matchRange 一致) */
export function createRangeBuckets(
  labels: readonly string[],
  ranges: Record<string, [number, number]>
) {
  return (value: number | undefined) => {
    if (!value) return [] as number[]
    const result: number[] = []
    labels.forEach((label, index) => {
      const range = ranges[label]
      if (range && value >= range[0] && (!range[1] || value <= range[1])) result.push(index)
    })
    return result
  }
}

/**
 * 别名共享桶: 候选名 → 下标集 (别名同组共享), 倒排为 item 下标 → 命中的候选下标集
 *  - item 命中某别名组成员时, 组内全部候选都计入 (与 search 的 nums.some 一致)
 *  - 组员下标取 [0] 与 search 的 TAG_MATCH 同构 (链式别名两边语义一致, 构建期校验兜底)
 */
export function createAliasBuckets(
  labels: readonly string[],
  aliasGroups: readonly (readonly string[])[]
) {
  const numsByLabel = new Map<string, number[]>()
  labels.forEach((label, index) => numsByLabel.set(label, [index]))
  aliasGroups.forEach(group => {
    const nums = group
      .filter(label => numsByLabel.has(label))
      .map(label => numsByLabel.get(label)![0])
    if (nums.length < 2) return
    group.forEach(label => {
      if (numsByLabel.has(label)) numsByLabel.set(label, nums)
    })
  })

  const byIndex = new Map<number, number[]>()
  labels.forEach((label, index) => {
    ;(numsByLabel.get(label) || []).forEach(num => {
      const list = byIndex.get(num) || []
      list.push(index)
      byIndex.set(num, list)
    })
  })

  return (tags: readonly number[] | undefined) => {
    if (!tags?.length) return EMPTY
    const result: number[] = []
    const seen = new Set<number>()
    tags.forEach(tag => {
      ;(byIndex.get(tag) || []).forEach(index => {
        if (!seen.has(index)) {
          seen.add(index)
          result.push(index)
        }
      })
    })
    return result
  }
}

/** 结果缓存上限 (会话内不同查询状态有限, 超出淘汰最早) */
const CACHE_LIMIT = 100

/**
 * 创建频道维度的条件计数器
 *  - 数据未就绪 (空) 时 counts 返回 null, 调用方可回落静态分布
 *  - 查询里未声明的键 (collected / sort 等) 不参与命中
 */
export function createFacetCounter<I>(getData: () => readonly I[], dims: readonly FacetDim<I>[]) {
  /** 每维候选文案 → 下标 (查询值统一 String 化后查找) */
  const labelIndexMaps = dims.map(dim => {
    const map = new Map<string, number>()
    dim.values.forEach((label, index) => map.set(String(label), index))
    return map
  })

  /**
   * 逐 item 桶索引 (首次计数时构建)
   *  - 单值维度: Int16Array (无命中 = -1)
   *  - 多值维度: 下标 → 命中候选下标数组 (直接引用 item 自身数组, 零拷贝)
   *  - undefined = 未构建; null = 数据为空, 不可构建
   */
  let index: readonly (Int16Array | readonly (readonly number[])[])[] | null | undefined
  /** 构建索引时的数据量, 数据替换 (长度变化) 时重建 */
  let indexLength = 0
  const singleFlags = new Array<boolean>(dims.length).fill(false)

  function buildIndex() {
    const data = getData()
    if (!data.length) return null

    const built = dims.map((dim, d) => {
      const temp = new Array<number | readonly number[]>(data.length)
      let hasArray = false
      for (let i = 0; i < data.length; i++) {
        const bucket = dim.bucketsOf(data[i])
        temp[i] = bucket
        if (typeof bucket !== 'number') hasArray = true
      }

      if (!hasArray) {
        const single = new Int16Array(data.length)
        for (let i = 0; i < data.length; i++) single[i] = temp[i] as number
        singleFlags[d] = true
        return single
      }

      singleFlags[d] = false
      return temp.map(bucket =>
        typeof bucket === 'number' ? (bucket === -1 ? EMPTY : [bucket]) : bucket || EMPTY
      )
    })
    return built
  }

  /** 结果强缓存: 查询指纹 → 全表 */
  const cache = new Map<string, FacetCounts>()

  function compute(query: Record<string, unknown> | undefined): FacetCounts | null {
    const data = getData()
    if (!data.length || !dims.length) return null

    // 每维的选中下标集: undefined / '' / [] → 不限制 (null); 数组内含未知候选 → 不可能命中 ([])
    const selected = dims.map((dim, d) => {
      const value = query?.[dim.key]
      const map = labelIndexMaps[d]
      if (value === undefined || value === '' || value === null) return null
      if (Array.isArray(value)) {
        if (!value.length) return null
        const idx = value.map(v => map.get(String(v))).filter(num => num !== undefined)
        return idx as number[]
      }
      const idx = map.get(String(value))
      return idx === undefined ? [] : [idx]
    })

    const result: FacetCounts = {}
    dims.forEach(dim => {
      // 全候选补零: 零结果候选必须有显式 0, 否则展示层回落静态数字且置灰失效
      const bucket: Record<string, number> = { [FACET_ALL]: 0 }
      dim.values.forEach(label => {
        bucket[String(label)] = 0
      })
      result[dim.key] = bucket
    })

    const { length } = dims
    const flags = new Array<boolean>(length).fill(false)
    const prefix = new Array<boolean>(length + 1).fill(false)
    const suffix = new Array<boolean>(length + 1).fill(false)

    for (let i = 0; i < data.length; i++) {
      for (let d = 0; d < length; d++) {
        const sel = selected[d]
        if (!sel) {
          flags[d] = true
          continue
        }
        if (singleFlags[d]) {
          const value = (index![d] as Int16Array)[i]
          flags[d] = value !== -1 && (sel.length === 1 ? sel[0] === value : sel.includes(value))
        } else {
          const buckets = (index![d] as readonly (readonly number[])[])[i] || EMPTY
          // sel 为空数组 (选中值全部未知) = 不可能命中, 与单值维语义一致
          let hit = sel.length > 0
          for (let k = 0; k < sel.length; k++) {
            if (!buckets.includes(sel[k])) {
              hit = false
              break
            }
          }
          flags[d] = hit
        }
      }

      prefix[0] = true
      for (let d = 0; d < length; d++) prefix[d + 1] = prefix[d] && flags[d]
      suffix[length] = true
      for (let d = length - 1; d >= 0; d--) suffix[d] = suffix[d + 1] && flags[d]

      for (let d = 0; d < length; d++) {
        if (!(prefix[d] && suffix[d + 1])) continue

        const bucket = result[dims[d].key]
        bucket[FACET_ALL]++

        if (singleFlags[d]) {
          const value = (index![d] as Int16Array)[i]
          if (value !== -1) {
            const label = String(dims[d].values[value])
            bucket[label] = (bucket[label] || 0) + 1
          }
        } else {
          const buckets = (index![d] as readonly (readonly number[])[])[i] || EMPTY
          for (let k = 0; k < buckets.length; k++) {
            const label = String(dims[d].values[buckets[k]])
            bucket[label] = (bucket[label] || 0) + 1
          }
        }
      }
    }

    return result
  }

  function counts(query: Record<string, unknown> | undefined): FacetCounts | null {
    const finger = JSON.stringify(query || {})

    // 索引有效性须在缓存命中前判定: 数据替换 (长度变化) 时重建索引并作废全部指纹缓存,
    // 否则同指纹查询会在缓存命中处直接返回旧数据结果, 走不到重建分支
    const data = getData()
    if (data.length !== indexLength) {
      index = data.length ? buildIndex() : null
      indexLength = data.length
      cache.clear()
    }
    if (!index) return null

    const cached = cache.get(finger)
    if (cached) return cached

    const result = compute(query)
    if (!result) return null

    cache.set(finger, result)
    if (cache.size > CACHE_LIMIT) {
      const first = cache.keys().next().value as string
      if (first !== undefined) cache.delete(first)
    }
    return result
  }

  return { counts }
}
