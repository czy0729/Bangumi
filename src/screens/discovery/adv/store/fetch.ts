/*
 * @Author: czy0729
 * @Date: 2024-07-14 15:52:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 找 Gal 数据查询
 */
import { createSearch } from '@_'
import { search } from '@utils/subject/adv'
import Computed from './computed'

export default class Fetch extends Computed {
  /** ADV 本地数据查询 */
  search = createSearch(this, search)
}
