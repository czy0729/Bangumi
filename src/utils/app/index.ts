/*
 * 项目相关工具函数
 *
 * @Author: czy0729
 * @Date: 2019-03-23 09:21:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 15:49:26
 */
import { Alert, BackHandler } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { HTMLDecode } from '@utils/html'
import { DEV } from '@/config'
import {
  EVENT,
  HOST,
  HOST_2,
  IMG_DEFAULT,
  IOS,
  URL_PRIVACY
} from '@constants/constants'
import {
  CDN_OSS_MAGMA_POSTER,
  CDN_OSS_SUBJECT,
  initHashAvatarOTA,
  initHashSubjectOTA
} from '@constants/cdn'
import cnData from '@assets/json/cn.json'
import x18data from '@assets/json/18x.json'
import bangumiData from '@assets/json/thirdParty/bangumiData.min.json'
import { AnyObject, EventType, Navigation, Paths, SubjectId } from '@types'
import { getStorage, setStorage } from '../storage'
import { getSystemStoreAsync, s2tAsync } from '../async'
import { rerender, globalLog, globalWarn } from '../dev'
import { t } from '../fetch'
import { isNull, getSafeValue } from './utils'
import {
  CN_CACHES,
  HOST_IMAGE,
  NO_IMGS,
  PRIVACY_STATE,
  RANDOM_FACTOR,
  SITE_MAP,
  TYPE_MAP,
  X18_DS,
  X18_TITLE,
  YEAR
} from './ds'

/** 启动 */
export function bootApp() {
  const fn = () => {}

  global.log = globalLog
  global.warn = globalWarn
  global.rerender = rerender
  global.console.warn = fn
  global.console.error = fn

  if (!DEV) {
    global.console.info = fn
    global.console.log = fn
    global.console.debug = fn
    global.console.assert = fn
  }

  initHashSubjectOTA()
  initHashAvatarOTA()
}

/** 获取设置 */
export function getSetting() {
  return getSystemStoreAsync().setting
}

/** 获取背景的模糊值 (iOS 与安卓实际表现不同，需要分开判断) */
export function getBlurRadius(uri?: string, bg?: string, avatarLarge?: string) {
  if (uri === bg) return 0

  if (IOS) {
    if (avatarLarge === bg || !bg) return 10
    return 48
  }

  return 8
}

/** app 内使用时间因子作为随机数, 规避 Hermes 引擎 Array.sort 的卡死 bug */
export function appRandom(arr: any[] = [], key: string = '') {
  const data = []
  arr.forEach(item => {
    if (item[key]) {
      const _b = Number(String(item[key]).slice(0, 1))
      if (RANDOM_FACTOR >= _b) {
        data.unshift(item)
      } else {
        data.push(item)
      }
    }
  })
  return data
}

/** 适配系统中文优先返回合适字符串 */
export function cnjp(cn: any, jp: any) {
  const { cnFirst } = getSetting()
  return HTMLDecode(cnFirst ? cn || jp : jp || cn)
}

/** 云端 onAir 和自定义 onAir 组合判断 */
export function getOnAir(
  onAir: { [x: string]: any },
  onAirUser: { [x: string]: any; weekDayCN?: string; timeCN?: string; _loaded?: any }
) {
  const timeJP = getSafeValue('timeJP', onAir, onAirUser)
  const timeCN = getSafeValue('timeCN', onAir, onAirUser)
  const time = isNull(timeCN) ? timeJP : timeCN

  const weekDayJP = getSafeValue('weekDayJP', onAir, onAirUser)
  const weekDayCN = getSafeValue('weekDayCN', onAir, onAirUser)
  const weekDay = isNull(weekDayCN) ? weekDayJP : weekDayCN

  const h = typeof time === 'string' ? time.slice(0, 2) : ''
  const m = typeof time === 'string' ? time.slice(2, 4) : ''
  return {
    weekDay,
    h,
    m,
    isExist: weekDay !== undefined && weekDay !== '',
    isCustom: !!onAirUser?._loaded
  }
}

/** 统一逻辑, 获取放送日函数 */
export function getWeekDay(item: { weekDayCN?: any; weekDayJP?: any } = {}) {
  const weekDay =
    item?.weekDayCN == 0 ? item?.weekDayCN : item?.weekDayCN || item?.weekDayJP
  return weekDay === '' ? '' : weekDay
}

/**
 * 是否敏感条目
 * @param {*} subjectId
 * @param {*} title     辅助检测, 有关键字则都认为是 18x
 */
export function x18(subjectId: SubjectId, title?: string) {
  if (!subjectId) return false
  let filter =
    typeof subjectId === 'string'
      ? String(parseInt(subjectId.replace('/subject/', ''))) in x18data
      : String(subjectId) in x18data
  if (!filter && title) filter = X18_TITLE.some(item => title.includes(item))
  return filter
}

/** 猜测是否敏感字符串 */
export function x18s(str: string) {
  const _str = String(str).toLowerCase()
  return X18_DS.some(item => _str.includes(item))
}

let _navigationReference: Navigation | undefined

/** 保存navigation引用 */
export function navigationReference(navigation?: Navigation | undefined) {
  if (navigation) {
    _navigationReference = navigation
    if (!_navigationReference.push)
      _navigationReference.push = _navigationReference.navigate
  }
  return _navigationReference
}

/**
 * 查找条目中文名
 * @param {*} jp
 * @param {*} subjectId
 */
export function findSubjectCn(jp: string = '', subjectId?: SubjectId): string {
  if (!getSetting()?.cnFirst) return jp

  if (CN_CACHES[jp]) return CN_CACHES[jp]

  // @deprecated [已废弃] 若带 id 使用本地 SUBJECT_CN 加速查找
  if (subjectId) {
    const cn = cnData[subjectId]
    if (cn) {
      CN_CACHES[jp] = cn
      return cn
    }
  }

  // 没有 id 则使用jp在 bangumi-data 里面匹配
  const item = bangumiData.find(
    item => subjectId == item.id || item.j === HTMLDecode(jp)
  )
  if (item) {
    const _item = unzipBangumiData(item)
    const cn =
      (_item.titleTranslate &&
        _item.titleTranslate['zh-Hans'] &&
        _item.titleTranslate['zh-Hans'][0]) ||
      jp
    CN_CACHES[jp] = cn
    return cn
  }

  CN_CACHES[jp] = jp
  return jp
}

/** 修正和缩略 ago 时间 */
export function correctAgo(time = '') {
  let _time = time.replace('...', '')
  if (_time.indexOf(' ago') === -1) {
    _time = _time.replace('ago', ' ago')
  }
  return _time.includes('-')
    ? _time.replace(`${YEAR}-`, '')
    : _time
        .replace('d', '天')
        .replace('h', '时')
        .replace('m', '分')
        .replace('s', '秒')
        .replace(' ago', '前')
        .replace(/ /g, '')
}

/** keyExtractor */
export function keyExtractor(item = { id: '' }) {
  return String(item.id)
}

/** 修复链接 */
export function fixedBgmUrl(url = '') {
  try {
    let _url = url

    // 补全协议
    if (!_url.includes('http://') && !_url.includes('https://')) {
      _url = `${HOST}${_url}`
    }

    // HOST纠正为https
    if (_url.includes('http://')) {
      _url = _url.replace('http://', 'https://')
    }

    // bgm.tv 替换成 bangumi.tv
    if (_url.includes(HOST_2)) {
      _url = _url.replace(HOST_2, HOST)
    }

    return _url
  } catch (error) {
    return url
  }
}

/** 判断是否bgm的链接, 若是返回页面信息, 否则返回 false */
export function matchBgmLink(url = ''):
  | false
  | {
      route: Paths
      params?: AnyObject
      app?: boolean
    } {
  try {
    const _url = fixedBgmUrl(url)

    // 自定义的 App 内协议
    if (_url.indexOf('https://App/') === 0) {
      const [, , , route = '', params = ''] = _url.split('/')
      if (route && params) {
        const [key, value] = params.split(':')
        return {
          route: route as Paths,
          params: {
            [key]: value
          },
          app: true
        }
      }
    }

    if (!_url.includes(HOST)) return false

    // 超展开内容 [/rakuen/topic/{topicId}]
    if (_url.includes('/rakuen/topic/')) {
      const topicId = _url.replace(`${HOST}/rakuen/topic/`, '')
      return {
        route: 'Topic',
        params: {
          topicId
        }
      }
    }

    if (_url.includes('/group/topic/')) {
      const topicId = `group/${_url.replace(`${HOST}/group/topic/`, '')}`
      return {
        route: 'Topic',
        params: {
          topicId
        }
      }
    }

    // 条目 > 讨论版
    if (_url.includes('/subject/topic/')) {
      const topicId = `subject/${_url.replace(`${HOST}/subject/topic/`, '')}`
      return {
        route: 'Topic',
        params: {
          topicId
        }
      }
    }

    // 本集讨论 [/ep/\d+]
    // 结构与超展开内容类似, 跳转到超展开内容
    if (_url.includes('/ep/')) {
      const topicId = _url.replace(`${HOST}/`, '').replace('subject/', '')
      return {
        route: 'Topic',
        params: {
          topicId
        }
      }
    }

    // 条目 [/subject/{subjectId}]
    if (_url.includes('/subject/')) {
      const subjectId = _url.replace(`${HOST}/subject/`, '')
      return {
        route: 'Subject',
        params: {
          subjectId
        }
      }
    }

    // 个人中心 [/user/{userId}]
    // 排除时间线回复 [user/{userId}/timeline/status/{timelineId}]
    if (_url.includes('/user/') && _url.split('/').length <= 6) {
      const userId = _url.replace(`${HOST}/user/`, '')
      return {
        route: 'Zone',
        params: {
          userId
        }
      }
    }

    // 人物 [/character/\d+, /person/\d+]
    if (_url.includes('/character/') || _url.includes('/person/')) {
      const monoId = _url.replace(`${HOST}/`, '')
      return {
        route: 'Mono',
        params: {
          monoId
        }
      }
    }

    // 小组
    if (_url.includes('/group/')) {
      const groupId = _url.replace(`${HOST}/group/`, '')
      return {
        route: 'Group',
        params: {
          groupId
        }
      }
    }

    // 标签
    if (_url.includes('/tag/')) {
      // ['https:', ', 'bangumi.tv', 'anime', 'tag', '剧场版', 'airtime', '2018']
      const params = _url.split('/')
      return {
        route: 'Tag',
        params: {
          type: params[3],
          tag: decodeURIComponent(params[5]),
          airtime: params[7]
        }
      }
    }

    // 吐槽
    if (_url.includes('/timeline/status/')) {
      const splits = _url.split('/timeline/status/')
      const _userId = splits[0].replace('https://bgm.tv/user/', '')
      const _id = splits[1]
      return {
        route: 'Say',
        params: {
          id: _id,
          userId: _userId
        }
      }
    }

    // 目录
    if (_url.includes('/index/')) {
      const _id = _url.split('/index/')[1]
      return {
        route: 'CatalogDetail',
        params: {
          catalogId: _id
        }
      }
    }

    // 日志
    if (_url.includes('/blog/')) {
      const _id = _url.split('/blog/')[1]
      return {
        route: 'Blog',
        params: {
          blogId: _id
        }
      }
    }

    return false
  } catch (error) {
    return false
  }
}

/** 自动判断封面 CDN 地址 */
export function matchCoverUrl(src: string, noDefault?: boolean, prefix?: string) {
  const { cdn, cdnOrigin } = getSetting()
  const fallback = noDefault ? '' : IMG_DEFAULT

  // 有些情况图片地址分析错误, 排除掉
  if (NO_IMGS.includes(src)) return IMG_DEFAULT || fallback

  if (
    cdn &&
    cdnOrigin === 'magma' &&
    typeof src === 'string' &&
    src.includes(HOST_IMAGE)
  ) {
    return CDN_OSS_MAGMA_POSTER(getCoverMedium(src), prefix) || fallback
  }

  if (cdn) return CDN_OSS_SUBJECT(getCoverMedium(src), cdnOrigin) || fallback

  // 大图不替换成低质量图
  if (typeof src === 'string' && src?.includes('/l/')) return src
  return getCoverMedium(src) || fallback
}

/**
 * 根据 Bangumi 的 url 判断路由跳转方式
 *
 * @param {*} url            链接
 * @param {*} navigation     路由对象
 * @param {*} passParams     传递的参数
 * @param {*} event          EVENT
 * @param {*} openWebBrowser 没路由对象或者非本站是否使用浏览器尝试打开
 */
export function appNavigate(
  url: string = '',
  navigation: Navigation,
  passParams: {
    [key: string]: any
  } = {},
  event: EventType = EVENT,
  openWebBrowser: boolean = true
): boolean {
  try {
    const { id, data = {} } = event
    const _url = fixedBgmUrl(url)
    const result = matchBgmLink(_url)

    // 没路由对象或者非本站
    if (!navigation || !_url.includes(HOST) || !result) {
      if (openWebBrowser) {
        t(id, {
          to: 'WebBrowser',
          url: _url,
          ...data
        })

        WebBrowser.openBrowserAsync(_url)
      }
      return false
    }

    const { route, params } = result
    t(id, {
      to: route,
      ...params,
      ...data
    })

    navigation.push(route, {
      _url,
      ...params,
      ...passParams
    })
    return true
  } catch (error) {
    globalWarn('utils/app', 'appNavigate')
    return false
  }
}

/** 获取颜色 type */
export function getType(label: string, defaultType: string = 'plain') {
  return TYPE_MAP[label] || defaultType
}

/** 获取评分中文 */
export function getRating(score: number) {
  if (score === undefined) return false
  if (score >= 9.5) return '超神作'
  if (score >= 8.5) return '神作'
  if (score >= 7.5) return '力荐'
  if (score >= 6.5) return '推荐'
  if (score >= 5.5) return '还行'
  if (score >= 4.5) return '不过不失'
  if (score >= 3.5) return '较差'
  if (score >= 2.5) return '差'
  if (score >= 1.5) return '很差'
  return '不忍直视'
}

/**
 * 获得在线播放地址
 * @param {*} item bangumiInfo 数据项
 */
export function getBangumiUrl(item: { site?: any; id?: any; url?: any }) {
  if (!item) return ''

  const { site, id, url } = item
  switch (site) {
    case 'bangumi':
      return url || `${HOST}/subject/${id}`

    case 'acfun':
      return url || `https://www.acfun.cn/bangumi/aa${id}`

    case 'bilibili':
      return url || `https://www.bilibili.com/bangumi/media/md${id}/`

    case 'sohu':
      return url || `https://tv.sohu.com/${id}`

    case 'youku':
      return url || `https://list.youku.com/show/id_z${id}.html`

    case 'qq':
      return url || `https://v.qq.com/detail/${id}.html`

    case 'iqiyi':
      return url || `https://www.iqiyi.com/${id}.html`

    case 'letv':
      return url || `https://www.le.com/comic/${id}.html`

    case 'pptv':
      return url || `http://v.pptv.com/page/${id}.html`

    case 'mgtv':
      return url || `https://www.mgtv.com/h/${id}.html`

    case 'nicovideo':
      return url || `https://ch.nicovideo.jp/${id}`

    case 'netflix':
      return url || `https://www.netflix.com/title/${id}`

    default:
      return ''
  }
}

/** 从 cookies 字符串中分析 cookie 值 */
export function getCookie(cookies = '', name: string) {
  const list = cookies.split('; ')
  for (let i = 0; i < list.length; i += 1) {
    const arr = list[i].split('=')
    if (arr[0] == name) return decodeURIComponent(arr[1])
  }
  return ''
}

/**
 * 获取低质量 bgm 图片
 *  - bgm 图片质量 g < s < m < c < l, 只用s, m(c), l
 *  - CDN开启下 Avatar 组件会忽略 s, 把 s 转成 m(c)
 */
export function getCoverSmall(src = '') {
  if (
    typeof src !== 'string' ||
    src === '' ||
    src.includes('/photo/') ||
    !src.includes(HOST_IMAGE)
  )
    return src

  return src.replace(/\/g\/|\/s\/|\/c\/|\/l\//, '/s/')
}

/** 获取中质量 bgm 图片 */
export function getCoverMedium(src: any = '', mini: boolean = false) {
  // 角色图片因为是对头部划图的, 不要处理
  // 用户图床也没有其他质量
  if (
    typeof src !== 'string' ||
    src === '' ||
    src.includes('/crt/') ||
    src.includes('/photo/') ||
    !src.includes(HOST_IMAGE)
  ) {
    return src
  }

  // 用户头像和小组图标没有/c/类型
  if (mini || src.includes('/user/') || src.includes('/icon/')) {
    return src.replace(/\/g\/|\/s\/|\/c\/|\/l\//, '/m/')
  }

  return src.replace(/\/g\/|\/s\/|\/m\/|\/l\//, '/c/')
}

/** 获取高质量bgm图片 */
export function getCoverLarge(src = '') {
  if (
    typeof src !== 'string' ||
    src === '' ||
    src.includes('/photo/') ||
    !src.includes(HOST_IMAGE)
  ) {
    return src
  }

  return src.replace(/\/g\/|\/s\/|\/m\/|\/c\//, '/l/')
}

/** 小圣杯时间格式化 */
export function formatTime(time) {
  let times = (+new Date(time) - +new Date()) / 1000
  let day = 0
  let hour = 0
  if (times > 0) {
    day = Math.floor(times / (60 * 60 * 24))
    hour = Math.floor(times / (60 * 60)) - day * 24
    if (day > 0) return `${day}天${hour}小时`
    if (hour > 1) return `剩余${hour}小时`
    return '即将结束'
  }

  times = Math.abs(times)
  day = Math.floor(times / (60 * 60 * 24))
  hour = Math.floor(times / (60 * 60))
  const miniute = Math.floor(times / 60)
  const second = Math.floor(times)
  if (miniute < 1) return `${second}s ago`
  if (miniute < 60) return `${miniute}m ago`
  if (hour < 24) return `${hour}h ago`
  return `${day}d ago`
}

/** 小圣杯计算ICO等级 */
export function caculateICO(ico) {
  let level = 0
  let price = 10
  let amount = 0
  let next = 100000
  let nextUser = 15

  // 人数等级
  const heads = ico.users
  let headLevel = Math.floor((heads - 10) / 5)
  if (headLevel < 0) headLevel = 0

  // 资金等级
  while (ico.total >= next && level < headLevel) {
    level += 1
    next += Math.pow(level + 1, 2) * 100000
  }

  amount = 10000 + (level - 1) * 7500
  price = ico.total / amount
  nextUser = (level + 1) * 5 + 10

  return {
    level,
    next,
    price,
    amount,
    users: nextUser - ico.Users
  }
}

/** 小圣杯 OSS 修正 */
export function tinygrailOSS(str: string, w = 150) {
  if (typeof str !== 'string' || str.includes('!w')) {
    return str
  }

  // https://tinygrail.oss-cn-hangzhou.aliyuncs.com
  // https://tinygrail.mange.cn/cover/1e5f9be0dfe62372a69e9a4f04acd0e1.jpg!w150
  if (str.includes('aliyuncs.com') || str.includes('tinygrail.mange.cn')) {
    return `${str}!w${w}`.replace(
      'tinygrail.oss-cn-hangzhou.aliyuncs.com',
      'tinygrail.mange.cn'
    )
  }

  return str
}

/** 修复时间 (2019-10-04T13:34:03.4243768+08:00 => 2019-10-04 13:34:03) */
export function tinygrailFixedTime(time: any) {
  return (time || '').replace('T', ' ').split('+')[0].split('.')[0]
}

/**
 * bangumi-data的min转换成正常item
 * @param {*} item
 *
 * {
 *   id: 132734,
 *   j: '冴えない彼女の育てかた♭',
 *   c: '路人女主的养成方法 ♭',
 *   s: {
 *     p: 'SP3XVb0jk9E0sho',
 *     i: 'a_19rrh9f1yl',
 *     ni: 'saenai2',
 *     b: 28228738
 *   }
 *   [t: 'tv']
 * }
 */
export function unzipBangumiData(
  item: { id?: any; s?: any; j?: string; c?: string; t?: string } = {}
) {
  const sites = [
    {
      site: 'bangumi',
      id: String(item.id)
    }
  ]
  Object.keys(item.s || {}).forEach(s =>
    sites.push({
      site: SITE_MAP[s],
      id: String(item.s[s])
    })
  )

  return {
    title: item.j,
    type: item.t || 'tv',
    sites,
    titleTranslate: {
      'zh-Hans': [item.c]
    }
  }
}

/** 隐私条款弹窗 */
export async function privacy() {
  const value = await getStorage(PRIVACY_STATE)
  if (value) return

  const params = [
    {
      text: s2tAsync('隐私保护政策'),
      onPress: () => {
        WebBrowser.openBrowserAsync(URL_PRIVACY, {
          enableBarCollapsing: true,
          showInRecents: true
        })

        setTimeout(() => {
          privacy()
        }, 4000)
      }
    },
    {
      text: s2tAsync('不同意并退出'),
      onPress: () => {
        BackHandler.exitApp()

        setTimeout(() => {
          privacy()
        }, 4000)
      }
    },
    {
      text: s2tAsync('同意'),
      onPress: () => {
        setStorage(PRIVACY_STATE, 1)
      }
    }
  ]

  return Alert.alert(
    s2tAsync('隐私保护政策'),
    s2tAsync(`请你务必审慎阅读、充分理解“隐私保护政策”各条款。
    \n如你同意，请点击“同意”开始使用服务。如你不同意，很遗憾本应用无法为你提供服务。`),
    params
  )
}
