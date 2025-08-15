/*
 * @Author: czy0729
 * @Date: 2023-12-31 09:37:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 11:42:08
 */
import { rc } from '@utils/dev'
import { SUBJECT_TYPE } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'TabBarLeft')

export const DS = SUBJECT_TYPE.map(item => item.title)
