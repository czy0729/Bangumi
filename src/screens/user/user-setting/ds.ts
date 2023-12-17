/*
 * @Author: czy0729
 * @Date: 2023-12-17 11:33:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 11:37:27
 */
import { GITHUB_HOST } from '@constants'
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenUserSetting'

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

export const ONLINE_BGS_URL = `${GITHUB_HOST}/raw/master/bg.json`

export const REG_BG = /\[bg\](.+?)\[\/bg\]/

export const REG_AVATAR = /\[avatar\](.+?)\[\/avatar\]/

export const REG_FIXED =
  /\[size=0\]\[avatar\]\[\/avatar\]\[\/size\]|\[size=0\]\[bg\]\[\/bg\]\[\/size\]/g
