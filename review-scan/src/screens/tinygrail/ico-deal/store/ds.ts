/*
 * @Author: czy0729
 * @Date: 2023-12-17 04:52:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-31 00:55:10
 */
import { Loaded } from '@types'

export const EXCLUDE_STATE = {
  step: 0
}

export const STATE = {
  ...EXCLUDE_STATE,
  loading: false,

  /** 只能是整数 */
  amount: 5000,

  /** 页面初始化完成 */
  _loaded: 0 as Loaded
}
