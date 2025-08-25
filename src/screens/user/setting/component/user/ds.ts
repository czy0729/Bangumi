/*
 * @Author: czy0729
 * @Date: 2022-07-18 12:53:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-26 01:09:55
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
      '默认关闭容器划到底部加载；开启后使用分页器进行导航，在你需要准确定位时或者有大量收藏情况下会更有用'
  }
} as const
