/*
 * 项目相关
 * @Author: czy0729
 * @Date: 2019-03-23 09:21:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 01:00:09
 */
import * as WebBrowser from 'expo-web-browser'
import bangumiData from 'bangumi-data'
import * as ReactNativeScreens from 'react-native-screens'
import { DEV, HOST, HOST_2, SDK } from '@constants'
import { SUBJECT_CN } from '@constants/cn'
import x from '@constants/18x'
import { t } from './fetch'
import { globalLog, globalWarn } from './dev'

const HOST_IMAGE = '//lain.bgm.tv'

/**
 * 启动
 */
export function bootApp() {
  global.log = globalLog
  global.warn = globalWarn

  /**
   * https://reactnavigation.org/docs/zh-Hans/react-native-screens.html
   */
  if (SDK >= 36) {
    ReactNativeScreens.enableScreens()
  } else {
    ReactNativeScreens.useScreens()
  }

  if (DEV) {
    console.disableYellowBox = true

    // 不想在开发时看见满屏的不能解决的warning
    console.warn = Function.prototype
  } else {
    global.console = {
      ...global.console,
      info: Function.prototype,
      log: Function.prototype,
      warn: Function.prototype,
      debug: Function.prototype,
      error: Function.prototype,
      assert: Function.prototype
    }
  }
}

/**
 * 获取设置
 */
export function getSetting() {
  const systemStore = require('../stores/system').default
  const { setting } = systemStore
  return setting
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
      ? parseInt(subjectId.replace('/subject/', '')) in x
      : parseInt(subjectId) in x
  if (!filter && title) {
    filter = ['乳', '妻', '淫'].some(item => title.includes(item))
  }
  if (DEV && filter) console.log(subjectId, filter)
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
    'ntr'
  ].some(item => _str.includes(item))
}

/**
 * 保存navigation引用
 * @param {*} navigation
 */
let _navigationReference
export function navigationReference(navigation) {
  if (navigation) {
    _navigationReference = navigation
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
  const systemStore = require('../stores/system').default
  if (!systemStore.setting.cnFirst) {
    return jp
  }

  if (cache[jp]) {
    return cache[jp]
  }

  /**
   * 若带id使用本地SUBJECT_CN加速查找
   */
  if (subjectId) {
    const cn = SUBJECT_CN[subjectId]
    if (cn) {
      cache[jp] = cn
      return cn
    }
  }

  /**
   * 没有id则使用jp在bangumi-data里面匹配
   */
  const item = bangumiData.items.find(item => item.title === jp)
  if (item) {
    const cn =
      (item.titleTranslate &&
        item.titleTranslate['zh-Hans'] &&
        item.titleTranslate['zh-Hans'][0]) ||
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
export function keyExtractor(item = {}) {
  return String(item.id)
}

/**
 * 根据Bangumi的url判断路由跳转方式
 * @param {*} url 链接
 * @param {*} navigation
 * @param {*} passParams 传递的参数
 * @param {*} event      { id, data }
 */
export function appNavigate(url = '', navigation, passParams = {}, event = {}) {
  try {
    const { id, data = {} } = event
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

    // 没路由对象或者非本站
    if (!navigation || !_url.includes(HOST)) {
      t(id, {
        to: 'WebBrowser',
        url: _url,
        ...data
      })

      WebBrowser.openBrowserAsync(_url)
      return false
    }

    // 超展开内容 [/rakuen/topic/{topicId}]
    if (_url.includes('/rakuen/topic/')) {
      const topicId = _url.replace(`${HOST}/rakuen/topic/`, '')
      t(id, {
        to: 'Topic',
        topicId,
        ...data
      })

      navigation.push('Topic', {
        topicId,
        _url,
        ...passParams
      })
      return true
    }

    if (_url.includes('/group/topic/')) {
      const topicId = `group/${_url.replace(`${HOST}/group/topic/`, '')}`
      t(id, {
        to: 'Topic',
        topicId,
        ...data
      })

      navigation.push('Topic', {
        topicId,
        _url,
        ...passParams
      })
      return true
    }

    // 条目 > 讨论版
    if (_url.includes('/subject/topic/')) {
      const topicId = `subject/${_url.replace(`${HOST}/subject/topic/`, '')}`
      t(id, {
        to: 'Topic',
        topicId,
        ...data
      })

      navigation.push('Topic', {
        topicId,
        _url,
        ...passParams
      })
      return true
    }

    // 本集讨论 [/ep/\d+]
    // 结构与超展开内容类似, 跳转到超展开内容
    if (_url.includes('/ep/')) {
      const topicId = _url.replace(`${HOST}/`, '').replace('subject/', '')
      t(id, {
        to: 'Topic',
        topicId,
        ...data
      })

      navigation.push('Topic', {
        topicId,
        _url,
        ...passParams
      })
      return true
    }

    // 条目 [/subject/{subjectId}]
    if (_url.includes('/subject/')) {
      const subjectId = _url.replace(`${HOST}/subject/`, '')
      t(id, {
        to: 'Subject',
        subjectId,
        ...data
      })

      navigation.push('Subject', {
        subjectId,
        _url,
        ...passParams
      })
      return true
    }

    // 个人中心 [/user/{userId}]
    // 排除时间线回复 [user/{userId}/timeline/status/{timelineId}]
    if (_url.includes('/user/') && _url.split('/').length <= 6) {
      const userId = _url.replace(`${HOST}/user/`, '')
      t(id, {
        to: 'Zone',
        userId,
        ...data
      })

      navigation.push('Zone', {
        userId,
        _url,
        ...passParams
      })
      return true
    }

    // 人物 [/character/\d+, /person/\d+]
    if (_url.includes('/character/') || _url.includes('/person/')) {
      const monoId = _url.replace(`${HOST}/`, '')
      t(id, {
        to: 'Mono',
        monoId,
        ...data
      })

      navigation.push('Mono', {
        monoId,
        _url,
        ...passParams
      })
      return true
    }

    // 小组
    if (_url.includes('/group/')) {
      const groupId = _url.replace(`${HOST}/group/`, '')
      t(id, {
        to: 'Group',
        groupId,
        ...data
      })

      navigation.push('Group', {
        groupId,
        _url,
        ...passParams
      })
      return true
    }

    // 标签
    if (_url.includes('/tag/')) {
      t(id, {
        to: 'Tag',
        type: params[3],
        tag: decodeURIComponent(params[5]),
        airtime: params[7],
        ...data
      })

      // ['https:', ', 'bangumi.tv', 'anime', 'tag', '剧场版', 'airtime', '2018']
      const params = _url.split('/')
      navigation.push('Tag', {
        type: params[3],
        tag: decodeURIComponent(params[5]),
        airtime: params[7],
        ...passParams
      })
      return true
    }

    // 吐槽
    if (_url.includes('/timeline/status/')) {
      const _id = _url.split('/timeline/status/')[1]
      t(id, {
        to: 'Say',
        id: _id,
        ...data
      })

      navigation.push('Say', {
        id: _id,
        ...passParams
      })
      return true
    }

    // 目录
    if (_url.includes('/index/')) {
      const _id = _url.split('/index/')[1]
      t(id, {
        to: 'CatalogDetail',
        catalogId: _id,
        ...data
      })

      navigation.push('CatalogDetail', {
        catalogId: _id,
        ...passParams
      })
      return true
    }

    // 日志
    if (_url.includes('/blog/')) {
      const _id = _url.split('/blog/')[1]
      t(id, {
        to: 'Blog',
        blogId: _id,
        ...data
      })

      navigation.push('Blog', {
        blogId: _id,
        ...passParams
      })
      return true
    }

    t(id, {
      to: 'WebBrowser',
      url: _url,
      ...data
    })

    WebBrowser.openBrowserAsync(_url)
    return false
  } catch (error) {
    warn('utils/app', 'appNavigate', error)
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
    case 'bilibili':
      return url || `https://www.bilibili.com/bangumi/media/md${id}`
    case 'iqiyi':
      return url || `https://www.iqiyi.com/${id}.html`
    case 'pptv':
      return url || `http://v.pptv.com/page/${id}.html`
    case 'youku':
      return url || `https://list.youku.com/show/id_z${id}.html`
    case 'acfun':
      return url || `http://www.acfun.cn/v/ab${id}`
    case 'nicovideo':
      return url || `https://ch.nicovideo.jp/${id}`
    case 'qq':
      return url || `https://v.qq.com/detail/${id}.html`
    case 'mgtv':
      return url || `https://www.mgtv.com/h/${id}.html`
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
export function getCoverMedium(src = '', mini = false) {
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
  const _time = new Date(time)
  const now = new Date()
  let times = (_time - now) / 1000
  let day = 0
  let hour = 0
  if (times > 0) {
    day = Math.floor(times / (60 * 60 * 24))
    hour = Math.floor(times / (60 * 60)) - day * 24
    if (day > 0) {
      return `${day}天${hour}小时`
    }
    if (hour > 1) {
      return `剩余${hour}小时`
    }
    return '即将结束'
  }

  times = Math.abs(times)
  day = Math.floor(times / (60 * 60 * 24))
  hour = Math.floor(times / (60 * 60))
  const miniute = Math.floor(times / 60)
  const second = Math.floor(times)
  if (miniute < 1) {
    return `${second}s ago`
  }
  if (miniute < 60) {
    return `${miniute}m ago`
  }
  if (hour < 24) {
    return `${hour}h ago`
  }
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
    // eslint-disable-next-line no-restricted-properties
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
