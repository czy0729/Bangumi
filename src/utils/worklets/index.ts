/*
 * @Author: czy0729
 * @Date: 2026-08-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-26 08:03:33
 */
import { IOS_IPA } from '@src/config'
import {
  scheduleOnRN as reanimatedScheduleOnRN,
  scheduleOnUI as reanimatedScheduleOnUI
} from './reanimated'

/** IPA (非 expo 的 iOS) 未安装 react-native-worklets 原生模块, 复用 reanimated 实现, 与 android 一致 */
export const scheduleOnRN = (
  IOS_IPA
    ? reanimatedScheduleOnRN
    : (require('react-native-worklets') as typeof import('react-native-worklets')).scheduleOnRN
) as typeof reanimatedScheduleOnRN

export const scheduleOnUI = (
  IOS_IPA
    ? reanimatedScheduleOnUI
    : (require('react-native-worklets') as typeof import('react-native-worklets')).scheduleOnUI
) as typeof reanimatedScheduleOnUI
