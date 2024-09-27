/*
 * @Author: czy0729
 * @Date: 2024-01-14 04:26:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 16:35:05
 */
import { rc } from '@utils/dev'
// import { IOS } from '@constants'
// import { IOS_IPA } from '@/config'
import { COMPONENT as PARENT } from '../ds'
import { Props } from './types'

export const COMPONENT = rc(PARENT, 'BlurView')

// export const BLURVIEW_TINT_LIGHT = (IOS && !IOS_IPA ? 'extra-light' : 'light') as Props['tint']

export const BLURVIEW_TINT_LIGHT = 'light' as Props['tint']

export const BLURVIEW_TINT_DARK = 'dark' as Props['tint']
