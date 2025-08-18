/*
 * @Author: czy0729
 * @Date: 2024-01-14 15:32:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:23:46
 */
import { rc } from '@utils/dev'
import { PAD } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Iconfont')

export const PAD_INCREASE = PAD === 2 ? 4 : 2
