/*
 * @Author: czy0729
 * @Date: 2026-10-05 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 *
 * 找画集数据请求
 */
import { createSearch } from '@_'
import { search } from '@utils/subject/album'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 画集本地数据查询 */
  search = createSearch(this, search)
}
