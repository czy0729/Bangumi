/*
 * @Author: czy0729
 * @Date: 2022-08-03 10:31:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-03 10:32:26
 */
import { StoreType as $ } from '../types'

export const DEFAULT_PROPS = {
  showComment: true,
  pageTotal: 0,
  total: 0,
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
