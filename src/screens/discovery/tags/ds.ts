/*
 * @Author: czy0729
 * @Date: 2022-09-03 12:36:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 13:03:16
 */
import { SUBJECT_TYPE } from '@constants'

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
  ...EXCLUDE_STATE,
  _loaded: false
}
