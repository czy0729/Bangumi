/*
 * @Author: czy0729
 * @Date: 2024-01-14 04:26:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-23 06:11:42
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { Props } from './types'

export const COMPONENT = rc(PARENT, 'BlurView')

export const BLURVIEW_TINT_LIGHT = 'light' as Props['tint']

export const BLURVIEW_TINT_DARK = 'dark' as Props['tint']
