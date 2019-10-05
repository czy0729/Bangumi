/*
 * 公共变量
 * @Author: czy0729
 * @Date: 2019-02-22 01:25:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-06 01:14:39
 */
import { Platform } from 'react-native'
import Constants from 'expo-constants'

export const IOS = Platform.OS === 'ios' // 是否iOS
export const MI = Constants.deviceName.includes('MI') // 是否MIUI (假如不是小米手机刷了MIUI会检测不到)

// APP
export const APP_ID = 'bgm8885c4d524cd61fc' // client_id
export const APP_SECRET = '1da52e7834bbb73cca90302f9ddbc8dd' // client_secret

// TINYGRAIL
export const TINYGRAIL_APP_ID = 'bgm2525b0e4c7d93fec' // 小圣杯 client_id
export const TINYGRAIL_OAUTH_REDIRECT_URL = 'https://tinygrail.com/cb' // 小圣杯 授权跳转地址
export const USERID_TOURIST = 476179 // 游客id
export const USERID_IOS_AUTH = 474489

// URL
export const HOST_NAME = 'bgm.tv' // 域名
export const HOST = `https://${HOST_NAME}`
export const HOST_WITHOUT_HTTPS = `http://${HOST_NAME}`
export const HOST_2 = 'https://bangumi.tv' // 备用域名
export const OAUTH_URL = `${HOST}/oauth/authorize` // 登陆v1.0 oauth地址
export const OAUTH_REDIRECT_URL = `${HOST}/dev/app` // 登陆v1.0 授权跳转地址
export const NING_MOE_HOST = 'https://www.ningmoe.com' // 柠萌瞬间地址
export const ANITAMA_HOST = 'https://app.anitama.net/' // Anitama api地址

// GITHUB
export const FEEDBACK_URL = `${HOST}/group/topic/350677` // 反馈地址
export const GITHUB_URL = 'https://github.com/czy0729/Bangumi' // github地址
export const GITHUB_RELEASE_URL = `${GITHUB_URL}/releases` // 版本析出地址
export const GITHUB_RELEASE_REPOS_URL =
  'https://api.github.com/repos/czy0729/Bangumi/releases' // 版本析出api地址
export const GITHUB_RELEASE_VERSION = '1.3.1' // 版本号
export const CODE_PUSH_VERSION = '10/06' // 热推送副版本号
export const DEV = false // 是否开发模式

// 图片
export const IMG_DEFAULT_AVATAR = '//lain.bgm.tv/pic/user/s/icon.jpg' // 空头像
export const IMG_EMPTY = {
  uri:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP4////GQAJyAPKSOz6nwAAAABJRU5ErkJggg=='
} // 白底1*1图片

export const IMG_DEFAULT = require('@assets/images/default.png') // 默认图
export const IMG_ERROR = require('@assets/images/icon/pic-error-defult.png') // 图裂图

// 全局统一列表数据结构
export const LIST_EMPTY = {
  list: [],
  pagination: {
    page: 0,
    pageTotal: 0
  },
  _list: [], // 用于某些方法制造分页效果
  _loaded: false
}

// LIMIT
export const LIST_LIMIT = 40 // 用于制造分页数据
export const LIST_COMMENTS_LIMIT = 25
export const TOPIC_PUSH_LIMIT = 300 // 对评论大于300的帖子进行网页跳转

// 时间数组
export const airtimeData = [
  '全部',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
  '2009',
  '2008',
  '2007',
  '2006',
  '2005',
  '2004',
  '2003',
  '2002',
  '2001',
  '2000',
  '1999',
  '1998',
  '1997',
  '1996',
  '1995',
  '1994',
  '1993',
  '1992',
  '1991',
  '1990',
  '1989',
  '1988',
  '1987',
  '1986',
  '1985',
  '1984',
  '1983',
  '1982',
  '1981',
  '1980'
]
