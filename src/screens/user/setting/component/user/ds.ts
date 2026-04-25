/*
 * @Author: czy0729
 * @Date: 2022-07-18 12:53:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-25 22:17:48
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'User')

export const TEXTS = {
  user: {
    hd: '时光机'
  },
  userGridNum: {
    hd: '网格布局个数'
  },
  userPagination: {
    hd: '列表分页',
    information:
      '默认关闭，容器划到底部加载；开启后使用分页器进行导航，在你需要准确定位时或者有大量收藏情况下会更有用'
  },
  userShowManage: {
    hd: '显示收藏管理',
    information:
      '默认关闭，查看别人的时光机条目收藏右方显示管理按钮；开启后在自己的时光机也显示管理按钮'
  },
  userCommentsFull: {
    hd: '评论占满布局',
    information: '关闭就是旧客户端布局'
  },
  userCommentsLines: {
    hd: '评论默认展示行数',
    information: '8 行大概是显示最大字数评论的一半'
  }
} as const
