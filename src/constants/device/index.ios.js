/*
 * @Author: czy0729
 * @Date: 2021-12-25 22:07:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-31 15:54:35
 */
import { Platform, Dimensions } from 'react-native'

export const PAD_LEVEL_1 = 616
export const PAD_LEVEL_2 = 900

const { width, height } = Dimensions.get('window')
const minSide = Math.min(width, height)
const maxSide = Math.max(width, height)
let isPad = 0

// 暂时认为长边 <= 短边 * 1.6, 且短边 >= PAD_LEVEL_1, 是平板
if ((maxSide <= minSide * 1.6 && minSide >= PAD_LEVEL_1) || Platform.isPad) {
  isPad = minSide >= PAD_LEVEL_2 ? 2 : 1
}

export const PAD = isPad
export const RATIO = PAD === 2 ? 1.64 : PAD === 1 ? 1.44 : 1
