/*
 * @Author: czy0729
 * @Date: 2026-08-29 04:53:09
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-29 04:53:09
 */
import { getExtraText } from '../utils'

import type { MilestoneItemData } from '../../../types'

/** 构造预计算数据 */
function item(
  partial: Partial<
    Pick<MilestoneItemData, 'timeStr' | 'parsedTime' | 'parsedTimeNoYear' | 'tipParsed'>
  > = {}
) {
  return {
    timeStr: '24-05-20',
    parsedTime: '1 年 2 个月前',
    parsedTimeNoYear: '2 个月前',
    tipParsed: '京都动画',
    ...partial
  }
}

describe('getExtraText', () => {
  it("模式 '序号' 返回 1 开始的序号", () => {
    expect(getExtraText('序号', 2, item(), true)).toBe('#3')
  })

  it("模式 '时间' 且未开启换算返回原始时间字符串", () => {
    expect(getExtraText('时间', 0, item(), false)).toBe('24-05-20')
  })

  it("模式 '时间' 开启换算且包含年时返回去掉年的格式", () => {
    expect(getExtraText('时间', 0, item(), true)).toBe('2 个月前')
  })

  it("模式 '时间' 开启换算且不包含年时原样返回", () => {
    expect(getExtraText('时间', 0, item({ parsedTime: '2 个月前' }), true)).toBe('2 个月前')
  })

  it("模式 '描述' 返回解析后的描述", () => {
    expect(getExtraText('描述', 0, item(), true)).toBe('京都动画')
  })

  it("模式 '评分' 与 '无' 返回空字符串", () => {
    expect(getExtraText('评分', 0, item(), true)).toBe('')
    expect(getExtraText('无', 0, item(), true)).toBe('')
  })
})
