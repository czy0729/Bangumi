/*
 * @Author: czy0729
 * @Date: 2022-05-24 16:03:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-21 20:43:11
 */
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import { IOS } from '@constants/constants'
import { PAD, RATIO } from '@constants/device'

/** iPhone 非全面屏系列 */
export const IS_IOS_5_6_7_8 =
  !!String(Device.modelName).match(/iPhone (5|6|7|8|SE)/gi) ||
  !!(String(Device.modelName).match(/iPhone/gi) && Constants.statusBarHeight <= 24) ||
  (IOS && Constants.statusBarHeight === 20)

/** 是否平板 */
export const isPad = !!PAD

/** 平板放大比例 */
export const ratio = RATIO

/** 平板设备统一放大单位 */
export const padIncrease = PAD === 2 ? 4 : 2
