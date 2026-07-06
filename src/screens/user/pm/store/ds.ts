/*
 * @Author: czy0729
 * @Date: 2023-12-17 11:25:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-06 02:12:21
 */
import type { Loaded } from '@types'

export const STATE = {
  title: '',
  value: '',
  placeholder: '',
  replySub: '',
  message: '',

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
