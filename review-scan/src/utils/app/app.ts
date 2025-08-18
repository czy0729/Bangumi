/*
 * @Author: czy0729
 * @Date: 2023-12-23 07:19:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-07 06:32:26
 */
import { Alert, BackHandler } from 'react-native'
import { ON_AIR } from '@stores/calendar/onair'
import { EVENT, HOST, IOS, URL_PRIVACY } from '@constants/constants'
import { WEB } from '@constants/device'
import { FROZEN_FN } from '@constants/init'
import { GROUP_THUMB_MAP } from '@assets/images'
import { DEV } from '@src/config'
import { AnyObject, EventType, Navigation, SubjectId } from '@types'
import { s2tAsync } from '../async'
import { globalLog, globalWarn, rerender } from '../dev'
import { t } from '../fetch'
import { getStorage, setStorage } from '../storage'
import { open } from '../utils'
import { fixedBgmUrl, matchBgmLink } from './data-source'
import { PRIVACY_STATE, RANDOM_FACTOR } from './ds'

/** 初始化全局方法和控制台重写 */
export function bootApp() {
  // 需要挂载到 global 的方法
  const GLOBAL_METHODS = {
    log: globalLog,
    warn: globalWarn,
    rerender: rerender
  }

  // 始终重写的 console 方法（生产+开发环境）
  const ALWAYS_OVERRIDE_CONSOLE = ['warn', 'error']

  // 仅在生产环境重写的 console 方法
  const PROD_ONLY_OVERRIDE_CONSOLE = ['info', 'log', 'debug', 'assert']

  // 冻结函数
  const FROZEN_FUNCTION = FROZEN_FN

  for (const [key, value] of Object.entries(GLOBAL_METHODS)) {
    global[key] = value
  }

  const consoleMethodsToOverride = [...ALWAYS_OVERRIDE_CONSOLE]
  if (!DEV) {
    consoleMethodsToOverride.push(...PROD_ONLY_OVERRIDE_CONSOLE)
  }

  consoleMethodsToOverride.forEach(method => {
    global.console[method] = FROZEN_FUNCTION
  })
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

  if (WEB) return 28

  return 8
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

let _navigationReference: Navigation | undefined

/** 保存 navigation 引用 */
export function navigationReference(navigation?: Navigation | undefined) {
  if (WEB) {
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

/** keyExtractor */
export function keyExtractor(item: AnyObject = { id: '' }) {
  return String(item.id)
}

/** 从修改过的用户头像地址中算出原始用户 id */
export function getUserIdFromAvatar(src: string) {
  try {
    return Number(src.match(/\/(\d+)\.jpg/)?.[1]) || 0
  } catch (error) {
    return 0
  }
}

/** 获取本地每日放送数据 */
export function getOnAirItem(subjectId: SubjectId): {
  weekDayCN: number
  timeCN: string
  type?: string
  tag?: string
  origin?: string
} {
  return ON_AIR[subjectId] || {}
}

/**
 * 根据 Bangumi 的 url 判断路由跳转方式
 * @param {*} url            链接
 * @param {*} navigation     路由对象
 * @param {*} passParams     传递的参数
 * @param {*} event          追踪事件
 * @param {*} openWebBrowser 没路由对象或者非本站是否使用浏览器尝试打开
 */
export function appNavigate(
  url: string = '',
  navigation?: Navigation,
  passParams: AnyObject = {},
  event: EventType = EVENT,
  openWebBrowser: boolean = true
): boolean {
  try {
    const { id, data = {} } = event
    const value = fixedBgmUrl(url)
    const result = matchBgmLink(value)

    // 没路由对象或者非本站
    if (!navigation || !value.includes(HOST) || !result) {
      if (openWebBrowser) {
        t(id, {
          to: 'WebBrowser',
          url: value,
          ...data
        })

        open(value)
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
        _url: value,
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

/** 小圣杯时间格式化 */
export function formatTime(time: string | number | Date) {
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

/**
 * 计算小圣杯 ICO 等级及相关数据
 * @param ico - ICO 数据对象
 * @param ico.users - 当前用户数
 * @param ico.total - 当前总资金
 * @param ico.Users - 备用用户数字段(兼容不同命名)
 * @returns ICO 等级信息对象
 */
export function caculateICO(ico: { users?: number; total?: number; Users?: number }) {
  // 初始化基础值
  let level = 0

  const initialPrice = 10
  let price = initialPrice

  const baseAmount = 10000
  let amount = 0

  const initialThreshold = 600000
  let nextThreshold = initialThreshold

  const baseUserCount = 15
  let nextUser = baseUserCount

  // 计算基于用户数的等级
  const currentUserCount = ico.users ?? 0
  const userLevel = Math.max(0, Math.floor((currentUserCount - 10) / 5))

  // 计算基于资金的等级
  const currentTotal = ico.total ?? 0
  while (currentTotal >= nextThreshold && level < userLevel) {
    level += 1
    nextThreshold += Math.pow(level + 1, 2) * 100000
  }

  // 计算最终值
  amount = baseAmount + (level - 1) * 7500
  price = (currentTotal - 500000) / amount
  nextUser = (level + 1) * 5 + 10

  return {
    level,
    next: nextThreshold,
    price,
    amount,
    nextUser,
    users: nextUser - (ico.Users ?? ico.users ?? 0)
  }
}

/**
 * 计算当前 ICO 数据在 step 步后的等级数据
 * @param ico 当前 ICO 数据
 * @param step 要计算的步数 (1=下一级，2=下两级，默认1)
 */
export function calculateFutureICO(
  ico: { users?: any; total?: number; Users?: number },
  step: number = 1
) {
  // 计算当前等级
  const current = caculateICO(ico)

  // 模拟升级到目标等级
  const targetLevel = current.level + step
  let targetNext = current.next
  const targetAmount = 10000 + (targetLevel - 1) * 7500

  // 计算中间所有等级的next阈值
  for (let l = current.level + 1; l <= targetLevel; l++) {
    targetNext += Math.pow(l + 1, 2) * 100000
  }

  // 计算目标等级的数据
  return {
    level: targetLevel,
    next: targetNext,
    price: (ico.total - 500000) / targetAmount,
    amount: targetAmount,
    nextUser: (targetLevel + 1) * 5 + 10,
    users: (targetLevel + 1) * 5 + 10 - (ico.Users ?? ico.users ?? 0)
  }
}

/** 计算当前角色距离升级的数据 */
export function calculateFutureLevel(level: number = 1, total: number = 0) {
  return Math.floor(!level || level <= 1 ? 7500 : Math.pow(1.3, level) * 7500) - total
}

/**
 * 小圣杯 OSS 修正
 *  - https://lain.bgm.tv/pic/crt/g/b7/fe/88670_crt_Zv4H2.jpg -> https://lain.bgm.tv/{r/200|400/}pic/crt/l/b7/fe/88670_crt_Zv4H2.jpg
 *  - https://tinygrail.oss-cn-hangzhou.aliyuncs.com -> https://tinygrail.mange.cn/cover/1e5f9be0dfe62372a69e9a4f04acd0e1.jpg!w150
 * */
export function tinygrailOSS(str: string, w: 120 | 150 | 480 = 120) {
  if (typeof str !== 'string') return str

  if (str.includes('lain.bgm.tv')) {
    let cover = str
      .replace(/lain.bgm.tv\/pic\/crt\/(g|s|c|m)\//, `lain.bgm.tv/pic/crt/l/`)
      .replace(/r\/\d+\//, '')
    cover = cover.includes('/user/')
      ? cover
      : w === 120
      ? cover.replace('/l/', '/g/')
      : cover.replace('pic/crt/', `r/200/pic/crt/`)
    if (cover.startsWith('//')) cover = `https:${cover}`
    return cover
  }

  if (str.includes('aliyuncs.com') || str.includes('tinygrail.mange.cn')) {
    return `${str
      .replace('tinygrail.oss-cn-hangzhou.aliyuncs.com', 'tinygrail.mange.cn')
      .replace(/!w\d+/g, '')}!w${w}`
  }

  return str
}

/** 修复时间 (2019-10-04T13:34:03.4243768+08:00 => 2019-10-04 13:34:03) */
export function tinygrailFixedTime(time: any) {
  return (time || '').replace('T', ' ').split('+')[0].split('.')[0]
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

export function getGroupThumbStatic(src: string) {
  if (typeof src !== 'string') return src

  return (
    GROUP_THUMB_MAP[
      src
        .split('?')[0]
        .replace('https:', '')
        .replace(/\/g\/|\/m\/|\/c\/|\/l\//, '/s/')
    ] || src
  )
}

const FORMAT_PLAYTIME_REPLACEMENT_MAP = {
  'very ': '超',
  long: '长',
  medium: '中',
  short: '短',
  '&lt;': '小于',
  hours: '时',
  h: '时',
  m: '分'
} as const

export function formatPlaytime(time: string) {
  if (!time || typeof time !== 'string') return ''

  let formattedTime = time.toLowerCase()
  for (const [key, value] of Object.entries(FORMAT_PLAYTIME_REPLACEMENT_MAP)) {
    formattedTime = formattedTime.replace(key, value)
  }

  return formattedTime
}

export function fixedSubjectInfo(info: string) {
  if (!info || typeof info !== 'string') return ''

  return info.replace(/<li[^>]*>/g, '<li>').replace(/<span[^>]*>/g, '<span>')
}
