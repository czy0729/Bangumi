/*
 * @Author: czy0729
 * @Date: 2022-07-18 14:23:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:45:13
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Zhinan')

export const TEXTS = {
  topic: {
    hd: '项目帖子'
  },
  github: {
    hd: 'Github',
    information: '欢迎⭐️'
  },
  zhinan: {
    hd: '使用指南'
  },
  notion: {
    hd: '开发状况'
  },
  jihua: {
    hd: '开发计划问卷'
  },
  privacy: {
    hd: '隐私保护政策'
  }
} as const
