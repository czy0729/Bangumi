/*
 * 公共变量
 *
 * @Author: czy0729
 * @Date: 2019-02-22 01:25:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-30 20:48:04
 */
import { Platform } from 'react-native'

const appJson = require('@/app.json')

/* ==================== DEV ==================== */
export const SDK = parseInt(appJson.expo.sdkVersion.split(',')[0]) // 打包apk和bangumi-ios-test线上expo使用35, 打包ipa提审需至少使用37
export const BUNDLE_IDENTIFIER = appJson.name
export const DEV = false // 是否开发模式
export const BARE = true // 裸工作流
export const VERSION_GITHUB_RELEASE = '3.7.1' // 版本号
export const VERSION_TINYGRAIL_PLUGIN = '2.4.1'

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
export const URL_DEFAULT_AVATAR = '/icon.jpg'

// APP
export const APP_ID = 'bgm8885c4d524cd61fc' // client_id
export const APP_SECRET = '1da52e7834bbb73cca90302f9ddbc8dd' // client_secret
export const APP_ID_SAY_DEVELOP = '19945783' // 功能留言板入口
export const APP_ID_SAY_TINYGRAIL = '19820034' // 小圣杯意见反馈入口
export const APP_ID_BAIDU = '20200130000378695' // 百度翻译
// export const APP_USERID_TOURIST = 476179 // 6907***59@qq.com (安卓游客)
// export const APP_USERID_IOS_AUTH = 474489 // 2963***10@qq.com (iOS审核)
export const APP_USERID_TOURIST = 542389 // say***02@163.com (iOS游客)
export const APP_USERID_IOS_AUTH = 542389 // say***02@163.com (iOS审核)

// ENV
export const IOS = Platform.OS === 'ios' // 是否iOS
export const TITLE = IOS ? 'bgm.tv' : 'Bangumi' // Bangumi字眼在App内的显示

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
export const IMG_EMPTY = {
  uri:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAAA1BMVEX///+nxBvIAAAAKklEQVR42u3BgQAAAADDoPtTH2AK1QAAAAAAAAAAAAAAAAAAAAAAAACAOE+wAAFrRnPdAAAAAElFTkSuQmCC'
}
export const IMG_EMPTY_DARK = {
  uri:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAAA1BMVEU+PkC+lq+tAAAAKklEQVR42u3BgQAAAADDoPtTH2AK1QAAAAAAAAAAAAAAAAAAAAAAAACAOE+wAAFrRnPdAAAAAElFTkSuQmCC'
}
export const IMG_DEFAULT_AVATAR = '//lain.bgm.tv/pic/user/s/icon.jpg' // 空头像
export const IMG_DEFAULT = require('@assets/images/default.png') // 默认图
export const IMG_ERROR = require('@assets/images/icon/pic-error-defult.png') // 图裂图

export const IMG_WIDTH = 88
export const IMG_HEIGHT = IMG_WIDTH * 1.28
export const IMG_WIDTH_SM = 64
export const IMG_HEIGHT_SM = IMG_WIDTH_SM * 1.28
export const IMG_AVATAR_WIDTH = 32

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
export const LIMIT_LIST = 100 // 用于制造分页数据
export const LIMIT_LIST_COMMENTS = 50 // 用于制造分页数据 (评论)
export const LIMIT_TOPIC_PUSH = 500 // 对评论数多的帖子进行网页跳转

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

// 索引时间数组
export const DATA_BROWSER_AIRTIME = [
  '2024',
  '2023',
  '2022',
  '2021',
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
  '1980',
  '1979',
  '1978',
  '1977',
  '1976',
  '1975',
  '1974',
  '1973',
  '1972',
  '1971',
  '1970',
  '1969',
  '1968',
  '1967',
  '1966',
  '1965',
  '1964',
  '1963',
  '1962',
  '1961',
  '1960',
  '1959',
  '1958',
  '1957',
  '1956',
  '1955',
  '1954',
  '1953',
  '1952',
  '1951',
  '1950',
  '1949'
]
export const DATA_BROWSER_MONTH = [
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
