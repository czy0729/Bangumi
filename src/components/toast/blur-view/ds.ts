/*
 * @Author: czy0729
 * @Date: 2024-07-09 08:00:36
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-07-09 08:00:36
 */
import { IOS } from '@constants/constants'
import { IOS_IPA } from '@src/config'

export const BLURVIEW_TINT_LIGHT = IOS && !IOS_IPA ? 'extraLight' : 'light'

export const BLURVIEW_TINT_DARK = 'dark'
