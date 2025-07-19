/*
 * @Author: czy0729
 * @Date: 2024-09-14 15:58:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 16:02:49
 */
import { rc } from '@utils/dev'
import { HOST_AC_M } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Login')

export const URL_ZONE = `${HOST_AC_M}/space?from=headline`
