/*
 * @Author: czy0729
 * @Date: 2021-11-30 02:04:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-26 04:35:29
 */
import { INIT_USERS } from '@stores/users/init'

export const NAMESPACE = 'ScreenZone'

export const EXCLUDE_STATE = {
  visible: false,
  timeout: false,
  originUid: false,

  /** 头部是否置顶 */
  fixed: false,

  /** 云端快照 */
  users: {
    ...INIT_USERS,
    _loaded: false
  }
}

export const STATE = {
  expand: {
    在看: true,
    看过: false,
    想看: false,
    搁置: false,
    抛弃: false
  },
  page: 0,
  recent: {},
  ...EXCLUDE_STATE,
  _loaded: false
}

export const TABS = [
  {
    title: '番剧',
    key: 'bangumi'
  },
  {
    title: '统计',
    key: 'stats'
  },
  {
    title: '时间线',
    key: 'timeline'
  },
  {
    title: '超展开',
    key: 'rakuen'
  },
  {
    title: '关于TA',
    key: 'about'
  }
] as const

export const TABS_WITH_TINYGRAIL = [
  ...TABS,
  {
    title: '小圣杯',
    key: 'tinygrail'
  }
] as const
