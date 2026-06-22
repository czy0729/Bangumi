/*
 * @Author: czy0729
 * @Date: 2024-01-14 15:32:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-22 20:28:57
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const DEFAULT_NODE_NAME = 'HardwareTextureRootBlurView'

export const COMPONENT_ROOT = rc(PARENT, 'HardwareTextureRootBlurView')

export const COMPONENT = rc(PARENT, 'HardwareTextureBlurView')
