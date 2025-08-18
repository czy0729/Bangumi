/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:52:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 15:58:34
 */
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT as PARENT } from '../ds'

import type { Ctx } from '../../types'
type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Modal')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  visible: false as boolean,
  disabled: false as boolean,
  subjectId: 0 as $['subjectId'],
  name: '' as $['subject']['name'],
  nameCn: '' as $['subject']['name_cn'],
  action: '看' as $['action'],
  onSubmit: (() => undefined) as $['doUpdateCollection'],
  onClose: FROZEN_FN as $['closeManageModal']
}
