/*
 * @Author: czy0729
 * @Date: 2022-06-06 05:37:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-06 05:38:45
 */
export const DATA_ME = [
  '我的空间',
  '我的好友',
  '我的人物',
  '我的目录',
  '我的日志',
  '我的netaba.re'
] as const

export const DATA_OTHER = ['TA的好友', 'TA的netaba.re'] as const

export const DEFAULT_PROPS = {
  navigation: {},
  themeStyles: {},
  parallaxImageHeight: 0,
  avatar: {},
  bg: '',
  fixed: false,
  id: '',
  myUserId: '',
  nickname: '',
  paramsUserId: '',
  scrollY: 0,
  src: '',
  textType: 'plain',
  userId: '',
  username: ''
} as const
