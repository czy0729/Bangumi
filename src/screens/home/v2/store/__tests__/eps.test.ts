/*
 * @Author: czy0729
 * @Date: 2026-10-08 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-08 12:00:00
 */
import { getAiredCount, getCurrentOnAir } from '../utils/eps'

import type { Ep } from '@stores/subject/types'

/** 构造最小章节 */
function makeEp(sort: number, status: Ep['status'] = 'Air'): Ep {
  return {
    id: sort,
    sort,
    type: 0,
    status,
    name: '',
    name_cn: '',
    airdate: ''
  } as unknown as Ep
}

describe('getAiredCount', () => {
  it('空章节返回 0', () => {
    expect(getAiredCount([])).toBe(0)
  })

  it('统计 status 为 Air 的章节数量', () => {
    expect(getAiredCount([makeEp(1), makeEp(2), makeEp(3, 'NA')])).toBe(2)
  })

  it('Today 不计入已放送', () => {
    expect(getAiredCount([makeEp(1), makeEp(2, 'Today')])).toBe(1)
  })

  // [回归] 章节非 1 开始时, sort 不能当作数量使用
  it('章节从第 2 集开始的条目, 放送到第 3 集返回 2 而不是 3', () => {
    const eps = [makeEp(2), makeEp(3), makeEp(4, 'NA'), makeEp(5, 'NA')]
    expect(getCurrentOnAir(eps)).toBe(3)
    expect(getAiredCount(eps)).toBe(2)
  })
})
