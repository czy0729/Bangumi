/*
 * @Author: czy0729
 * @Date: 2019-02-22 01:25:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-01 03:36:03
 */
import { Constants } from 'expo'

// dev
export const APP_ID = 'bgm8885c4d524cd61fc'
export const APP_SECRET = '1da52e7834bbb73cca90302f9ddbc8dd'

// oauth
export const OAUTH_URL = 'https://bgm.tv/oauth/authorize'
export const OAUTH_REDIRECT_URL = Constants.linkingUri

// 环境
export const ENV = {
  H5: process.env.TARO_ENV === 'h5',
  RN: process.env.TARO_ENV === 'rn',
  WEAPP: process.env.TARO_ENV === 'weapp'
}

export const IMG_DEFAULT = 'https://bangumi.tv/img/info_only.png'
