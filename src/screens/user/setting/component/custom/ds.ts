/*
 * @Author: czy0729
 * @Date: 2022-07-18 07:17:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 22:00:00
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Custom')

export const TEXTS = {
  custom: {
    hd: '内容过滤',
    // information: '隐藏评分、屏蔽类开关'
  },
  hideScore: {
    hd: '隐藏评分'
  },
  filterDefault: {
    hd: '屏蔽无头像用户相关信息',
    information: '请注意，若你注册至今从未在网页端更改过头像，启动后可能会把自己的信息都屏蔽掉'
  },
  filter18x: {
    hd: '屏蔽敏感内容',
    information: `条目、时间胶囊、排行榜等，因站规对于 NSFW 不返回数据，建议刚注册的用户开启。\nPS：此选项仅影响到客户端的展示，若需要完全开启请使用网页端登录后，到设置打开开关。`
  }
} as const
