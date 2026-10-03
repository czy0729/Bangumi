/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-03 00:00:00
 */
import { rc } from '@utils/dev'
import { TEXT_UPDATE_MUSIC } from '@constants'
import { ADVANCE_LIMIT } from '../../ds'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Filter')

export const TEXT_INFORMATION = [
  `数据最后快照于 ${TEXT_UPDATE_MUSIC}，在版本更新前数据不会有任何变化。`,
  `本页数据来源自 bgm.tv，仅收录收藏人数大于 10 的音乐条目。`,
  `标签筛选为全量音乐条目出现次数前 100 的标签。`,
  `目前本功能仅对正常登录用户开放，非高级会员在一个条件下会有最多只显示前 ${ADVANCE_LIMIT} 条数据的限制。`,
  `整理不易，若觉得有用可以通过各种方式给与鼓励支持!`
].join('\n')
