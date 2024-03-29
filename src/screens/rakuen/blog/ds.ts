/*
 * @Author: czy0729
 * @Date: 2023-12-17 06:54:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:39:56
 */
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenBlog'

export const EXCLUDE_STATE = {
  /** 回复框 placeholder */
  placeholder: '',

  /** 回复框 value */
  value: '',

  /** 存放 bgm 特有的子回复配置字符串 */
  replySub: '',

  /** 存放子回复 html */
  message: '',

  /** 云快照 */
  ota: {},
  showHeaderTitle: false
}

export const STATE = {
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
