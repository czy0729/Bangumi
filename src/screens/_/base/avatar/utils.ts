/*
 * @Author: czy0729
 * @Date: 2023-05-14 07:14:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-20 21:46:17
 */
import { _, systemStore, usersStore, userStore } from '@stores'
import { getCoverMedium, getTimestamp } from '@utils'
import { t } from '@utils/fetch'
import {
  AVATAR_DEFAULT,
  HOST_CDN_AVATAR,
  IMG_DEFAULT,
  URL_DEFAULT_AVATAR,
  URL_DEFAULT_MONO
} from '@constants'
import { Props } from './types'

/** 判断是否自己的头像, 一周才变化一次 */
const TS = Math.floor(getTimestamp() / 604800)

/** 静态资源域名 */
const HOST_IMAGE = '//lain.bgm.tv'

/** 大质量头像 */
export const USER_LARGE = `${HOST_IMAGE}/pic/user/l/`

/**
 * 判断是否自己的头像, 若是不走 CDN, 保证最新
 * 注意头像后面 ?r=xxx 的参数不要去掉, 因头像地址每个人都唯一, 需要防止本地缓存
 */
function checkSelf(src: any) {
  const medium = getCoverMedium(src, true)

  let value = src
  if (typeof medium === 'string') {
    const { avatar } = userStore.usersInfo()
    if (avatar?.medium) {
      const a = medium.split('?')[0].split('/m/')
      const b = getCoverMedium(avatar.medium, true).split('?')[0].split('/m/')

      // 为自己
      if (a[1] && b[1] && a[1] === b[1]) {
        if (medium.includes(URL_DEFAULT_AVATAR)) {
          value = `${medium}?r=${TS}`
        } else {
          value = usersStore.customAvatar || `${medium}?r=${TS}`
        }
      }
    }
  }

  return value
}

/** 判断是否空, 若是使用默认值 */
function checkNull(src: any) {
  return getCoverMedium(src, true)
}

/** 判断是否为默认头像, 若是直接使用本地的默认头像, 避免不必要的网络请求 */
function checkDefault(src: any) {
  if (typeof src === 'string') {
    if (src.includes(URL_DEFAULT_AVATAR)) return AVATAR_DEFAULT
    if (src.includes(URL_DEFAULT_MONO)) return IMG_DEFAULT
  }
  return src
}

/** 处理头像地址 */
export function getAvatar(src: any) {
  let avatar: any

  avatar = checkSelf(src)
  if (!avatar) avatar = checkNull(src)
  avatar = checkDefault(avatar)

  return avatar
}

/** 判断是否使用 CDN */
export function getCDNAvatar(
  src: any,
  prefix: 'bgm_poster_100' | 'bgm_poster_200' = 'bgm_poster_100'
) {
  if (!systemStore.setting.cdnAvatarV2 || typeof src !== 'string' || !src.includes(HOST_IMAGE)) {
    return src
  }

  let match = src.match(/(\d+)\.jpg\?r=(\d+)/)
  if (!match) match = src.match(/(\d+)\.jpg/)
  if (!match) return src

  const num1 = parseInt(match[1])
  const num2 = parseInt(match[2]) || 0
  if (!num1) return src

  return `${HOST_CDN_AVATAR}/pic/user/${num1}/${num2}.jpg${prefix ? `/${prefix}` : ''}`
}

/** 计算圆角参数值 */
export function getRadius(radius: Props['radius'], round: Props['round'], size: Props['size']) {
  // 默认带圆角, 若大小的一半比设置的圆角还小, 为避免方形头像变成原型, 则覆盖成sm
  let _radius: boolean | number = true
  if (radius) {
    _radius = radius
  } else if (round || systemStore.setting.avatarRound) {
    _radius = size / 2
  } else if (size / 2 <= systemStore.coverRadius) {
    _radius = _.radiusSm
  }

  return _radius
}

/** 计算点击回调函数 */
export function getOnPress(
  onPress: Props['onPress'],
  data: {
    navigation?: Props['navigation']
    userId?: Props['userId']
    event?: Props['event']
    src?: Props['src']
    name?: Props['name']
    params?: Props['params']
  }
) {
  const { navigation, userId, event, src, name, params } = data || {}
  let value: any

  if (onPress || (navigation && userId)) {
    value = () => {
      if (onPress) {
        onPress()
        return
      }

      const { id, data = {} } = event
      t(id, {
        to: 'Zone',
        userId,
        ...data
      })

      navigation.push('Zone', {
        userId,
        _id: userId,
        _image: src as string,
        _name: name,
        ...params
      })
    }
  }
  return value
}

/** 强制使用 /l/ */
export function fixedLarge(src: any) {
  return typeof src !== 'string'
    ? src
    : src.replace(/\/\/lain.bgm.tv\/pic\/user\/(m|s)\//g, USER_LARGE)
}

/**
 * 网页端新出的图片规则, 需要处理一下
 * 如果地址有 number x number 是必须使用 /l/ 的
 */
export function fixedSize(src: any) {
  return typeof src !== 'string'
    ? src
    : src.replace(/\/r\/(\d+)x(\d+)\/pic\/cover\/(s|c|m)\//g, '/r/$1x$2/pic/cover/l/')
}

/** 网页端新出的图片规则, 地址后接 hd=1 开启高清头像 */
export function fixedHD(src: any) {
  if (
    typeof src !== 'string' ||
    !src.includes(HOST_IMAGE) ||
    src.includes('hd=') ||
    !src.includes('r=')
  ) {
    return src
  }

  return src.includes('?') ? `${src}&hd=1` : `${src}?hd=1`
}
