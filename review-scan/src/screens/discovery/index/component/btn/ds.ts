/*
 * @Author: czy0729
 * @Date: 2024-01-04 15:59:36
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-04 15:59:36
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Btn')

export const COMPONENT_MAIN = rc(COMPONENT)
