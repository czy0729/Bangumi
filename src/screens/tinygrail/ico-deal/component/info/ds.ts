import { _ } from '@stores'
/*
 * @Author: czy0729
 * @Date: 2024-03-01 22:48:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-01 22:54:11
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Info')

export const MAX_SIZE = _.window.width / 3
