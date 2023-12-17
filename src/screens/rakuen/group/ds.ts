/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:40:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:41:29
 */
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenGroup'

export const STATE = {
  page: 1,
  show: true,
  ipt: '1',
  history: [],

  /** 云快照 */
  ota: {},
  _loaded: false as Loaded
}
