/*
 * @Author: czy0729
 * @Date: 2024-01-03 00:16:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-17 06:59:43
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export { PERSPECTIVE, CONFIG as ANIMATED_CONFIG } from '@components/flip/ds'

export const COMPONENT = rc(PARENT, 'FlipBtn')

export const COMPONENT_MAIN = rc(COMPONENT)
