/*
 * @Author: czy0729
 * @Date: 2023-12-17 06:52:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:40:25
 */
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenBoard'

export const STATE = {
  history: [],

  /** 云快照 */
  ota: {},
  _loaded: false as Loaded
}
