/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import { fixControlledValue, getHeightByRows } from '../utils'

describe('fixControlledValue', () => {
  it('undefined 归一为空字符串', () => {
    expect(fixControlledValue(undefined)).toBe('')
  })

  it('null 归一为空字符串', () => {
    expect(fixControlledValue(null)).toBe('')
  })

  it('正常字符串原样返回', () => {
    expect(fixControlledValue('bangumi')).toBe('bangumi')
  })

  it('空字符串原样返回', () => {
    expect(fixControlledValue('')).toBe('')
  })
})

describe('getHeightByRows', () => {
  const itemHeight = 44

  it('默认 rows=1 返回列表项高度', () => {
    expect(getHeightByRows(1, itemHeight)).toBe(44)
  })

  it('rows>1 按行数估算', () => {
    expect(getHeightByRows(2, itemHeight)).toBe(48)
  })

  it('rows 为空时返回列表项高度', () => {
    expect(getHeightByRows(undefined as any, itemHeight)).toBe(44)
  })
})
