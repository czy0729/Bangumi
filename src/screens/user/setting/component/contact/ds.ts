/*
 * @Author: czy0729
 * @Date: 2022-07-18 14:09:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 15:40:42
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
    hd: '支持者'
  },
  versions: {
    hd: '更新内容'
  }
} as const
