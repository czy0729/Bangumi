/*
 * @Author: czy0729
 * @Date: 2019-08-08 11:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-25 08:50:47
 */

/** 匹配头像地址 */
export function matchAvatar(str = '') {
  return (
    str.match(/background-image:url\('(.+?)'\)/)?.[1] ||
    '//lain.bgm.tv/pic/user/s/icon.jpg'
  )
}

/**
 * 匹配用户Id
 *
 * @eg /user/123
 * @param {*} str
 */
export function matchUserId(str = '') {
  return str.substring(str.lastIndexOf('/') + 1)
}

/**
 * 匹配条目Id
 *
 * @eg /subject/123
 * @param {*} str
 */
export function matchSubjectId(str = '') {
  return str.substring(str.lastIndexOf('/') + 1)
}

/**
 * 匹配图片
 *
 * @eg background-image:url('//lain.bgm.tv/pic/cover/m/4b/92/144482_nII3d.jpg')
 * @param {*} str
 */
export function matchCover(str = '') {
  if (str === "background-image:url('/img/no_icon_subject.png')") return ''
  return str.substring(22, str.length - 2)
}

/**
 * 匹配评分
 *
 * @eg starlight stars8
 * @param {*} str
 */
export function matchStar(str = '') {
  return str.substring(15)
}

/**
 * 匹配字符串中第一个bgm地址
 *
 * @param {*} str
 */
export function matchBgmUrl(str = '', returnAll = false) {
  const matchs =
    str.match(/https?:\/\/(bangumi\.tv|bgm\.tv|chii\.in)((\w|=|\?|\.|\/|&|-)+)/g) || []
  return returnAll ? matchs : matchs[0] || ''
}

/**
 * 从头像地址匹配用户Id
 *
 * @param {*} str
 */
export function matchUserIdFromAvatar(str = '') {
  if (!str) return 0

  const match = str.match(/\/(\d+).jpg/)
  if (!match) return 0

  return match[1]
}
