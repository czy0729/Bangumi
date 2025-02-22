/*
 * @Author: czy0729
 * @Date: 2025-02-19 07:03:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-20 05:51:03
 */
import { Loaded, UserId } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  show: false,
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
  data2: {} as Record<
    string | number,
    {
      list: []
      _loaded: false
    }
  >,
  detail: ''
}

export const STATE = {
  url: '',
  url2: '',
  navigate: '',
  referer: '',
  event: '',
  authorization: '',
  usersPrefixed: '',
  infosPrefixed: '',
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
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
