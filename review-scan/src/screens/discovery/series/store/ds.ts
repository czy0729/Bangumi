/*
 * @Author: czy0729
 * @Date: 2024-11-30 17:32:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 19:53:28
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,
  fetching: false,
  message: '',
  current: 0,
  total: 0
}

export const STATE = {
  ...EXCLUDE_STATE,
  collections: [],
  otherCollections: [],
  relations: {},
  subjects: {},
  data: [],
  sort: '',
  filter: '',
  airtime: '',
  status: '',
  fixed: true,
  _loaded: false as Loaded
}
