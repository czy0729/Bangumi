/*
 * @Author: czy0729
 * @Date: 2019-06-02 14:42:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-27 11:35:17
 */
export const INIT_DEV_DARK = '' // '' 不控制 | true 强制黑暗 | false 强制白天
export const INIT_ROUTE = 'Home'
export const RERENDER_SHOW = /ZZZ/
// export const RERENDER_SHOW = /Rakuen\.(.+?)\.Main/

// 是否开发模式
export const DEV = global.__DEV__
export const TEXT_ONLY = DEV

export default {
  initialRouteName: 'HomeTab', // HomeTab Discovery Subject Tinygrail
  initialRouteParams: {
    // subjectId: 23686 // anime: 296870, music: 302514, book: 267358, game: 137458
    // topicId: 'group/367355' // group/366561
    // userId: 456208 // 456208, 419012, 'lilyurey'
    // monoId: 'person/2481' // character/70323 person/5745
    // id: 240929
    // ids: [72649, 59610, 59611, 72648, 72650, 72651, 72652, 74522, 75203, 75207]
    // blogId: 307175 // 294448
    // catalogId: 35176
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
