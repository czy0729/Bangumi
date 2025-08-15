/*
 * @Author: czy0729
 * @Date: 2024-01-14 15:32:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:05:23
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT_ROOT = rc(PARENT, 'HardwareTextureRootBlurView')

export const COMPONENT = rc(PARENT, 'HardwareTextureBlurView')
