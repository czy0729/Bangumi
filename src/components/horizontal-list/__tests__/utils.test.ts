/*
 * @Author: czy0729
 * @Date: 2026-08-19 07:59:57
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-19 07:59:57
 */
import { getListData } from '../utils'

describe('horizontal-list/utils', () => {
  const items = [{ id: 1, image: 'a' }, { id: 2 }, { id: 3, image: 'b' }]

  it('getListData 没封面图的置后', () => {
    const sorted = getListData(items, true, 0, false)
    expect(sorted.map(item => item.id)).toEqual([1, 3, 2])
  })

  it('getListData 截取前 N 项', () => {
    expect(getListData(items, false, 2, false)).toHaveLength(2)
  })

  it('getListData scrolled 时返回全部', () => {
    expect(getListData(items, false, 2, true)).toHaveLength(3)
  })

  it('getListData 空数据返回空数组', () => {
    expect(getListData([], true, 0, false)).toEqual([])
  })
})
