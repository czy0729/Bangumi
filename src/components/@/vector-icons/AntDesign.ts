/*
 * @Author: czy0729
 * @Date: 2021-10-14 16:55:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 00:00:00
 */
import createIconSet from './vendor/createIconSet'
import font from './vendor/react-native-vector-icons/Fonts/AntDesign.ttf'
import glyphMap from './vendor/react-native-vector-icons/glyphmaps/AntDesign.json'

export default createIconSet(glyphMap as Record<string, number>, 'anticon', font)
