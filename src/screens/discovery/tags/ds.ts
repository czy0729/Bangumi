/*
 * @Author: czy0729
 * @Date: 2022-09-03 12:36:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:08:42
 */
import { SUBJECT_TYPE } from '@constants'
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenTags'

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
