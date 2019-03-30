/*
 * 项目相关方法
 * @Author: czy0729
 * @Date: 2019-03-23 09:21:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-29 06:58:12
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
