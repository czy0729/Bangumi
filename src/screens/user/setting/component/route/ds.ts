/*
 * @Author: czy0729
 * @Date: 2022-07-18 09:46:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 04:01:58
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Route')

const COMMON = {
  discovery: '发现',
  timeline: '时间胶囊',
  home: '进度',
  rakuen: '超展开',
  user: '时光机',
  tinygrail: '小圣杯'
} as const

export const TEXTS = {
  blocks: {
    setting: '功能块',
    ...COMMON
  },
  initialPage: {
    setting: '启动页',
    ...COMMON
  },
  bottomTabLazy: {
    hd: '底栏页面懒加载',
    information:
      '默认开启底栏懒加载以加快启动速度（点击对应页面才加载），关闭可加速页面切换但会增加启动时间。'
  }
} as const

export const ITEMS = {
  discovery: {
    label: 'Discovery',
    name: 'home',
    size: 18
  },
  timeline: {
    label: 'Timeline',
    name: 'md-access-time',
    size: 19
  },
  home: {
    label: 'Home',
    name: 'md-star-outline',
    size: 21
  },
  rakuen: {
    label: 'Rakuen',
    name: 'md-chat-bubble-outline',
    size: 17
  },
  user: {
    label: 'User',
    name: 'md-person-outline',
    size: 21
  },
  tinygrail: {
    label: 'Tinygrail',
    name: 'trophy',
    size: 16
  }
} as const
