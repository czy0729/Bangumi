/*
 * @Author: czy0729
 * @Date: 2026-09-06 16:41:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-06 16:42:11
 *
 * 构建 / 平台相关配置 (通常不修改)
 */
import { Platform } from 'react-native'
import Constants from 'expo-constants'

/** 日志级别 (开发用): 2 所有, 1 只输出错误和警告, 0 不输出 */
export const LOG_LEVEL = 0

/** 强制主题模式 (开发用): '': 不控制 | true: 强制黑暗 | false: 强制白天 */
export const INIT_DEV_DARK = ''

/** BottomTabNavigator 初始路由 */
export const INIT_ROUTE = 'Home'

/** 是否带字体打包 */
export const FONT_FAMILY = true

/** 是否来源于 IPA (iOS) */
export const IOS_IPA = Platform.OS === 'ios' && Constants.appOwnership !== 'expo'

/** 是否来自 github action */
export const GITHUB_ACTION = false
