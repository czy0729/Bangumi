/*
 * 项目相关
 * @Author: czy0729
 * @Date: 2019-03-23 09:21:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-21 14:12:15
 */
import { WebBrowser } from 'expo'
import { HOST, HOST_NAME } from '@constants'

/**
 * 根据Bangumi的url判断路由跳转方式
 * @param {*} url
 * @param {*} navigation
 */
export function appNavigate(url = '', navigation) {
  let _url = url

  // 补全协议
  if (!_url.includes('http://') && !_url.includes('https://')) {
    _url = `${HOST}${_url}`
  }

  // HOST纠正为https
  if (_url.includes(`http://${HOST_NAME}`)) {
    _url = _url.replace(`http://${HOST_NAME}`, HOST)
  }

  log(_url)

  // 没路由对象或者非本站
  if (!navigation || !_url.includes(HOST)) {
    WebBrowser.openBrowserAsync(_url)
    return
  }

  // 条目 > 讨论版
  if (_url.includes('/subject/topic/')) {
    const id = _url.replace(`${HOST}/subject/topic/`, '')
    navigation.push('Topic', {
      topicId: `subject/${id}`,
      _url
    })
    return
  }

  // 条目 [/subject/{subjectId}]
  if (_url.includes('/subject/')) {
    navigation.push('Subject', {
      subjectId: _url.replace(`${HOST}/subject/`, ''),
      _url
    })
    return
  }

  // 个人中心 [/user/{userId}]
  if (_url.includes('/user/')) {
    navigation.push('Zone', {
      userId: _url.replace(`${HOST}/user/`, ''),
      _url
    })
    return
  }

  // 超展开内容 [/rakuen/topic/{topicId}]
  if (_url.includes('/rakuen/topic/')) {
    navigation.push('Topic', {
      topicId: _url.replace(`${HOST}/rakuen/topic/`, ''),
      _url
    })
    return
  }

  if (_url.includes('/group/topic/')) {
    navigation.push('Topic', {
      topicId: `group/${_url.replace(`${HOST}/group/topic/`, '')}`,
      _url
    })
    return
  }

  // 本集讨论 [/ep/\d+]
  // 结构与超展开内容类似, 跳转到超展开内容
  if (_url.includes('/ep/')) {
    navigation.push('Topic', {
      topicId: _url.replace(`${HOST}/`, ''),
      _url
    })
    return
  }

  // 人物 [/character/\d+, /person/\d+]
  if (_url.includes('/character/') || _url.includes('/person/')) {
    navigation.push('Mono', {
      monoId: _url.replace(`${HOST}/`, ''),
      _url
    })
    return
  }

  WebBrowser.openBrowserAsync(_url)
}

/**
 * 获取颜色type
 * @param {*} label
 */
export function getType(label) {
  const typeMap = {
    想看: 'main',
    看过: 'warning',
    在看: 'primary',
    在读: 'primary',
    搁置: 'wait',
    抛弃: 'disabled'
  }
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
      return url || `https://bangumi.bilibili.com/anime/${id}`
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
