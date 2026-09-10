/*
 * @Author: czy0729
 * @Date: 2019-11-23 03:00:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-01 17:19:48
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Base')

export const VALHALL_PRICE = {}

export const ITEMS_DESC = {
  混沌魔方: '随机抢其他玩家20-200股（每日限3次）',
  虚空道标: '指定抢某角色10-100股（每日限5次）',
  星光碎片: '消耗A角色的活股，补充B角色的固定资产',
  闪光结晶: '对目标角色的星之力造成伤害',
  鲤鱼之眼: '将幻想乡的股转至英灵殿（部分转为星之力）'
} as const

/**
 * tinygrail 列表通用参数
 * - 原先 initialNumToRender / maxToRenderPerBatch / updateCellsBatchingPeriod 均为 24,
 *   首批即挂载 24 行 (及其头像), iOS 内存吃紧; 向全局默认靠拢, 只保留略大的首屏数量避免白屏
 */
export const TINYGRAIL_LIST_PROPS = {
  windowSize: 5,
  initialNumToRender: 16,
  maxToRenderPerBatch: 10,
  updateCellsBatchingPeriod: 40,
  lazy: 24,
  refreshControlProps: {
    titleColor: _.colorTinygrailText,
    tintColor: _.colorTinygrailText
  },
  footerTextType: 'tinygrailText'
} as const
