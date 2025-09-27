/*
 * @Author: czy0729
 * @Date: 2024-11-02 08:08:28
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-02 08:08:28
 */
import { rc } from '@utils/dev'
import { SUBJECT_TYPE } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Filter')

export const SUBJECT_TYPE_DS = SUBJECT_TYPE.map(item => item.title)
