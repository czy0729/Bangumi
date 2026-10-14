/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找 Hentai 数据查询
 */
import { createSearch } from '@_'
import { search } from '@utils/subject/hentai'
import Computed from './computed'

export default class Fetch extends Computed {
  /** Hentai 本地数据查询 */
  search = createSearch(this, search)
}
