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
  虚空道标: '指定抢某角色10-100股（每日限3次）',
  星光碎片: '消耗A角色的活股，补充B角色的固定资产',
  闪光结晶: '对目标角色的星之力造成伤害',
  鲤鱼之眼: '将幻想乡的股转至英灵殿（部分转为星之力）'
} as const

export const TINYGRAIL_LIST_PROPS = {
  windowSize: 6,
  initialNumToRender: 24,
  maxToRenderPerBatch: 24,
  updateCellsBatchingPeriod: 24,
  lazy: 24,
  refreshControlProps: {
    titleColor: _.colorTinygrailText,
    tintColor: _.colorTinygrailText
  },
  footerTextType: 'tinygrailText'
} as const
