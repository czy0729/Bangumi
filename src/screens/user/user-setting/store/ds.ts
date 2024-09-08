/*
 * @Author: czy0729
 * @Date: 2024-09-08 13:35:36
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-09-08 13:35:36
 */
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  nickname: '',
  sign_input: '',
  avatar: '',
  bg: '',
  selectedIndex: 0,
  bgs: [],
  pixivs: [],
  avatars: [],
  _loaded: false as Loaded
}
