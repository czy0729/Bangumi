/*
 * @Author: czy0729
 * @Date: 2024-02-19 11:15:47
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-02-19 11:15:47
 */
import { Dimensions } from 'react-native'

const { width: WINDOW_WIDTH } = Dimensions.get('screen')
export const MENU_WIDTH = Math.min((WINDOW_WIDTH * 60) / 100, 280)
