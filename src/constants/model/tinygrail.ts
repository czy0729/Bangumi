/*
 * @Author: czy0729
 * @Date: 2026-09-03 23:19:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:19:40
 *
 * 字典 - 小圣杯
 */
import { Model } from './utils'

export const TINYGRAIL_ASSETS_TYPE = [
  {
    label: '所有',
    value: 'all'
  },
  {
    label: '流动股',
    value: 'mono'
  },
  {
    label: '圣殿股',
    value: 'temple'
  }
] as const

/** [小圣杯] 股类型 */
export const MODEL_TINYGRAIL_ASSETS_TYPE = new Model(TINYGRAIL_ASSETS_TYPE, 'TINYGRAIL_ASSETS_TYPE')

/** [小圣杯] 工具条类型 */

export const TINYGRAIL_CALCULATE_TYPE = [
  {
    label: '持仓价值',
    value: 'value'
  },
  {
    label: '周股息',
    value: 'rateWeek'
  },
  {
    label: '股息',
    value: 'rate'
  },
  {
    label: '持股数',
    value: 'amount'
  },
  {
    label: '市场价',
    value: 'market'
  },
  {
    label: '发行量',
    value: 'total'
  },
  {
    label: '当前价',
    value: 'current'
  },
  {
    label: '交易量',
    value: 'change'
  },
  {
    label: '当前涨跌',
    value: 'fluctuation'
  },
  {
    label: '新番奖励',
    value: 'bonus'
  }
] as const

/** [小圣杯] 工具条类型 */
export const MODEL_TINYGRAIL_CALCULATE_TYPE = new Model(
  TINYGRAIL_CALCULATE_TYPE,
  'TINYGRAIL_CALCULATE_TYPE'
)

/** [小圣杯] 工具条圣殿类型 */

export const TINYGRAIL_CALCULATE_TEMPLE_TYPE = [
  {
    label: '持仓价值',
    value: 'value'
  },
  {
    label: '周股息',
    value: 'rateWeek'
  },
  {
    label: '股息',
    value: 'rate'
  },
  {
    label: '持股数',
    value: 'amount'
  }
] as const

/** [小圣杯] 首富类型 */

export const TINYGRAIL_CALCULATE_RICH_TYPE = [
  {
    label: '周股息',
    value: 'share'
  },
  {
    label: '总资产',
    value: 'assets'
  },
  {
    label: '流动资金',
    value: 'balance'
  },
  {
    label: '初始资金',
    value: 'principal'
  }
] as const

/** [小圣杯] 首富类型 */
export const MODEL_TINYGRAIL_CALCULATE_RICH_TYPE = new Model(
  TINYGRAIL_CALCULATE_RICH_TYPE,
  'TINYGRAIL_CALCULATE_RICH_TYPE'
)

/** [设置] 时区 */
