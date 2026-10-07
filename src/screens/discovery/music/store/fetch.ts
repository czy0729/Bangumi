/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-03 00:00:00
 *
 * 找音乐数据请求
 */
import { createSearch } from '@_'
import { search } from '@utils/subject/music'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 音乐本地数据查询 */
  search = createSearch(this, search)
}
