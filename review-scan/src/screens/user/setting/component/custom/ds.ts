/*
 * @Author: czy0729
 * @Date: 2022-07-18 07:17:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-10 05:19:07
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Custom')

export const TEXTS = {
  cnFirst: {
    title: '优先中文',
    information: '客户端会智能匹配本地历史番剧数据，尽可能使用中文条目名称'
  },
  heatMap: {
    title: '章节讨论热力图',
    information: '按钮下方不同透明度橙色条块，可快速了解讨论的激烈程度'
  },
  openInfo: {
    hd: '打开外部浏览器前复制网址',
    information: '开启会先停顿 300ms 再进行跳转'
  },
  s2t: {
    hd: '繁体',
    information: '已于 24 年 4 月使用 OpenCC 替换原来的暴力转换'
  },
  userAge: {
    title: '用户站龄',
    information: '在相关吐槽页面，用户信息后方显示注册年龄（推算）'
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
    information:
      '条目、小组、时间胶囊、排行榜等，因站规对于 NSFW 不返回数据，建议注册少于 3 个月的用户开启'
  }
} as const
