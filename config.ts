/*
 * 开发调试时用配置
 * @Author: czy0729
 * @Date: 2019-06-02 14:42:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-06 22:06:37
 */
/** 日志级别 (开发用): 2 所有, 1 只输出错误和警告, 0 不输出 */
export const LOG_LEVEL = 0

/** 强制主题模式 (开发用): '' => 不控制 | true => 强制黑暗 | false => 强制白天 */
export const INIT_DEV_DARK = ''

/** BottomTabNavigator 初始路由 */
export const INIT_ROUTE = 'Home'

/** 观察组件 re-render 用 (开发用) */
export const RERENDER_SHOW = /ZZZ/ // /Rakuen\.(.+?)\.Main/

/** 是否开发模式 */
// @ts-ignore
export const DEV = global.__DEV__

/** 是否带字体打包 */
export const FONT_FAMILY = true

/** 是否不显示图片 (开发用) */
export const TEXT_ONLY = DEV ? !DEV : false // : false 是为了打包后的 apk 稳定显示图片

/** 路由覆盖配置 */
export default {
  initialRouteName: 'HomeTab', // HomeTab Discovery Subject Tinygrail BilibiliSync
  initialRouteParams: {
    // subjectId: 371546 // anime: 296870, music: 302514, book: 267358, game: 137458
    // topicId: 'group/372695' // group/366561
    // userId: 456208 // 456208, 419012, 'lilyurey'
    // monoId: 'character/106821' // character/70323 person/5745
    // id: 240929
    // ids: [72649, 59610, 59611, 72648, 72650, 72651, 72652, 74522, 75203, 75207]
    // blogId: 307175 // 294448
    // catalogId: 39516
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
