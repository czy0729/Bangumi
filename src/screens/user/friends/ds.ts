/*
 * @Author: czy0729
 * @Date: 2022-08-07 03:57:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-07 03:59:47
 */
export const NAMESPACE = 'ScreenFriends'

export const EXCLUDE_STATE = {
  filter: ''
}

export const STATE = {
  sort: '',

  ...EXCLUDE_STATE,
  _loaded: false
}
