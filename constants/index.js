/*
 * 公共变量
 * @Author: czy0729
 * @Date: 2019-02-22 01:25:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 22:37:43
 */
import { Platform } from 'react-native'

/* ==================== DEV ==================== */
export const DEV = false // 是否开发模式
export const BARE = true // 裸工作流
export const VERSION_GITHUB_RELEASE = '3.4.0' // 版本号
export const VERSION_TINYGRAIL_PLUGIN = '2.3.1'
export const VERSION_CODE_PUSH = '' // 热推送副版本号
export const ERRORS = {
  keys: [],
  errors: []
}

/* ==================== BASE ==================== */
// HOST
export const HOST_NAME = 'bgm.tv' // 域名
export const HOST = `https://${HOST_NAME}`
export const HOST_2 = 'https://bangumi.tv' // 备用域名
export const HOST_3 = 'https://chii.in'
export const HOST_NING_MOE = 'https://www.ningmoe.com' // 柠萌瞬间地址
export const HOST_ANITAMA = 'https://app.anitama.net' // Anitama api地址

// URL
export const URL_OAUTH = `${HOST}/oauth/authorize` // 登陆v1.0 oauth地址
export const URL_OAUTH_REDIRECT = `${HOST}/dev/app` // 登陆v1.0 授权跳转地址
export const URL_FEEDBACK = `${HOST}/group/topic/350677` // bgm项目帖子地址

// APP
export const APP_ID = 'bgm8885c4d524cd61fc' // client_id
export const APP_SECRET = '1da52e7834bbb73cca90302f9ddbc8dd' // client_secret
export const APP_ID_SAY_DEVELOP = '19945783' // 功能留言板入口
export const APP_ID_SAY_TINYGRAIL = '19820034' // 小圣杯意见反馈入口
export const APP_ID_BAIDU = '20200130000378695' // 百度翻译
export const APP_USERID_TOURIST = 476179 // 6907xxx59@qq.com (游客)
export const APP_USERID_IOS_AUTH = 474489 // 2963xxx10@qq.com (iOS审核)

// ENV
export const IOS = Platform.OS === 'ios' // 是否iOS

// TINYGRAIL
export const TINYGRAIL_APP_ID = 'bgm2525b0e4c7d93fec' // 小圣杯client_id
export const TINYGRAIL_URL_OAUTH_REDIRECT =
  'https://tinygrail.com/api/account/callback' // 小圣杯授权跳转地址
export const TINYGRAIL_UPDATES_LOGS_URL = `${HOST}/group/topic/354698` // 更新内容帖子

// GITHUB
export const GITHUB_PROJECT = 'https://github.com/czy0729/Bangumi' // github项目地址
export const GITHUB_PROJECT_GH = 'https://czy0729.github.io/Bangumi' // gh-pages
export const GITHUB_RELEASE = `${GITHUB_PROJECT}/releases` // 版本析出地址
export const GITHUB_RELEASE_REPOS =
  'https://api.github.com/repos/czy0729/Bangumi/releases' // 版本析出api地址
export const GITHUB_DATA = `${GITHUB_PROJECT_GH}/web/data.json` // online数

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
export const LIMIT_LIST = 40 // 用于制造分页数据
export const LIMIT_LIST_COMMENTS = 25 // 用于制造分页数据 (评论)
export const LIMIT_TOPIC_PUSH = 400 // 对评论大于400的帖子进行网页跳转

// EVENT
export const EVENT = {
  id: '',
  data: {}
}

// 时间数组
export const DATA_AIRTIME = [
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
export const DATA_MONTH = [
  '全部',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12'
]

// decimal
export const B = 100000000
export const M = 10000
