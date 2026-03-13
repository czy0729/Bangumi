/*
 * @Author: czy0729
 * @Date: 2023-05-14 07:14:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-31 10:06:57
 */
import { _, systemStore, usersStore, userStore } from '@stores'
import { getCover400, getCoverMedium, getTimestamp } from '@utils'
import { syncUserStore } from '@utils/async'
import { t } from '@utils/fetch'
import axios from '@utils/thirdParty/axios'
import {
  HOST_CDN_AVATAR,
  IMG_AVATAR_DEFAULT,
  IMG_DEFAULT,
  UA,
  URL_DEFAULT_AVATAR,
  URL_DEFAULT_MONO
} from '@constants'
import { Fn } from '@types'
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
        value =
          (medium.includes(URL_DEFAULT_AVATAR) ? '' : usersStore.customAvatar) ||
          `${medium}?r=${TS}`
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
    if (src.includes(URL_DEFAULT_AVATAR)) return IMG_AVATAR_DEFAULT
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
  if (
    !systemStore.setting.cdn ||
    !systemStore.setting.cdnAvatarV2 ||
    typeof src !== 'string' ||
    !src.includes(`${HOST_IMAGE}/pic/user/`)
  ) {
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
  let value: number
  if (radius === false) {
    value = 0
  } else if (round || systemStore.setting.avatarRound) {
    value = size
  } else if (typeof radius === 'boolean') {
    value = _.radiusSm
  } else {
    value = radius
  }
  return value
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
function fixedLarge(src: any) {
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
  if (typeof src === 'string' && src.indexOf('//') === 0) src = `https:${src}`

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

/** 自动修复图片地址 */
export function fixedAll(src: any, size: number) {
  let _src = fixedLarge(src)
  _src = fixedSize(_src)
  _src = fixedHD(_src)
  _src = getCDNAvatar(_src, size >= 100 ? 'bgm_poster_200' : 'bgm_poster_100')

  // 有时候 Avatar 组件也会被条目封面传入使用, 需要避免使用大图
  return getCover400(_src, size >= 100 ? 200 : 100)
}

/** 获取头像 API 跳转后的地址 */
export async function head(url: string) {
  const { accessToken } = syncUserStore()
  let cancelToken: Fn

  return new Promise(resolve => {
    // @ts-expect-error
    axios({
      method: 'get',
      url,
      headers: {
        Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        'User-Agent': UA
      },
      responseType: 'arraybuffer',
      withCredentials: false,
      timeout: 8000,
      maxRedirects: 0,
      // @ts-expect-error
      cancelToken: new axios.CancelToken(function executor(c) {
        cancelToken = c
      })
    })
      .then((response: any) => {
        cancelToken()

        const { responseURL } = response.request
        resolve(responseURL ? responseURL : IMG_AVATAR_DEFAULT)
      })
      .catch(() => {
        cancelToken()
        resolve(IMG_AVATAR_DEFAULT)
      })
  })
}
