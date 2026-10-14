/*
 * @Author: czy0729
 * @Date: 2024-07-25 06:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找番剧数据查询
 */
import { createSearch } from '@_'
import { search } from '@utils/subject/anime'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 动画本地数据查询 */
  search = createSearch(this, search)
}
