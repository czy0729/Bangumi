/*
 * @Author: czy0729
 * @Date: 2019-08-08 11:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 20:31:53
 */
import { UserId } from '@types'

/** 匹配头像地址 */
export function matchAvatar(str: string = ''): string {
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
 * 匹配用户 Id
 * @eg /user/123
 */
export function matchUserId(str: string = ''): string {
  try {
    return str.substring(str.lastIndexOf('/') + 1)
  } catch (error) {
    return ''
  }
}

/**
 * 匹配条目 Id
 * @eg /subject/123
 */
export function matchSubjectId(str: string = ''): string {
  try {
    return str.substring(str.lastIndexOf('/') + 1)
  } catch (error) {
    return ''
  }
}

/**
 * 匹配图片
 * @eg background-image:url('//lain.bgm.tv/pic/cover/m/4b/92/144482_nII3d.jpg')
 */
export function matchCover(str: string = ''): string {
  try {
    if (str === "background-image:url('/img/no_icon_subject.png')") return ''
    return str.substring(22, str.length - 2)
  } catch (error) {
    return ''
  }
}

/**
 * 匹配评分
 * @eg starlight stars8
 */
export function matchStar(str: string = ''): string {
  try {
    return str.substring(15)
  } catch (error) {
    return ''
  }
}

/** 匹配字符串中第一个 bgm 地址 */
export function matchBgmUrl(str: string = '', returnAll: boolean = false) {
  try {
    const matchs =
      str.match(/https?:\/\/(bangumi\.tv|bgm\.tv|chii\.in)((\w|=|\?|\.|\/|&|-)+)/g) ||
      []
    return returnAll ? matchs : matchs[0] || ''
  } catch (error) {
    return []
  }
}

/** 从头像地址匹配用户 Id */
export function matchUserIdFromAvatar(str: string = ''): UserId {
  try {
    if (!str) return 0

    const match = str.match(/\/(\d+).jpg/)
    if (!match) return 0

    return match[1]
  } catch (error) {
    return 0
  }
}

/** 匹配年份 */
export function matchYear(str: string = ''): string {
  try {
    return str.match(/(\d{4})(年|-)/)?.[1]
  } catch (error) {
    return ''
  }
}
