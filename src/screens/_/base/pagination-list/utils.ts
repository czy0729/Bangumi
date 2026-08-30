/*
 * @Author: czy0729
 * @Date: 2026-08-31 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 12:00:00
 *
 * 本地分页的纯函数: 页数计算 / 页码钳制 / 页切片 (页码均为 1-indexed)
 * 页码越界统一防御, 避免 Array.slice 负索引命中末尾数据的陷阱
 */

/**
 * 计算总页数, 向上取整
 *
 * @param length 数据总量
 * @param limit 一页个数
 */
export const calcPageTotal = (length: number, limit: number): number => {
  if (limit <= 0) return 0
  return Math.ceil(length / limit)
}

/**
 * 页码钳制到 [0, pageTotal], 数据缩短时防止当前页越界; 空数据 (pageTotal 为 0) 时页码归 0
 *
 * @param page 当前页码
 * @param pageTotal 总页数
 */
export const clampPage = (page: number, pageTotal: number): number =>
  Math.max(0, Math.min(page, pageTotal))

/**
 * 第 1 页到 page 页的可见切片, 用于托管列表数据
 *
 * @param data 全量数据
 * @param page 当前页码 (1-indexed, 小于 0 视为 0)
 * @param limit 一页个数
 */
export const getVisibleList = <ItemT>(
  data: readonly ItemT[],
  page: number,
  limit: number
): ItemT[] => {
  if (page < 0) return []
  return data.slice(0, page * limit)
}

/**
 * 第 page 页切片
 *
 * @param data 全量数据
 * @param page 页码 (1-indexed, 小于 1 返回空数组)
 * @param limit 一页个数
 */
export const getPageData = <ItemT>(
  data: readonly ItemT[],
  page: number,
  limit: number
): ItemT[] => {
  if (page < 1) return []
  return data.slice((page - 1) * limit, page * limit)
}
