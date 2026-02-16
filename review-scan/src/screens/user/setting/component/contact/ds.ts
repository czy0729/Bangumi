/*
 * @Author: czy0729
 * @Date: 2022-07-18 14:09:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 20:57:19
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Contact')

export const TEXTS = {
  say: {
    hd: '反馈',
    information: '欢迎提BUG提需求'
  },
  qiafan: {
    search: '关于, 投食'
  },
  advance: {
    hd: '赞助者'
  },
  versions: {
    hd: '更新内容'
  },
  tips: {
    hd: '特色功能'
  }
} as const
