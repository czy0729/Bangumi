/*
 * @Author: czy0729
 * @Date: 2021-12-25 22:07:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-15 12:35:37
 */
import { Dimensions } from 'react-native'
import DeviceInfo from 'react-native-device-info'

/** 平板小 */
export const PAD_LEVEL_1 = 528 // 616

/** 平板大 */
export const PAD_LEVEL_2 = 880

const { width, height } = Dimensions.get('window')
const minSide = Math.min(width, height)
const maxSide = Math.max(width, height)
let isPad = 0

// 暂时认为长边 <= 短边 * 1.6, 且短边 >= PAD_LEVEL_1, 是平板
if ((maxSide <= minSide * 1.6 && minSide >= PAD_LEVEL_1) || DeviceInfo.isTablet()) {
  isPad = minSide >= PAD_LEVEL_2 ? 2 : 1
}

/** 是否平板 */
export const PAD = isPad

/** 平板放大比例 */
export const RATIO = PAD === 2 ? 1.64 : PAD === 1 ? 1.44 : 1
