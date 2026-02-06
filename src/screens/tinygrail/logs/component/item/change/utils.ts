/*
 * @Author: czy0729
 * @Date: 2026-02-07 07:37:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 07:39:55
 */
import type { TextProps } from '@components'

type ParsedChange = {
  type: TextProps['type']
  text: string
  type2?: TextProps['type']
  text2?: string
}

/** 从描述里解析变化语义 */
export function parseDescChange(desc: string): ParsedChange | null {
  // 抽取数量 + 单位
  let amount: string | null = null
  let unit = '股'

  const assetMatch = desc.match(/(\d+)股固定资产/)
  if (assetMatch) {
    amount = assetMatch[1]
    unit = '资产'
  } else {
    const m = desc.match(/(\d+)股/)
    if (m) amount = m[0].replace('股', '')
  }

  if (!amount) return null

  const valueText = `${amount}${unit}`

  // 充能：双向变化（优先）
  if (desc.includes('充能')) {
    const matches = desc.match(/\d+股/g)
    if (matches && matches[1]) {
      return {
        type: 'ask',
        text: `-${matches[0].replace('股', unit)}`,
        type2: 'bid',
        text2: `+${matches[1].replace('股', unit)}`
      }
    }
  }

  // 正向获得
  if (['买入', '获得', '获奖'].some(k => desc.includes(k))) {
    return {
      type: 'bid',
      text: `+${valueText}`
    }
  }

  // 冻结 / 默认支出
  return {
    type: desc.includes('冻结') ? 'tinygrailText' : 'ask',
    text: `-${valueText}`
  }
}
