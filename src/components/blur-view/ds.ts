/*
 * @Author: czy0729
 * @Date: 2024-01-14 04:26:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 04:37:07
 */
import { BlurTint } from 'expo-blur'
import { rc } from '@utils/dev'
import { IOS } from '@constants'
import { IOS_IPA } from '@/config'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'BlurView')

export const BLURVIEW_TINT_LIGHT = (IOS && !IOS_IPA ? 'extraLight' : 'light') as BlurTint

export const BLURVIEW_TINT_DARK = 'dark' as BlurTint
