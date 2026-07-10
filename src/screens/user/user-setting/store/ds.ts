/*
 * @Author: czy0729
 * @Date: 2024-09-08 13:35:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-10 06:06:22
 */
import { _ } from '@stores'
import { COMPONENT } from '../ds'

import type { Loaded } from '@types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE
}

export const STATE = {
  ...EXCLUDE_STATE,
  nickname: '',
  sign_input: '',
  avatar: '',
  bg: '',
  selectedIndex: 0,
  bgs: [],
  pixivs: [],
  avatars: [],

  /** 页面初始化完成 */
  _loaded: false as Loaded
}

export const REG_BG = /\[bg\](.+?)\[\/bg\]/

export const REG_AVATAR = /\[avatar\](.+?)\[\/avatar\]/

export const REG_FIXED =
  /(?:\[color=#444444\])?\[size=0\]\[avatar\]\[\/avatar\]\[\/size\](?:\[\/color\])?|(?:\[color=#444444\])?\[size=0\]\[bg\]\[\/bg\]\[\/size\](?:\[\/color\])?|\[avatar\]\[\/avatar\]|\[bg\]\[\/bg\]/g
