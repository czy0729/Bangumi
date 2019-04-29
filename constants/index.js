/*
 * 公共变量
 * @Author: czy0729
 * @Date: 2019-02-22 01:25:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-29 14:30:22
 */
import { Platform } from 'react-native'

export const IOS = Platform.OS === 'ios'

// APP
export const APP_ID = 'bgm8885c4d524cd61fc'
export const APP_SECRET = '1da52e7834bbb73cca90302f9ddbc8dd'

// URL
export const HOST = 'https://bangumi.tv'
export const OAUTH_URL = `${HOST}/oauth/authorize`
export const OAUTH_REDIRECT_URL = HOST
// export const OAUTH_REDIRECT_URL = Constants.linkingUri

// 图片
// 白
export const IMG_EMPTY = {
  uri:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP4////GQAJyAPKSOz6nwAAAABJRU5ErkJggg=='
}
// 灰
// export const IMG_EMPTY = {
//   uri:
//     'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP48ePHfwAJvAPoaIODcwAAAABJRU5ErkJggg=='
// }

export const IMG_DEFAULT = require('@assets/images/default.png')

// 全局统一列表数据结构
export const LIST_EMPTY = {
  list: [],
  pagination: {
    page: 0,
    pageTotal: 0
  },
  _loaded: false
}
