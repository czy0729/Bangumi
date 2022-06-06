/*
 * @Author: czy0729
 * @Date: 2019-08-08 11:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-07 06:52:32
 */

/**
 * 匹配头像地址
 *
 * @param str
 */
export function matchAvatar(str = '') {
  try {
    return (
      str.match(/background-image:url\('(.+?)'\)/)?.[1] ||
      '//lain.bgm.tv/pic/user/s/icon.jpg'
    )
  } catch (error) {
    return ''
  }
}

/**
 * 匹配用户Id
 *
 * @eg /user/123
 * @param {*} str
 */
export function matchUserId(str = '') {
  try {
    return str.substring(str.lastIndexOf('/') + 1)
  } catch (error) {
    return ''
  }
}

/**
 * 匹配条目Id
 *
 * @eg /subject/123
 * @param {*} str
 */
export function matchSubjectId(str = '') {
  try {
    return str.substring(str.lastIndexOf('/') + 1)
  } catch (error) {
    return ''
  }
}

/**
 * 匹配图片
 *
 * @eg background-image:url('//lain.bgm.tv/pic/cover/m/4b/92/144482_nII3d.jpg')
 * @param {*} str
 */
export function matchCover(str = '') {
  try {
    if (str === "background-image:url('/img/no_icon_subject.png')") return ''
    return str.substring(22, str.length - 2)
  } catch (error) {
    return ''
  }
}

/**
 * 匹配评分
 *
 * @eg starlight stars8
 * @param {*} str
 */
export function matchStar(str = '') {
  try {
    return str.substring(15)
  } catch (error) {
    return ''
  }
}

/**
 * 匹配字符串中第一个bgm地址
 *
 * @param {*} str
 */
export function matchBgmUrl(str = '', returnAll = false) {
  try {
    const matchs =
      str.match(/https?:\/\/(bangumi\.tv|bgm\.tv|chii\.in)((\w|=|\?|\.|\/|&|-)+)/g) ||
      []
    return returnAll ? matchs : matchs[0] || ''
  } catch (error) {
    return ''
  }
}

/**
 * 从头像地址匹配用户Id
 *
 * @param {*} str
 */
export function matchUserIdFromAvatar(str = '') {
  try {
    if (!str) return 0

    const match = str.match(/\/(\d+).jpg/)
    if (!match) return 0

    return match[1]
  } catch (error) {
    return 0
  }
}

/**
 * 匹配年份
 *
 * @param str
 */
export function matchYear(str = '') {
  try {
    return str.match(/(\d{4})(年|-)/)?.[1]
  } catch (error) {
    return ''
  }
}
