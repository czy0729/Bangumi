/*
 * 项目相关方法
 * @Author: czy0729
 * @Date: 2019-03-23 09:21:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-07 17:29:54
 */

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
      return url || `https://bangumi.tv/subject/${id}`
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
