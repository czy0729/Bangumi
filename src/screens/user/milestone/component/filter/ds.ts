/*
 * @Author: czy0729
 * @Date: 2024-10-11 05:45:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-11 08:14:43
 */
import { rc } from '@utils/dev'
import { SUBJECT_TYPE } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Filter')

export const DATA = SUBJECT_TYPE.map(item => item.title)
