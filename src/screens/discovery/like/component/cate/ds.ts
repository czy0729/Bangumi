/*
 * @Author: czy0729
 * @Date: 2024-03-22 06:59:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-22 20:30:42
 */
import { rc } from '@utils/dev'
import { SUBJECT_TYPE } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Cate')

export const DATA = SUBJECT_TYPE.map(item => item.title)
