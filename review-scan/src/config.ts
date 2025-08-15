/*
 * @Author: czy0729
 * @Date: 2019-06-02 14:42:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-18 00:00:52
 */
import { Platform } from 'react-native'
import Constants from 'expo-constants'
import { Paths } from '@types'

/** ==================== 开发调试时用配置 ==================== */
/** @ts-ignore 是否开发模式 */
export const DEV = global.__DEV__ || window?.CONFIG_TYPE === 'DEVELOPMENT'
// export const DEV = global.__DEV__

/** ==================== 常用配置 ==================== */
/** 观察组件 */
const rerenderShow = 'ZZZ.'
const rerenderNotShow = []

/** 观察组件 rerender 用 (开发用) */
export const RERENDER_SHOW = new RegExp(rerenderShow.replace(/\./g, '\\.')) // /Rakuen\.(.+?)\.Main/

/** 屏蔽观察组件 rerender 用 (开发用) */
export const RERENDER_NOT_SHOW = rerenderNotShow

/** 打印组件 rerender 值变化 (开发用) */
export const RERENDER_SHOW_DIFF = false

/** 显示调试菜单按钮 (安卓、开发用) */
export const ANDROID_DEV_MENU = true

/** 是否不显示图片 (开发用) false 是为了打包后的 apk 稳定显示图片 */
export const TEXT_ONLY = DEV ? !DEV : false

/** 反代地址 */
export const HOST_PROXY = 'https://bangumi-app-webproxy-dev.magmablock.top'
// export const HOST_PROXY = 'http://192.168.31.87:3000'

/** ==================== 默认路由 ==================== */
/** 路由覆盖配置 */
const CONFIGS: Configs = {
  initialRouteName: DEV ? 'HomeTab' : 'HomeTab',
  initialRouteParams: {
    // subjectId: 422153 // anime: 296870, music: 302514, book: 267358, game: 283730
    // topicId: 'group/429213' // group/366561
    // userId: 'magma' // 456208, 419012, 'lilyurey'
    // monoId: 'character/52876' // character/70323 person/5745
    // id: 37896791
    // ids: [72649, 59610, 59611, 72648, 72650, 72651, 72652, 74522, 75203, 75207]
    // blogId: 307175 // 294448
    // catalogId: 52349
    // groupId: 'fillgrids' // fillgrids
    // jp: 'ようこそ実力至上主義の教室へ',
    // cn: '无职转生 ～在异世界认真地活下去～'
    // userName: 'sukaretto'
    // from: 'tinygrail',
    // form: 'lottery', // lottery
    // message: '彩票刮刮乐共获得： #20391「双叶杏」64股 #70900「神原骏河」36股',
    // name: '成神之日'
    // tag: '水树奈奈'
    // type: 'anime' // 'anime'
    // uri: 'https://bgm.tv/award/2019',
  }
}

export default CONFIGS

type Configs = {
  initialRouteName: Paths | 'HomeTab'
  initialRouteParams: any
}

/** ==================== 下方配置通常不修改 ==================== */
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

/** 图片是否开启新本地缓存策略 (iOS) */
export const IOS_IMAGE_CACHE_V2 = IOS_IPA

/** 是否来自 github action */
export const GITHUB_ACTION = false
