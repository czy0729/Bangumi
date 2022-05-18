/*
 * 项目相关
 * @Author: czy0729
 * @Date: 2019-03-23 09:21:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-18 11:39:32
 */
import * as WebBrowser from 'expo-web-browser'
import { HTMLDecode } from '@utils/html'
import { DEV, HOST, HOST_2, EVENT, IMG_DEFAULT } from '@constants'
import {
  initHashSubjectOTA,
  initHashAvatarOTA,
  CDN_OSS_SUBJECT,
  CDN_OSS_MAGMA_POSTER
} from '@constants/cdn'
import cnData from '@constants/json/cn.json'
import x18data from '@constants/json/18x.json'
import bangumiData from '@constants/json/thirdParty/bangumiData.min.json'
import { Navigation, Source } from '@types'
import { t } from './fetch'
import { getSystemStoreAsync } from './async'
import { rerender, globalLog, globalWarn } from './dev'

const HOST_IMAGE = '//lain.bgm.tv'

/**
 * 启动
 */
export function bootApp() {
  global.log = globalLog
  global.warn = globalWarn
  global.rerender = rerender

  // @ts-ignore
  global.console.warn = Function.prototype

  // @ts-ignore
  global.console.error = Function.prototype

  if (!DEV) {
    // @ts-ignore
    global.console.info = Function.prototype

    // @ts-ignore
    global.console.log = Function.prototype

    // @ts-ignore
    global.console.debug = Function.prototype

    // @ts-ignore
    global.console.assert = Function.prototype
  }

  initHashSubjectOTA()
  initHashAvatarOTA()
}

/**
 * 获取设置
 */
export function getSetting() {
  // @ts-ignore
  return getSystemStoreAsync().setting
}

/**
 * app内使用时间因子作为随机数, 规避Hermes引擎Array.sort的卡死bug
 * @param arr {Array}
 * @param key {String}
 * @returns Array
 */
const _a = Number(String(new Date().getSeconds()).slice(0, 1))
export function appRandom(arr = [], key = '') {
  const data = []
  arr.forEach(item => {
    if (item[key]) {
      const _b = Number(String(item[key]).slice(0, 1))
      if (_a >= _b) {
        data.unshift(item)
      } else {
        data.push(item)
      }
    }
  })
  return data
}

/**
 * 适配系统中文优先返回合适字符串
 */
export function cnjp(cn, jp) {
  const { cnFirst } = getSetting()
  return HTMLDecode(cnFirst ? cn || jp : jp || cn)
}

function isNull(value) {
  return value === undefined || value === ''
}

function getSafeValue(key, onAir, onAirUser) {
  const userValue = onAirUser?.[key]
  return isNull(userValue) ? onAir?.[key] : userValue
}

/**
 * 云端onAir和自定义onAir组合判断
 */
export function getOnAir(onAir, onAirUser) {
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

/**
 * 统一逻辑, 获取放送日函数
 * @param {*} item onAirItem
 */
export function getWeekDay(item: { weekDayCN?: any; weekDayJP?: any } = {}) {
  const weekDay =
    item?.weekDayCN == 0 ? item?.weekDayCN : item?.weekDayCN || item?.weekDayJP
  return weekDay === '' ? '' : weekDay
}

/**
 * 是否敏感条目
 * @param {*} subjectId
 * @param {*} title     辅助检测, 有关键字则都认为是18x
 */
export function x18(subjectId, title) {
  if (!subjectId) return false
  let filter =
    typeof subjectId === 'string'
      ? parseInt(subjectId.replace('/subject/', '')) in x18data
      : parseInt(subjectId) in x18data
  if (!filter && title) filter = ['乳', '妻', '淫'].some(item => title.includes(item))
  return filter
}

/**
 * 猜测是否敏感字符串
 */
export function x18s(str) {
  const _str = String(str).toLowerCase()
  return [
    '里',
    '成',
    '18',
    'gal',
    'bl',
    '禁',
    '拔',
    '淫',
    '兵',
    '肉',
    '伪',
    'ntr',
    '黄油'
  ].some(item => _str.includes(item))
}

/**
 * 保存navigation引用
 * @param {*} navigation
 */
let _navigationReference: Navigation | undefined
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
const cache = {}
export function findSubjectCn(jp = '', subjectId) {
  if (!getSetting()?.cnFirst) {
    return jp
  }

  if (cache[jp]) {
    return cache[jp]
  }

  /**
   * [已废弃] 若带id使用本地SUBJECT_CN加速查找
   */
  if (subjectId) {
    const cn = cnData[subjectId]
    if (cn) {
      cache[jp] = cn
      return cn
    }
  }

  /**
   * 没有id则使用jp在bangumi-data里面匹配
   */
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
    cache[jp] = cn
    return cn
  }

  cache[jp] = jp
  return jp
}

/**
 * 修正和缩略ago时间
 * @param {*} time
 */
const date = new Date()
const y = date.getFullYear()
export function correctAgo(time = '') {
  let _time = time.replace('...', '')
  if (_time.indexOf(' ago') === -1) {
    _time = _time.replace('ago', ' ago')
  }
  return _time.includes('-')
    ? _time.replace(`${y}-`, '')
    : _time
        .replace('d', '天')
        .replace('h', '时')
        .replace('m', '分')
        .replace('s', '秒')
        .replace(' ago', '前')
        .replace(/ /g, '')
}

/**
 * keyExtractor
 * @param {*} item
 */
export function keyExtractor(item = { id: '' }) {
  return String(item.id)
}

/**
 * 修复链接
 * @param {*} url
 */
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

/**
 * 判断是否bgm的链接, 若是返回页面信息, 否则返回false
 * @param {*} url
 */
export function matchBgmLink(url = '') {
  try {
    const _url = fixedBgmUrl(url)

    // 自定义的 App 内协议
    if (_url.indexOf('https://App/') === 0) {
      const [, , , route = '', params = ''] = _url.split('/')
      if (route && params) {
        const [key, value] = params.split(':')
        return {
          route,
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

/**
 * 自动判断封面CDN地址
 * @param src
 * @param noDefault
 */
const noImg = ['//lain.bgm.tv/pic/cover/c/', '/img/no_icon_subject.png']
export function matchCoverUrl(src: string, noDefault?: boolean, prefix?: string) {
  const { cdn, cdnOrigin } = getSetting()
  const fallback = noDefault ? '' : IMG_DEFAULT

  // 有些情况图片地址分析错误, 排除掉
  if (noImg.includes(src)) return IMG_DEFAULT || fallback

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
 * 根据Bangumi的url判断路由跳转方式
 * @param {*} url 链接
 * @param {*} navigation
 * @param {*} passParams 传递的参数
 * @param {*} event      { id, data }
 */
export function appNavigate(
  url = '',
  navigation,
  passParams = {},
  event = EVENT,
  openWebBrowser = true
) {
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

/**
 * 获取颜色type
 * @param {*} label
 */
const typeMap = {
  想看: 'main',
  想玩: 'main',
  想读: 'main',
  想听: 'main',
  看过: 'warning',
  玩过: 'warning',
  读过: 'warning',
  听过: 'warning',
  在看: 'primary',
  在玩: 'primary',
  在读: 'primary',
  在听: 'primary',
  搁置: 'wait',
  抛弃: 'disabled'
}
export function getType(label) {
  return typeMap[label] || 'plain'
}

/**
 * 获取评分中文
 * @param {*} score
 */
export function getRating(score) {
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
 * @param {*} item bangumiInfo数据项
 */
export function getBangumiUrl(item) {
  if (!item) {
    return ''
  }

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

/**
 * 从cookies字符串中分析cookie值
 * @param {*} cookies
 * @param {*} name
 */
export function getCookie(cookies = '', name) {
  const list = cookies.split('; ')
  for (let i = 0; i < list.length; i += 1) {
    const arr = list[i].split('=')
    if (arr[0] == name) return decodeURIComponent(arr[1])
  }
  return ''
}

/**
 * bgm图片质量 g < s < m < c < l, 只用s, m(c), l
 * CDN开启下 <Avatar>组件会忽略s, 把s转成m(c)
 */
/**
 * 获取低质量bgm图片
 * @param {*} src
 */
export function getCoverSmall(src = '') {
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

/**
 * 获取中质量bgm图片
 * @param {*} src
 */
export function getCoverMedium(src: any = '', mini: boolean = false) {
  /**
   * 角色图片因为是对头部划图的, 不要处理
   * 用户图床也没有其他质量
   */
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

/**
 * 获取高质量bgm图片
 * @param {*} src
 */
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

/**
 * 小圣杯时间格式化
 * @param {*} time
 */
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

/**
 * 小圣杯计算ICO等级
 * @param {*} ico
 */
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

/**
 * 小圣杯OSS修正
 * @param {*} str
 */
export function tinygrailOSS(str, w = 150) {
  if (typeof str !== 'string' || str.includes('!w')) {
    return str
  }

  // https://tinygrail.oss-cn-hangzhou.aliyuncs.com
  // https://tinygrail.mange.cn/cover/1e5f9be0dfe62372a69e9a4f04acd0e1.jpg!w150
  if (str.includes('aliyuncs.com') || str.includes('tinygrail.mange.cn')) {
    return `${str}!w${w}`
  }

  return str
}

/**
 * 修复时间
 * 2019-10-04T13:34:03.4243768+08:00 => 2019-10-04 13:34:03
 * @param {*} time
 */
export function tinygrailFixedTime(time) {
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
const sitesMap = {
  a: 'acfun',
  b: 'bilibili',
  s: 'sohu',
  y: 'youku',
  q: 'qq',
  i: 'iqiyi',
  l: 'letv',
  p: 'pptv',
  m: 'mgtv',
  ni: 'nicovideo',
  n: 'netflix'
}
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
      site: sitesMap[s],
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
