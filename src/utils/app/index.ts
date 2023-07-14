/*
 * 项目相关工具函数
 * @Author: czy0729
 * @Date: 2019-03-23 09:21:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-13 12:25:30
 */
import { Alert, BackHandler } from 'react-native'
import dayjs from 'dayjs'
import { isObservableArray } from 'mobx'
import { DEV } from '@/config'
import { STORYBOOK } from '@constants/device'
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
import bangumiData from '@assets/json/thirdParty/bangumiData.min.json'
import x18Data from '@assets/json/18x.json'
import userData from '@assets/json/user.json'
import {
  AnyObject,
  Avatar,
  BangumiData,
  Cover,
  EventType,
  Id,
  Navigation,
  Paths,
  SubjectId,
  SubjectTypeCn,
  UserId
} from '@types'
import { asc, getTimestamp, open, toLocal, urlStringify } from '../utils'
import { info, confirm, feedback } from '../ui'
import { HTMLDecode, removeHTMLTag } from '../html'
import { getStorage, setStorage } from '../storage'
import { syncRakuenStore, syncSystemStore, s2tAsync } from '../async'
import { t } from '../fetch'
import { calendarEventsRequestPermissions, calendarEventsSaveEvent } from '../calendar'
import { rerender, globalLog, globalWarn } from '../dev'
import { isNull, getSafeValue } from './utils'
import {
  BANGUMI_URL_TEMPLATES,
  BLOCKED_USER_UUID,
  FIND_SUBJECT_CN_CACHE_MAP,
  GET_AVATAR_CACHE_MAP,
  HEIGHT,
  HOST_IMAGE,
  NO_IMGS,
  PRIVACY_STATE,
  RANDOM_FACTOR,
  RATING_MAP,
  SITE_MAP,
  TYPE_MAP,
  X18_CACHE_MAP,
  X18_DS,
  X18_TITLE,
  YEAR
} from './ds'

/** 获取 APP 网页版参数 */
export function getSPAParams(routeName: string, params?: AnyObject) {
  return `iframe.html?${urlStringify({
    viewMode: 'story',

    // params
    ...Object.entries(params || {})
      // .filter(([key]) => !key.startsWith('_'))
      .filter(([, value]) => value)
      .reduce((obj, [key, value]) => {
        obj[key] = value
        return obj
      }, {}),

    // CatalogDetail -> catalogdetail--catalog-detail
    // LoginV2 -> loginv2--login-v-2
    id: `screens-${routeName.toLowerCase()}--${routeName
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/(\d+)/g, '-$1')
      .toLowerCase()}`
  })}`
}

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

/** 处理屏蔽用户 */
export function getIsBlockUser(
  blockUserIds: string[],
  userName: string,
  userId: UserId,
  trackUUID?: string
) {
  const findIndex = blockUserIds.findIndex(item => {
    const [itemUserName, itemUserId] = item.split('@')
    if (!itemUserId || itemUserId === 'undefined') return itemUserName === userName
    return itemUserId === userId
  })
  const isBlock = findIndex !== -1
  if (isBlock && trackUUID) {
    const key = `${userId}|${trackUUID}`
    if (!BLOCKED_USER_UUID[key]) {
      BLOCKED_USER_UUID[key] = 1
      setTimeout(() => {
        syncRakuenStore().trackBlockedUser(userId)
      }, 0)
    }
  }

  return isBlock
}

/** 统一更新控制页面懒渲染 visibleBottom 变量的函数 */
export function updateVisibleBottom({ nativeEvent }) {
  if (typeof this.setState !== 'function') return

  const { contentOffset, layoutMeasurement } = nativeEvent
  const screenHeight = layoutMeasurement.height
  const visibleBottom = contentOffset.y + screenHeight
  if (visibleBottom <= (this.state.visibleBottom || 0)) return

  this.setState({
    visibleBottom: visibleBottom + HEIGHT * 0.5
  })
}

/** 是否数组, 若为 mobx 观察的数组使用原生方法是判断不出来的 */
export function isArray(arr: any) {
  if (!arr) return false
  return Array.isArray(arr) || isObservableArray(arr)
}

/** 判断收藏动作 */
export function getAction(typeCn: SubjectTypeCn) {
  if (typeCn === '书籍') return '读'
  if (typeCn === '游戏') return '玩'
  if (typeCn === '音乐') return '听'
  return '看'
}

/** 获取设置 */
export function getSetting() {
  return syncSystemStore().setting
}

/** 参数转成字符串 */
export function getKeyString(...args: any[]) {
  return args.toString()
}

/** 查找条目中文名 */
export function findSubjectCn(jp: string = '', subjectId?: SubjectId): string {
  if (!getSetting()?.cnFirst) return jp

  if (FIND_SUBJECT_CN_CACHE_MAP.has(jp)) return FIND_SUBJECT_CN_CACHE_MAP.get(jp)

  const item = (bangumiData as BangumiData).find(
    // 没有 id 则使用 jp 在 bangumi-data 里面匹配
    item => subjectId == item.id || item.j === HTMLDecode(jp)
  )
  if (item) {
    const cn = item.c || ''
    if (cn) {
      FIND_SUBJECT_CN_CACHE_MAP.set(jp, cn)
      return cn
    }
  }

  FIND_SUBJECT_CN_CACHE_MAP.set(jp, jp)
  return jp
}

/** 获取背景的模糊值 (各平台实际表现是不一样的, 需要分开判断) */
export function getBlurRadius(uri?: string, bg?: string, avatarLarge?: string) {
  if (typeof uri === 'string') uri = uri.replace('http://', 'https://')
  if (typeof bg === 'string') bg = bg.replace('http://', 'https://')
  if (uri === bg) return 0

  if (IOS) {
    if (avatarLarge === bg || !bg) return 10
    return 48
  }

  if (STORYBOOK) return 28

  return 8
}

/** 简单控制请求频率工具函数, 若不需要发请求返回 true */
export function opitimize(data: any, s = 60) {
  if (!data?._loaded) return false

  return getTimestamp() - Number(data?._loaded || 0) < s
}

/** app 内使用时间因子作为随机数, 规避 Hermes 引擎 Array.sort 的卡死 bug */
export function appRandom(arr: any[] = [], key: string = '') {
  const data = []
  arr.forEach(item => {
    if (item[key]) {
      const str = String(String(item[key]).match(/\d+/g)?.[0] || 0)
      let factor = 5
      try {
        factor = Number(str.slice(str.length - 1, str.length))
      } catch (error) {}

      if (RANDOM_FACTOR >= factor) {
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
  onAir: {
    [x: string]: any
  },
  onAirUser: {
    [x: string]: any
    weekDayCN?: string
    timeCN?: string
    _loaded?: any
  }
) {
  const timeJP = getSafeValue('timeJP', onAir, onAirUser)
  const timeCN = getSafeValue('timeCN', onAir, onAirUser)
  const time = isNull(timeCN) ? timeJP : timeCN

  const weekDayJP = getSafeValue('weekDayJP', onAir, onAirUser)
  const weekDayCN = getSafeValue('weekDayCN', onAir, onAirUser)
  let weekDay = isNull(weekDayCN) ? weekDayJP : weekDayCN
  const isOnair = !!(weekDay !== undefined && weekDay !== '' && (timeCN || timeJP))

  let h = typeof time === 'string' ? time.slice(0, 2) : ''
  let m = typeof time === 'string' ? time.slice(2, 4) : ''
  const isCustom = !!onAirUser?._loaded
  if (!isCustom) {
    const onAirLocal = toLocal(weekDay, `${h}${m}`)
    weekDay = onAirLocal.weekDayLocal
    h = onAirLocal.timeLocal.slice(0, 2)
    m = onAirLocal.timeLocal.slice(2, 4)
  }

  return {
    /** 星期几放送 1-7 */
    weekDay,

    /** 放送时 */
    h,

    /** 放送分 */
    m,

    /** 是否云端有数据, 存在才代表是当季番剧 */
    isOnair,

    /** 是否最终计算后有放送时间 */
    isExist: weekDay !== undefined && weekDay !== '',

    /** 是否用户自定义时间 */
    isCustom
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

  if (typeof subjectId === 'string') {
    subjectId = Number(subjectId.replace('/subject/', ''))
  }

  if (X18_CACHE_MAP.has(subjectId)) return X18_CACHE_MAP.get(subjectId)

  const flag = x18Data.includes(subjectId)
  if (flag) {
    X18_CACHE_MAP.set(subjectId, true)
    return true
  }

  if (title) {
    const flag = X18_TITLE.some(item => title.includes(item))
    if (flag) {
      X18_CACHE_MAP.set(subjectId, true)
      return true
    }
  }

  X18_CACHE_MAP.set(subjectId, false)
  return false
}

/** 猜测是否敏感字符串 */
export function x18s(str: string) {
  const _str = String(str).toLowerCase()
  return X18_DS.some(item => _str.includes(item))
}

let _navigationReference: Navigation | undefined

/** 保存 navigation 引用 */
export function navigationReference(navigation?: Navigation | undefined) {
  if (STORYBOOK) {
    return require('@components/storybook/navigation').StorybookNavigation as Navigation
  }

  if (navigation) {
    _navigationReference = navigation
    if (!_navigationReference.push) {
      _navigationReference.push = _navigationReference.navigate
    }
  }

  return _navigationReference
}

/** 修正和缩略 ago 时间 */
export function correctAgo(time = '') {
  let _time = time.replace('...', '')
  if (_time.indexOf(' ago') === -1) _time = _time.replace('ago', ' ago')
  return _time.includes('-')
    ? _time.replace(`${YEAR}-`, '')
    : _time
        .replace(/d|h|m|s/g, match => ({ d: '天', h: '时', m: '分', s: '秒' }[match]))
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
    if (!_url.includes('http://') && !_url.includes('https://')) {
      _url = `${HOST}${_url}`
    }
    _url.includes('http://') && (_url = _url.replace('http://', 'https://'))
    _url.includes(HOST_2) && (_url = _url.replace(HOST_2, HOST))
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

  /** 有些情况图片地址分析错误, 排除掉 */
  if (NO_IMGS.includes(src)) {
    return IMG_DEFAULT || fallback
  }

  /** magma 高级会员图片源 */
  if (
    cdn &&
    cdnOrigin === 'magma' &&
    typeof src === 'string' &&
    src.includes(HOST_IMAGE)
  ) {
    return CDN_OSS_MAGMA_POSTER(getCoverMedium(src), prefix) || fallback
  }

  /** @deprecated 旧免费 CDN 源头, 国内已全部失效 */
  if (cdn) {
    return (
      CDN_OSS_SUBJECT(getCoverMedium(src), cdnOrigin as 'fastly' | 'OneDrive') ||
      fallback
    )
  }

  /** 大图不替换成低质量图 */
  if (typeof src === 'string' && src?.includes('/l/')) {
    return src
  }

  /** 保证至少为中质量图 */
  return getCoverMedium(src) || fallback
}

/**
 * 根据 Bangumi 的 url 判断路由跳转方式
 * @param {*} url            链接
 * @param {*} navigation     路由对象
 * @param {*} passParams     传递的参数
 * @param {*} event          EVENT
 * @param {*} openWebBrowser 没路由对象或者非本站是否使用浏览器尝试打开
 */
export function appNavigate(
  url: string = '',
  navigation?: Navigation,
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

        open(_url)
      }
      return false
    }

    const { route, params } = result
    t(id, {
      to: route,
      ...params,
      ...data
    })

    navigation.push(
      route as any,
      {
        _url,
        ...params,
        ...passParams
      } as any
    )
    return true
  } catch (error) {
    console.error('utils/app', 'appNavigate')
    return false
  }
}

/** 获取颜色 type */
export function getType(label: string, defaultType: string = 'plain') {
  return TYPE_MAP[label] || defaultType
}

/** 获取评分中文 */
export function getRating(
  score: number
): (typeof RATING_MAP)[keyof typeof RATING_MAP] | '' {
  if (score === undefined) return ''
  return RATING_MAP[Math.floor(score + 0.5)] || RATING_MAP[1]
}

/**
 * 获得在线播放地址
 * @param {*} item bangumiInfo 数据项
 */
export function getBangumiUrl(item: { site?: string; id?: Id; url?: string }): string {
  if (!item) return ''

  const { site, id, url } = item || {}
  if (site && site in BANGUMI_URL_TEMPLATES) {
    return url || BANGUMI_URL_TEMPLATES[site](id)
  }

  return ''
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
 *  - bgm 图片质量 g < s < m < c < l, 只用 s, m(c), l
 *  - CDN 开启下 Avatar 组件会忽略 s, 把 s 转成 m(c)
 */
export function getCoverSmall(src?: Avatar): Avatar<'s'>
export function getCoverSmall(src?: Cover): Cover<'s'>
export function getCoverSmall(src: string): string
export function getCoverSmall(
  src: Avatar | Cover | string = ''
): Avatar<'s'> | Cover<'s'> | string {
  if (
    typeof src !== 'string' ||
    src === '' ||
    src.includes('/photo/') ||
    !src.includes(HOST_IMAGE)
  ) {
    return src
  }

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

/** 获取高质量 bgm 图片 */
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

/** 获取新格式 bgm 封面大图 */
export function getCover400(src: string = '', size: 100 | 200 | 400 | 800 = 400) {
  if (typeof src === 'string' && src.includes('lain.bgm.tv')) {
    return (
      src
        // 使用新增的 r/400 前缀
        .replace(
          /lain.bgm.tv\/pic\/cover\/(g|s|c|m|l)\//,
          `lain.bgm.tv/r/${size}/pic/cover/l/`
        )
        // 不使用 nxn 直接使用 r/400
        .replace(/\/r\/\d+x\d+\//, `/r/${size}/`)
        // 不使用 r/800
        .replace('/r/800/', `/r/${size}/`)
    )
  }

  return src
}

export function getSubjectCoverCommon(url: string): string {
  const _url = url.replace(
    /\/\/lain.bgm.tv\/r\/\d+\/pic\/cover\/(g|s|m|l)\//,
    '//lain.bgm.tv/pic/cover/c/'
  )
  if (_url.indexOf('//') === 0) return `https:${_url}`
  return _url.replace('http://', 'https://')
}

export function getMonoCoverSmall(url: string): string {
  const _url = url.replace(
    /\/\/lain.bgm.tv\/r\/\d+\/pic\/crt\/(g|m|c|l)\//,
    '//lain.bgm.tv/pic/crt/s/'
  )
  if (_url.indexOf('//') === 0) return `https:${_url}`
  return _url.replace('http://', 'https://')
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

/** 小圣杯计算 ICO 等级 */
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
 * bangumi-data 的 min 转换成正常 item
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
        open(URL_PRIVACY)

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

/** 构建日历日程标题 */
export function getCalenderEventTitle(
  item: {
    sort?: number
  } = {},
  subjectTitle: string = ''
) {
  const { sort = '' } = item
  let title = ''
  if (sort) title += `[ep.${sort}] `
  title += subjectTitle || ''
  return title
}

/** 添加放送日程到日历 */
export function saveCalenderEvent(
  item: {
    airdate?: string
    sort?: number
    duration?: string
    url?: string
  } = {},
  subjectTitle: string = '',
  onAirCustom: {
    h?: string
    m?: string
  } = {},
  showConfirm: boolean = true
) {
  setTimeout(async () => {
    const data = await calendarEventsRequestPermissions()
    if (data !== 'authorized') {
      info('权限不足')
      return
    }

    const { airdate, duration = '', url } = item
    if (airdate) {
      try {
        const { h, m } = onAirCustom
        let date = dayjs(`${airdate} ${h || '00'}:${m || '00'}:00`)
        let dateEnd = dayjs(`${airdate} ${h || '00'}:${m || '00'}:00`)

        if (typeof duration === 'string' && /^\d{2}:\d{2}:\d{2}$/g.test(duration)) {
          const [h, i, s] = duration.split(':')
          if (Number(h)) dateEnd = dateEnd.add(Number(h), 'hour')
          if (Number(i)) dateEnd = dateEnd.add(Number(i), 'minute')
          if (Number(s)) dateEnd = dateEnd.add(Number(s), 'second')
        }

        const title = getCalenderEventTitle(item, subjectTitle)
        const format = 'YYYY-MM-DDTHH:mm:ss.000[Z]'
        const cb = async () => {
          date = date.subtract(8, 'hours')
          dateEnd = dateEnd.subtract(8, 'hours')
          const calendarId = await calendarEventsSaveEvent(title, {
            startDate: date.format(format),
            endDate: dateEnd.format(format),
            notes: String(url).replace('http://', 'https://')
          })
          if (showConfirm) {
            setTimeout(() => {
              if (!calendarId) {
                info('添加可能失败了，请检查')
              } else {
                feedback()
                info('添加成功')
              }
            }, 240)
          }
        }

        if (showConfirm) {
          confirm(
            `${title}
            \n${date
              .format(format)
              .replace('T', ' ')
              .replace('.000Z', '')} 到\n${dateEnd
              .format(format)
              .replace('T', ' ')
              .replace('.000Z', '')}
            \n确定添加到日历中吗？`,
            cb,
            '放送提醒'
          )
        } else {
          cb()
        }
      } catch (error) {
        info('功能出错，请联系开发者')
      }
    }
  }, 80)
}

/** 导出 ics 日程格式时间 */
export function genICSCalenderEventDate(
  item: {
    airdate?: string
    sort?: number
    duration?: string
    url?: string
  } = {},
  onAirCustom: {
    h?: string
    m?: string
  } = {}
) {
  const { airdate, duration = '' } = item
  const { h, m } = onAirCustom
  let date = dayjs(`${airdate} ${h || '00'}:${m || '00'}:00`)
  let dateEnd = dayjs(`${airdate} ${h || '00'}:${m || '00'}:00`)
  if (typeof duration === 'string' && /^\d{2}:\d{2}:\d{2}$/g.test(duration)) {
    const [h, i, s] = duration.split(':')
    if (Number(h)) dateEnd = dateEnd.add(Number(h), 'hour')
    if (Number(i)) dateEnd = dateEnd.add(Number(i), 'minute')
    if (Number(s)) dateEnd = dateEnd.add(Number(s), 'second')
  }

  const format = 'YYYYMMDDTHHmmss[Z]'
  date = date.subtract(8, 'hours')
  dateEnd = dateEnd.subtract(8, 'hours')
  return {
    DTSTART: date.format(format),
    DTEND: dateEnd.format(format)
  }
}

/** 获取符合预期的回复纯文字 */
export function getCommentPlainText(str: string) {
  const pattern = /<img[^>]+alt="\((bgm\d+)\)"[^>]*>/
  return removeHTMLTag(
    str
      .replace(/<div class="quote">(.+?)<\/div>/g, '')
      .replace(/<br>/g, '\n')
      .replace(pattern, '($1)')
  )
}

/**
 * 在本地数据中尽量获取用户头像地址
 * 目的为进行减少 API 请求
 * */
export function getAvatarLocal(userId: string) {
  if (!userId) return false

  if (GET_AVATAR_CACHE_MAP.has(userId)) return GET_AVATAR_CACHE_MAP.get(userId)

  let find = userData[userId]
  if (!find) find = Object.values(userData).find((item: any) => item.i == userId)

  if (!find?.a) {
    GET_AVATAR_CACHE_MAP.set(userId, false)
    return false
  }

  const avatar = `https://lain.bgm.tv/pic/user/l/000/${find.a}.jpg`
  GET_AVATAR_CACHE_MAP.set(userId, avatar)
  return avatar
}

export function sortObject(object: AnyObject) {
  const newObject = {}
  Object.keys(object)
    .sort((a, b) => asc(a, b))
    .forEach(key => {
      newObject[key] = object[key]
    })
  return newObject
}
