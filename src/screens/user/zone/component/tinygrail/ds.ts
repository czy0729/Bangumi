/*
 * @Author: czy0729
 * @Date: 2024-01-06 20:31:07
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-06 20:31:07
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Tinygrail')

export const DEFAULT_AMOUNT = 10000

export const MIN_AMOUNT = 1000

export const MAX_AMOUNT = 1000000

export const STEP_AMOUNT = 10000
