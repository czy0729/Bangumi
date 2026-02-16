/*
 * @Author: czy0729
 * @Date: 2024-02-19 11:15:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 06:24:03
 */
import { Dimensions } from 'react-native'

const { width: WINDOW_WIDTH, height } = Dimensions.get('screen')

export const MENU_WIDTH = Math.min((WINDOW_WIDTH * 60) / 100, 280)

export const MENU_HEIGHT = Math.floor(height * (9 / 16))
