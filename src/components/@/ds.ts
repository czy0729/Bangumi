/*
 * @Author: czy0729
 * @Date: 2024-06-28 13:12:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 06:22:29
 */
import { Platform } from 'react-native'
import Constants from 'expo-constants'

const IOS = Platform.OS === 'ios'

const IOS_IPA = Platform.OS === 'ios' && Constants.appOwnership !== 'expo'

export const BLURVIEW_TINT_LIGHT = IOS && !IOS_IPA ? 'extraLight' : 'light'

export const BLURVIEW_TINT_DARK = 'dark'
