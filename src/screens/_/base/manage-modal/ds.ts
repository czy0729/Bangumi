/*
 * @Author: czy0729
 * @Date: 2022-06-14 15:32:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:32:10
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ManageModal')

export const NAMESPACE = 'ManageModal'

export const MAX_HISTORY_COUNT = 7
