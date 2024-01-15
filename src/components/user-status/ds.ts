/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:18:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:45:45
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'UserStatus')

export const D1_TS = 24 * 60 * 60

export const D3_TS = 3 * D1_TS

export const D7_TS = 7 * D1_TS
