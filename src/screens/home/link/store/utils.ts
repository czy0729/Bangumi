/*
 * @Author: czy0729
 * @Date: 2026-09-28 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-20 12:00:00
 *
 * 关联图页面状态工具: 数据归一化与排序
 */
import type { NodeItem, RelateMap } from '../types'

/** 隐藏类型归一化为数字去重数组 (本地缓存为 JSON.parse 未定型边界, 旧版本存的是字符串) */
export function normalizeHideTypes(value: unknown): number[] {
  if (!Array.isArray(value)) return []

  return Array.from(new Set(value.map(item => Number(item)).filter(item => Number.isFinite(item))))
}

/**
 * 归一化关系图的 id 为数字
 *
 * 数据源存在字符串 id, 下游按严格相等与 Set 查找匹配, 必须在入口统一类型;
 * 无法解析的节点与被其引用的边直接丢弃 (归一化为 0 会与「无焦点」语义冲突, 且节点 key 会重复)
 */
export function normalizeRelateMap(map: RelateMap): RelateMap {
  // 数字与字符串两条分支统一只接受正整数, 避免同值不同类型得到不同结果
  const toId = (value: unknown) => {
    if (typeof value === 'number') {
      return Number.isInteger(value) && value > 0 ? value : null
    }
    if (typeof value !== 'string') return null

    const text = value.trim()
    if (!/^[1-9]\d*$/.test(text)) return null

    return Number(text)
  }

  const node: NodeItem[] = []
  ;(map.node || []).forEach(item => {
    const id = toId(item.id)
    if (id === null) return

    node.push({
      ...item,
      id
    })
  })

  const relate: RelateMap['relate'] = []
  ;(map.relate || []).forEach(edge => {
    const src = toId(edge.src)
    const dst = toId(edge.dst)
    if (src === null || dst === null) return

    relate.push({
      ...edge,
      src,
      dst
    })
  })

  return {
    ...map,
    id: toId(map.id) ?? 0,
    node,
    relate
  }
}

/** 按日期升序排序, 无日期排最后; 同日期时名称不含括号的优先 */
export function sortByDate(list: NodeItem[]) {
  return list.slice().sort((a, b) => {
    const dateA = a.date || '2099-12-31'
    const dateB = b.date || '2099-12-31'
    if (dateA !== dateB) return dateA.localeCompare(dateB)

    const hasParenA = (a.name || a.nameCN || '').includes('(')
    const hasParenB = (b.name || b.nameCN || '').includes('(')
    if (hasParenA !== hasParenB) return hasParenA ? 1 : -1

    return (a.name || a.nameCN || '').localeCompare(b.name || b.nameCN || '')
  })
}
