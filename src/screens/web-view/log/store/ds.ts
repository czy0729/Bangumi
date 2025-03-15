/*
 * @Author: czy0729
 * @Date: 2025-02-19 07:03:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-23 14:57:24
 */
import { Loaded, UserId } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  show: false,
  data2: {},
  detail: ''
}

export const STATE = {
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

  /** 错误日均统计次数 */
  stats: {} as Record<
    string | number,
    {
      a: number[]
      _loaded: Loaded
    }
  >,

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

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
