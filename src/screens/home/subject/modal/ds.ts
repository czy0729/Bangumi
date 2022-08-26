/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:52:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 10:56:59
 */
import { StoreType as $ } from '../types'

export const DEFAULT_PROPS = {
  visible: false as boolean,
  subjectId: 0 as $['subjectId'],
  name: '' as $['subject']['name'],
  nameCn: '' as $['subject']['name_cn'],
  action: '看' as $['action'],
  onSubmit: (() => undefined) as $['doUpdateCollection'],
  onClose: (() => {}) as $['closeManageModal']
}
