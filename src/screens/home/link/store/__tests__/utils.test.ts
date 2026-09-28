/*
 * @Author: czy0729
 * @Date: 2026-09-28 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 *
 * 关联图页面状态工具单测
 */
import { normalizeHideTypes } from '../utils'

describe('normalizeHideTypes', () => {
  it('旧缓存的字符串转换为数字', () => {
    expect(normalizeHideTypes(['2', '6'])).toEqual([2, 6])
  })

  it('数字原样保留', () => {
    expect(normalizeHideTypes([2, 6])).toEqual([2, 6])
  })

  it('过滤无法转换的值并去重', () => {
    expect(normalizeHideTypes(['2', 2, 'x', undefined, {}])).toEqual([2])
  })

  it('非数组返回空数组', () => {
    expect(normalizeHideTypes(undefined)).toEqual([])
    expect(normalizeHideTypes('2')).toEqual([])
  })
})
