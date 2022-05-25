/*
 * 公共变量
 *
 * @Author: czy0729
 * @Date: 2019-02-22 01:25:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-25 18:12:55
 */
import { Platform } from 'react-native'
import PropTypes from 'prop-types'
import { DEV, LOG_LEVEL, TEXT_ONLY } from '../../config'
import { PAD, PAD_LEVEL_1, PAD_LEVEL_2, RATIO } from './device/index'

export { DEV, LOG_LEVEL, TEXT_ONLY, PAD, PAD_LEVEL_1, PAD_LEVEL_2, RATIO }

/* ==================== CONSTANTS ==================== */
/** 方向垂直 */
export const ORIENTATION_PORTRAIT = 'PORTRAIT'

/** 方向水平 */
export const ORIENTATION_LANDSCAPE = 'LANDSCAPE'

/* ==================== BASE ==================== */
const expoPackageJson = require('@/node_modules/expo/package.json')
const appJson = require('@/app.json')

/** @deprecated [已废弃] 打包 apk 和 bangumi-ios-test 线上 expo 使用35, 打包 ipa 提审需至少使用37 */
export const SDK = parseInt(expoPackageJson.version.split('.')[0])

/** Expo 线上预览唯一标识 */
export const BUNDLE_IDENTIFIER = appJson.name

/** 版本号 */
export const VERSION_GITHUB_RELEASE = appJson.expo.version

/** 小圣杯助手版本 */
export const VERSION_TINYGRAIL_PLUGIN =
  appJson.expo.description.split('tinygrail plugin ')[1]

/** Google Play 版本 */
export const VERSION_GOOGLE = appJson.expo.description.includes('google play')

/* ==================== HOST ==================== */
/** 域 */
export const HOST_NAME = 'bgm.tv'

/** 域名 */
export const HOST = `https://${HOST_NAME}`

/** 备用域名2 */
export const HOST_2 = 'https://bangumi.tv'

/** 备用域名3 */
export const HOST_3 = 'https://chii.in'

/** @deprecated [已废弃] 柠萌瞬间地址 */
export const HOST_NING_MOE = 'https://www.ningmoe.com'

/** @deprecated [已废弃] Anitama api地址 */
export const HOST_ANITAMA = 'https://app.anitama.net'

/** @deprecated [已废弃] 动漫之家 */
export const HOST_DMZJ = 'https://m.news.dmzj.com'

/** @deprecated [已废弃] HD漫画 */
export const HOST_MANGA = 'https://tinygrail.mange.cn/app'

/** [待废弃] jsdelivr */
export const HOST_CDN = 'https://cdn.jsdelivr.net'

/** 免费图床 */
export const HOST_IMAGE_UPLOAD = 'https://www.hualigs.cn'

/* ==================== URL ==================== */
/** [待废弃] 登录 v1.0 oauth 地址 */
export const URL_OAUTH = `${HOST}/oauth/authorize`

/** [待废弃] 登录 v1.0 授权跳转地址 */
export const URL_OAUTH_REDIRECT = `${HOST}/dev/app`

/** bgm项目帖子地址 */
export const URL_FEEDBACK = `${HOST}/group/topic/350677`

/** 空头像地址 */
export const URL_DEFAULT_AVATAR = '/icon.jpg'

/** 指南 */
export const URL_ZHINAN = 'https://www.yuque.com/chenzhenyu-k0epm/znygb4'

/** 隐私条款 */
export const URL_PRIVACY = 'https://www.yuque.com/chenzhenyu-k0epm/znygb4/oi3ss2'

/* ==================== APP ==================== */
/** App ID https://bgm.tv/dev/app */
export const APP_ID = 'bgm8885c4d524cd61fc'

/** App Secret */
export const APP_SECRET = '1da52e7834bbb73cca90302f9ddbc8dd'

/** 功能留言板入口 2020年: 19945783, 2021年: 23045125,25475042 2022年: 27168016 */
export const APP_ID_SAY_DEVELOP = '27168016'

/** 小圣杯意见反馈入口 */
export const APP_ID_SAY_TINYGRAIL = '19820034'

/** 百度翻译 App ID */
export const APP_BAIDU_ID = '20200130000378695'

/** 百度翻译 App Key */
export const APP_BAIDU_KEY = 'U92zpHIA8SkYXHrEaZ9O'

/** APP 游客用户id [476179] 6907***59@qq.com | [474489] 2963***10@qq.com | [542389] say***02@163.com */
export const APP_USERID_TOURIST = 474489

/** APP 审核用户id */
export const APP_USERID_IOS_AUTH = 474489

/* ==================== ENV ==================== */
/** 是否 iOS */
export const IOS = Platform.OS === 'ios'

/** 约定 User-Agent https://bangumi.github.io/api */
export const UA = `czy0729/Bangumi/${VERSION_GITHUB_RELEASE} (${
  IOS ? 'iOS' : 'Android'
})`

/** 是否安卓10之前 */
export const IS_BEFORE_ANDROID_10 = !IOS && Platform.Version < 29

/** [待废弃] Bangumi 字眼在 App 内的显示 */
export const TITLE = IOS ? 'bgm.tv' : 'Bangumi'

/** 小圣杯 App ID */
export const TINYGRAIL_APP_ID = 'bgm2525b0e4c7d93fec'

/** 小圣杯授权跳转地址 */
export const TINYGRAIL_URL_OAUTH_REDIRECT = 'https://tinygrail.com/api/account/callback'

/** 小圣杯更新内容帖子 */
export const TINYGRAIL_UPDATES_LOGS_URL = `${HOST}/group/topic/354698`

/* ==================== GITHUB ==================== */
/** 项目地址 */
export const GITHUB_PROJECT = 'https://github.com/czy0729/Bangumi'

/** 项目 gh-pages */
export const GITHUB_PROJECT_GH = 'https://czy0729.github.io/Bangumi'

/** 项目发版内容地址 */
export const GITHUB_RELEASE = `${GITHUB_PROJECT}/releases`

/** 检测发版版本地址 */
export const GITHUB_RELEASE_REPOS =
  'https://api.github.com/repos/czy0729/Bangumi/releases'

/** 热数据地址 */
export const GITHUB_DATA = 'https://gitee.com/a296377710/bangumi/raw/master/data.json'

/** 高级会员地址 */
export const GITHUB_ADVANCE =
  'https://gitee.com/a296377710/bangumi/raw/master/advance.json'

/* ==================== IMG ==================== */
/** 占位底图 */
export const IMG_EMPTY = {
  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAAA1BMVEX///+nxBvIAAAAKklEQVR42u3BgQAAAADDoPtTH2AK1QAAAAAAAAAAAAAAAAAAAAAAAACAOE+wAAFrRnPdAAAAAElFTkSuQmCC'
}

/** 占位底图 (黑) */
export const IMG_EMPTY_DARK = {
  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAAA1BMVEU+PkC+lq+tAAAAKklEQVR42u3BgQAAAADDoPtTH2AK1QAAAAAAAAAAAAAAAAAAAAAAAACAOE+wAAFrRnPdAAAAAElFTkSuQmCC'
}

/** 空头像 */
export const IMG_DEFAULT_AVATAR = '//lain.bgm.tv/pic/user/s/icon.jpg'

/** 默认图 */
export const IMG_DEFAULT = require('@assets/images/default.png')

/* ==================== IMG SIZE ==================== */
const h = w => parseInt(String(w * 1.4))

/** 头像大小 */
export const IMG_AVATAR_WIDTH = 32

/** 封面宽度 */
export const IMG_WIDTH = parseInt(String(RATIO * 82))

/** 封面高度 */
export const IMG_HEIGHT = h(IMG_WIDTH)

/** 封面宽度 (小) */
export const IMG_WIDTH_SM = parseInt(String(RATIO * 72))

/** 封面高度 (小) */
export const IMG_HEIGHT_SM = h(IMG_WIDTH_SM)

/** 封面宽度 (大) */
export const IMG_WIDTH_LG = parseInt(String(IMG_WIDTH * 1.28))

/** 封面高度 (大) */
export const IMG_HEIGHT_LG = h(IMG_WIDTH_LG)

/* ==================== DATA ==================== */
/** App 列表数据结构 */
export const LIST_EMPTY = {
  list: [],
  pagination: {
    page: 0,
    pageTotal: 0
  },
  _list: [], // 用于某些方法制造分页效果
  _loaded: false
}

/** 用于制造分页数据 */
export const LIMIT_LIST = 100

/** 用于制造分页数据 (评论) */
export const LIMIT_LIST_COMMENTS = 50

/** 对评论数多的帖子进行网页跳转 */
export const LIMIT_TOPIC_PUSH = 500

/** 部分首屏渲染任务非常重的页面设置的初始最大项显示值 */
export const LIMIT_HEAVY_RENDER = 10

/** App 事件埋点数据结构 */
export const EVENT = {
  id: '',
  data: {}
} as const

/** 时间数组 */
export const DATA_AIRTIME = [
  '全部',
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
  '1980'
].filter((item, index) => (IOS ? index < 20 : 1))

/** 月份数组 */
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

/** 索引年数组 */
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
].filter((item, index) => (IOS ? index < 20 : 1))

/** 索引时间月数组 */
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

/** 字母表数组 */
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

/** 1亿 */
export const B = 100000000

/** 1万 */
export const M = 10000

/** 允许显示的源头 */
export const SITES = ['bilibili', 'qq', 'iqiyi', 'acfun', 'youku']

/** 所有源头 */
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

/** [待废弃] 制造 [已收藏] 前面的占位 */
export const COLLECTION_INDENT = PAD ? '　　    ' : '　　   '

/** App 页面通用 context */
export const contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object,
  route: PropTypes.object
}
