/*
 * @Author: czy0729
 * @Date: 2021-03-20 18:03:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 07:21:37
 *
 * 精简过的 vector-icons@10.0.0 Ionicons
 */
import createIconSet from './vendor/createIconSet'
import font from './vendor/react-native-vector-icons/Fonts/Ionicons.ttf'
import glyphMap from './vendor/react-native-vector-icons/glyphmaps/Ionicons.json'

export default createIconSet(glyphMap as Record<string, number>, 'ionicons', font)
