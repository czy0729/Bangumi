/*
 * @Author: czy0729
 * @Date: 2022-07-18 09:46:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:37:41
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Route')

export const TEXTS = {
  blocks: {
    setting: '功能块',
    discovery: '发现',
    timeline: '时间胶囊',
    home: '进度',
    rakuen: '超展开',
    user: '时光机'
  },
  initialPage: {
    setting: '启动页',
    discovery: '发现',
    timeline: '时间胶囊',
    home: '进度',
    rakuen: '超展开',
    user: '时光机',
    tinygrail: '小圣杯'
  }
} as const
