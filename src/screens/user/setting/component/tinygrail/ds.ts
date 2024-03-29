/*
 * @Author: czy0729
 * @Date: 2022-07-18 14:00:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:44:11
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Tinygrail')

export const TEXTS = {
  tinygrail: {
    hd: '小圣杯',
    information:
      '人物卡片交易玩法，目前玩法已死，你也可以当成是每天的人物抽奖刮刮乐，人物塔图收集玩法罢了\nQQ 群号：1038257138'
  },
  tinygrailMode: {
    hd: '涨跌色',
    search: '绿涨红跌, 红涨绿跌'
  },
  homeCustom: {
    hd: '进度页右上角入口',
    information: 'v7.3.2 后不再默认配置小圣杯入口\n若需要请手动设置'
  }
} as const

export const DS = ['绿涨红跌', '红涨绿跌'] as const
