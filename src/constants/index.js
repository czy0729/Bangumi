/*
 * 公共变量
 *
 * @Author: czy0729
 * @Date: 2019-02-22 01:25:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-19 16:35:01
 */
import { Platform, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

const expoPackageJson = require('@/node_modules/expo/package.json')
const appJson = require('@/app.json')

/* ==================== CUSTOM ==================== */
// 是否开发模式
export const DEV = global.__DEV__

// 日志级别 2 所有, 1 只输出错误和警告, 0 不输出
export const LOG_LEVEL = 0

/* ==================== BASE ==================== */

// [待废弃] 打包 apk 和 bangumi-ios-test 线上 expo 使用35, 打包 ipa 提审需至少使用37
export const SDK = parseInt(expoPackageJson.version.split('.')[0])

// Expo 线上预览唯一标识
export const BUNDLE_IDENTIFIER = appJson.name

// 版本号
export const VERSION_GITHUB_RELEASE = appJson.expo.version

// 小圣杯助手版本
export const VERSION_TINYGRAIL_PLUGIN =
  appJson.expo.description.split('tinygrail plugin ')[1]

// Google Play 版本
export const VERSION_GOOGLE = appJson.expo.description.includes('google play')

/* ==================== HOST ==================== */
// 域名
export const HOST_NAME = 'bgm.tv'
export const HOST = `https://${HOST_NAME}`

// 备用域名
export const HOST_2 = 'https://bangumi.tv'
export const HOST_3 = 'https://chii.in'

// 第三方域名
export const HOST_NING_MOE = 'https://www.ningmoe.com' // 柠萌瞬间地址
export const HOST_ANITAMA = 'https://app.anitama.net' // Anitama api地址
export const HOST_MANGA = 'https://tinygrail.mange.cn/app'
export const HOST_CDN = 'https://cdn.jsdelivr.net'

/* ==================== URL ==================== */
// 登陆v1.0 oauth地址
export const URL_OAUTH = `${HOST}/oauth/authorize`

// 登陆v1.0 授权跳转地址
export const URL_OAUTH_REDIRECT = `${HOST}/dev/app`

// bgm项目帖子地址
export const URL_FEEDBACK = `${HOST}/group/topic/350677`

// 空头像地址
export const URL_DEFAULT_AVATAR = '/icon.jpg'

/* ==================== APP ==================== */
// client_id
export const APP_ID = 'bgm8885c4d524cd61fc'

// client_secret
export const APP_SECRET = '1da52e7834bbb73cca90302f9ddbc8dd'

// 功能留言板入口 2020年: 19945783
export const APP_ID_SAY_DEVELOP = '23045125'

// 小圣杯意见反馈入口
export const APP_ID_SAY_TINYGRAIL = '19820034'

// 百度翻译
export const APP_ID_BAIDU = '20200130000378695'

// APP 游客
// [476179] 6907***59@qq.com | [474489] 2963***10@qq.com | [542389] say***02@163.com
export const APP_USERID_TOURIST = 474489 // 游客
export const APP_USERID_IOS_AUTH = 474489 // 审核

/* ==================== ENV ==================== */
// 是否 iOS
export const IOS = Platform.OS === 'ios'

// android 10之前
export const IS_BEFORE_ANDROID_10 = !IOS && Platform.Version < 29

// Bangumi 字眼在 App 内的显示
export const TITLE = IOS ? 'bgm.tv' : 'Bangumi'

/* ==================== TINYGRAIL ==================== */
// 小圣杯 client_id
export const TINYGRAIL_APP_ID = 'bgm2525b0e4c7d93fec'

// 小圣杯授权跳转地址
export const TINYGRAIL_URL_OAUTH_REDIRECT =
  'https://tinygrail.com/api/account/callback'

// 更新内容帖子
export const TINYGRAIL_UPDATES_LOGS_URL = `${HOST}/group/topic/354698`

/* ==================== GITHUB ==================== */
// repo
export const GITHUB_PROJECT = 'https://github.com/czy0729/Bangumi'

// gh-pages
export const GITHUB_PROJECT_GH = 'https://czy0729.github.io/Bangumi'

// release
export const GITHUB_RELEASE = `${GITHUB_PROJECT}/releases`

// release api
export const GITHUB_RELEASE_REPOS =
  'https://api.github.com/repos/czy0729/Bangumi/releases'

// ota url
export const GITHUB_DATA =
  'https://gitee.com/a296377710/bangumi/raw/master/data.json'

// 高级会员 url
export const GITHUB_ADVANCE =
  'https://gitee.com/a296377710/bangumi/raw/master/advance.json'

/* ==================== IMG ==================== */
// 占位底图
export const IMG_EMPTY = {
  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAAA1BMVEX///+nxBvIAAAAKklEQVR42u3BgQAAAADDoPtTH2AK1QAAAAAAAAAAAAAAAAAAAAAAAACAOE+wAAFrRnPdAAAAAElFTkSuQmCC'
}

// 占位底图黑
export const IMG_EMPTY_DARK = {
  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAAA1BMVEU+PkC+lq+tAAAAKklEQVR42u3BgQAAAADDoPtTH2AK1QAAAAAAAAAAAAAAAAAAAAAAAACAOE+wAAFrRnPdAAAAAElFTkSuQmCC'
}

export const IMG_DEFAULT_AVATAR = '//lain.bgm.tv/pic/user/s/icon.jpg' // 空头像
export const IMG_DEFAULT = require('@assets/images/default.png') // 默认图
export const IMG_ERROR = require('@assets/images/icon/pic-error-defult.png') // 图裂图

/* ==================== IMG SIZE ==================== */
const { width } = Dimensions.get('window')

export const PAD_LEVEL_1 = 616
export const PAD_LEVEL_2 = 900
export const PAD = width >= PAD_LEVEL_2 ? 2 : width >= PAD_LEVEL_1 ? 1 : 0
export const RATIO = PAD === 2 ? 1.64 : PAD === 1 ? 1.44 : 1

export const IMG_WIDTH = parseInt(RATIO * 82)
export const IMG_HEIGHT = parseInt(IMG_WIDTH * 1.4)
export const IMG_WIDTH_SM = parseInt(RATIO * 64)
export const IMG_HEIGHT_SM = parseInt(IMG_WIDTH_SM * 1.4)
export const IMG_AVATAR_WIDTH = 32

/* ==================== DATA ==================== */
// LIST 统一结构
export const LIST_EMPTY = {
  list: [],
  pagination: {
    page: 0,
    pageTotal: 0
  },
  _list: [], // 用于某些方法制造分页效果
  _loaded: false
}

// 用于制造分页数据
export const LIMIT_LIST = 100

// 用于制造分页数据 (评论)
export const LIMIT_LIST_COMMENTS = 50

// 对评论数多的帖子进行网页跳转
export const LIMIT_TOPIC_PUSH = 500

// 部分首屏渲染任务非常重的页面设置的初始最大项显示值
export const LIMIT_HEAVY_RENDER = 10

// EVENT 统一结构
export const EVENT = {
  id: '',
  data: {}
}

// 时间数组
export const DATA_AIRTIME = [
  '全部',
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
  '1980'
]

// 月份
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

// 索引时间年
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

// 索引时间月
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

// 字母表
export const DATA_ALPHABET = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
]

// decimal
export const B = 100000000
export const M = 10000

// source
export const SITES = ['bilibili', 'qq', 'iqiyi', 'acfun', 'youku']
export const SITES_DS = [
  'acfun',
  'bilibili',
  'sohu',
  'youku',
  'qq',
  'iqiyi',
  'letv',
  'pptv',
  'mgtv',
  'nicovideo',
  'netflix'
]

export const COLLECTION_INDENT = PAD ? '　　    ' : '　　   '

export const contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}
