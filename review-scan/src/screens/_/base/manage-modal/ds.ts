/*
 * @Author: czy0729
 * @Date: 2022-06-14 15:32:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-28 05:53:54
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

const NAMESPACE = 'ManageModal'

export const NAMESPACE_PRIVACY = `${NAMESPACE}|privacy`

export const NAMESPACE_COMMENT = `${NAMESPACE}|commentHistory`

export const COMPONENT = rc(PARENT, NAMESPACE)

export const MAX_HISTORY_COUNT = 10
