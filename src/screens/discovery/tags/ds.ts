/*
 * @Author: czy0729
 * @Date: 2022-09-03 12:36:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-04 11:04:22
 */
import { SUBJECT_TYPE } from '@constants'
import { Loaded } from '@types'

export const COMPONENT = 'Tags'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const TABS = SUBJECT_TYPE.map(item => ({
  title: item.title,
  key: item.label
}))

export const EXCLUDE_STATE = {
  ipt: '',
  filter: '',
  isFocused: true,

  /** 云快照 */
  ota: {}
}

export const STATE = {
  page: 0,
  rec: false,
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
