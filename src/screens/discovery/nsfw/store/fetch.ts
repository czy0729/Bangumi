/*
 * @Author: czy0729
 * @Date: 2024-07-20 10:40:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找 NSFW 数据请求
 */
import { createSearch } from '@_'
import { search } from '@utils/subject/nsfw'
import Computed from './computed'

export default class Fetch extends Computed {
  /** NSFW 本地数据查询 */
  search = createSearch(this, search)
}
