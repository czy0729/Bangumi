/*
 * @Author: czy0729
 * @Date: 2022-08-03 10:31:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 11:19:16
 */
import { systemStore } from '@stores'
import { StoreType as $ } from '../types'

export const DEFAULT_PROPS = {
  showComment: true as typeof systemStore.setting.showComment,
  pageTotal: 0 as number,
  total: 0 as number,
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
