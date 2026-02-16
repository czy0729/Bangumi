/*
 * @Author: czy0729
 * @Date: 2025-02-19 07:03:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 04:26:44
 */
import { Loaded, UserId } from '@types'
import { COMPONENT } from '../ds'
import { Stats } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  show: false,
  showStats: false,
  data2: {},
  detail: ''
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 错误上报地址 */
  url: '',
  url2: '',

  /** 错误详细信息具体定位地址 */
  navigate: '',

  /** 错误上报客户端版本号 */
  referer: '',

  /** 错误上报客户端事件号 */
  event: '',

  /** 授权 */
  authorization: '',
  usersPrefixed: '',
  infosPrefixed: '',

  /** 错误报告列表 */
  data: {
    list: [] as {
      i: string
      o: string
      u: string
      r: string
      d: string
    }[],
    _loaded: false as Loaded
  },

  /** 绘图坐标 */
  series: {
    a: [],
    _loaded: false
  } as Stats,

  /** 错误日均统计次数 */
  stats: {} as Record<string | number, Stats>,

  users: {} as Record<
    UserId,
    {
      a?: string
      n?: string
      _loaded: Loaded
    }
  >,

  infos: {} as Record<
    UserId,
    {
      v?: string
      a?: boolean
      n?: number
      i?: boolean
      b?: string
      _loaded: Loaded
    }
  >,

  distance: '120000',
  unitDay: '29',
  showName: false,
  showTour: false,
  showDefault: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
