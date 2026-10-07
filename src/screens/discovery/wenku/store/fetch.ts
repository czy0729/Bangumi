/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 00:00:00
 *
 * 找文库数据请求
 */
import { createSearch } from '@_'
import { search } from '@utils/subject/wenku'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 文库本地数据查询 */
  search = createSearch(this, search)
}
