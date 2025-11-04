/*
 * @Author: czy0729
 * @Date: 2024-03-16 15:47:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-04 16:09:32
 */
import { rc } from '@utils/dev'
import { TEXT_UPDATE_ANIME } from '@constants'
import { ADVANCE_LIMIT } from '../../ds'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Filter')

export const TEXT_INFORMATION = [
  `数据最后快照于 ${TEXT_UPDATE_ANIME}，在版本更新前数据不会有任何变化，预计一个季度更新一次。`,
  `本页数据非来源自 bgm.tv，并非所有条目都进行了收录，通常收录的都是有对应源头的数据。`,
  `有比 bgm.tv 更准确的分类、更丰富的筛选、最后更新章节和更多的排序。`,
  `目前本功能对所有用户开放，非高级会员在一个条件下会有最多只显示前 ${ADVANCE_LIMIT} 条数据的限制。`,
  `整理不易，若觉得有用可以通过各种方式给与鼓励支持!`
].join('\n')
