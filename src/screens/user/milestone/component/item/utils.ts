/*
 * @Author: czy0729
 * @Date: 2026-08-29 04:41:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 04:52:41
 */
import type { MilestoneItemData, SubTitle } from '../../types'

/**
 * 计算第二行 / 第三行文本
 *
 * @param mode 显示模式（序号 / 时间 / 描述）
 * @param index 条目索引
 * @param item 预计算数据
 * @param lastTime 是否开启时间换算
 */
export function getExtraText(
  mode: SubTitle,
  index: number,
  item: Pick<MilestoneItemData, 'timeStr' | 'parsedTime' | 'parsedTimeNoYear' | 'tipParsed'>,
  lastTime: boolean
): string {
  if (mode === '序号') return `#${index + 1}`

  if (mode === '时间') {
    if (lastTime) {
      return item.parsedTime.includes('年') ? item.parsedTimeNoYear : item.parsedTime
    }
    return item.timeStr
  }

  if (mode === '描述') return item.tipParsed

  return ''
}
