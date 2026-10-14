/*
 * @Author: czy0729
 * @Date: 2024-07-25 20:33:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找游戏数据请求
 */
import { createSearch } from '@_'
import { search } from '@utils/subject/game'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 游戏本地数据查询 */
  search = createSearch(this, search)
}
