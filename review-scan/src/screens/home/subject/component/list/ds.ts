/*
 * @Author: czy0729
 * @Date: 2024-01-03 15:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 01:01:44
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../../ds'

export const COMPONENT = rc(PARENT, 'List')

export const REFRESH_CONTROL_PROPS = {
  tintColor: _.__colorPlain__,
  titleColor: _.__colorPlain__
} as const
