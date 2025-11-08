/*
 * @Author: czy0729
 * @Date: 2025-11-06 01:15:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-06 01:22:27
 */
import { rc } from '@utils/dev'
import { TEXT_UPDATE_NSFW } from '@constants'
import { ADVANCE_LIMIT } from '../../ds'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Filter')

export const TEXT_INFORMATION = [
  `数据最后快照于 ${TEXT_UPDATE_NSFW}，在版本更新前数据不会有任何变化。`,
  `本页数据非来源自 bgm.tv，并非所有条目都进行了收录。`,
  `有比 bgm.tv 更准确的分类、更丰富的筛选和更多的排序。`,
  `目前本功能仅对正常登录用户开放，非高级会员在一个条件下会有最多只显示前 ${ADVANCE_LIMIT} 条数据的限制。`,
  `整理不易，若觉得有用可以通过各种方式给与鼓励支持!`
].join('\n')
