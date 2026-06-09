/*
 * @Author: czy0729
 * @Date: 2026-02-13 12:15:25
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-02-13 12:15:25
 */
import { rc } from '@utils/dev'
import { HOST } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Award2025')

export const URI = `${HOST}/award/2025` as const
