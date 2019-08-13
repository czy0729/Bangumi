/*
 * @Author: czy0729
 * @Date: 2019-08-08 11:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-13 00:51:03
 */

/**
 * 匹配头像地址
 * https://jsperf.com/czy0729-001
 * @param {*} str
 */
export function matchAvatar(str = '') {
  return str.substring(22, str.indexOf('?'))
}

/**
 * 匹配用户Id
 * https://jsperf.com/czy0729-002
 * /user/123
 * @param {*} str
 */
export function matchUserId(str = '') {
  return str.substring(str.lastIndexOf('/') + 1)
}

/**
 * 匹配条目Id
 * /subject/123
 * @param {*} str
 */
export function matchSubjectId(str = '') {
  return str.substring(str.lastIndexOf('/') + 1)
}

/**
 * 匹配图片
 * background-image:url('//lain.bgm.tv/pic/cover/m/4b/92/144482_nII3d.jpg')
 * @param {*} str
 */
export function matchCover(str = '') {
  if (str === 'background-image:url(\'/img/no_icon_subject.png\')') {
    return ''
  }
  return str.substring(22, str.length - 2)
}
