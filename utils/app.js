/*
 * 项目相关
 * @Author: czy0729
 * @Date: 2019-03-23 09:21:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-08 02:48:57
 */
import { WebBrowser } from 'expo'
import { HOST } from '@constants'

/**
 * 根据Bangumi的url判断路由跳转方式
 * @param {*} url
 * @param {*} navigation
 */
export function appNavigate(url = '', navigation) {
  log(url)

  if (url.includes(`${HOST}/subject/`)) {
    // 条目
    navigation.push('Subject', {
      subjectId: url.replace(`${HOST}/subject/`, '')
    })
  } else if (url.includes(`${HOST}/user/`)) {
    // 个人中心
    navigation.push('Zone', {
      userId: url.replace(`${HOST}/user/`, '')
    })
  } else if (
    // 超展开内容
    url.includes('/rakuen/topic/group/') ||
    url.includes('/group/topic/')
  ) {
    navigation.push('Topic', {
      topicId: url.match(/\/(\d+)/)[1]
    })
  } else {
    WebBrowser.openBrowserAsync(url)
  }
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
