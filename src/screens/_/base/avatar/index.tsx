/*
 * 头像
 *
 * @Author: czy0729
 * @Date: 2019-05-19 17:10:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 05:05:56
 */
import React from 'react'
import { View } from 'react-native'
import { Image } from '@components'
import { _, systemStore, userStore } from '@stores'
import { getTimestamp, getCoverMedium } from '@utils'
import { t } from '@utils/fetch'
import { HOST_API_V0 } from '@utils/fetch.v0/ds'
import { ob } from '@utils/decorators'
import {
  CDN_OSS_AVATAR,
  HOST_CDN,
  IMG_DEFAULT,
  IOS,
  URL_DEFAULT_AVATAR
} from '@constants'
import { memoStyles } from './styles'
import { Props as AvatarProps } from './types'

export { AvatarProps }

/** 判断是否自己的头像, 一周才变化一次 */
const ts = Math.floor(getTimestamp() / 604800)

/** 中质量头像 */
const USER_MEDIUM = '//lain.bgm.tv/pic/user/m/'

/** 大质量头像 */
const USER_LARGE = '//lain.bgm.tv/pic/user/l/'

export const Avatar = ob(
  ({
    style,
    navigation,
    userId,
    name,
    src,
    size = 40,
    borderWidth,
    borderColor = _.colorBorder,
    event = {},
    params = {},
    round,
    radius,
    placeholder,
    fallbackSrc,
    onPress,
    onLongPress
  }: AvatarProps) => {
    const styles = memoStyles()
    const { dev } = systemStore.state
    const { cdn, cdnAvatar, avatarRound, coverRadius } = systemStore.setting
    const { avatar } = userStore.usersInfo()
    const _size = _.r(size)

    // @issue 有些第三方地址使用 rn-fast-image 不使用 fallback 都会直接加载失败
    let fallback = false

    /**
     * 判断是否自己的头像, 若是不走CDN, 保证最新
     * 注意头像后面?r=xxx的参数不要去掉, 因头像地址每个人都唯一, 需要防止本地缓存
     */
    const mSrc = getCoverMedium(src, true)
    let _src
    if (avatar?.medium) {
      const _1 = mSrc.split('?')[0].split('/m/')
      const _2 = getCoverMedium(avatar.medium, true).split('?')[0].split('/m/')
      if (_1[1] && _2[1] && _1[1] === _2[1]) {
        _src = `${mSrc}?r=${ts}`
      }
    }

    if (!_src) {
      _src = cdn && cdnAvatar ? CDN_OSS_AVATAR(getCoverMedium(src, true)) : mSrc
    }

    // 若还是原始头像, 使用本地
    if ((userStore.isLimit && _src.includes(URL_DEFAULT_AVATAR)) || !_src) {
      _src = IMG_DEFAULT
    }

    // 默认带圆角, 若大小的一半比设置的圆角还小, 为避免方形头像变成原型, 则覆盖成sm
    let _radius: boolean | number = true
    if (radius) {
      _radius = radius
    } else if (round || avatarRound) {
      _radius = _size / 2
    } else if (_size / 2 <= coverRadius) {
      _radius = _.radiusSm
    }

    const _onPress = () => {
      if (onPress) {
        onPress()
        return
      }

      if (navigation && userId) {
        const { id, data = {} } = event
        t(id, {
          to: 'Zone',
          userId,
          ...data
        })

        navigation.push('Zone', {
          userId,
          _id: userId,
          _image: _src,
          _name: name,
          ...params
        })
      }
    }

    /**
     * @notice 安卓 gif 图片不能直接设置 borderRadius, 需要再包一层
     * 然后就是 bgm 的默认图 /icon.jpg 根本不是 jpg 是 gif
     */
    if (!IOS && src && src.includes('/icon.jpg')) {
      const _style = [
        styles.avatar,
        {
          width: _size,
          height: _size,
          borderWidth: 0
        },
        style
      ]
      if (avatarRound) {
        _style.push({
          borderRadius: _size / 2
        })
      }
      return (
        <View style={_style}>
          <Image
            size={_size}
            src={_src}
            radius={_radius}
            quality={false}
            placeholder={placeholder}
            fallbackSrc={fallbackSrc || src}
            onPress={_onPress}
            onLongPress={onLongPress}
          />
        </View>
      )
    }

    const isUrl = typeof _src === 'string'

    // 强制使用 /l/
    if (isUrl && _src.includes(USER_MEDIUM)) {
      _src = _src.replace(USER_MEDIUM, USER_LARGE)
    }

    if (isUrl && !_src.includes(USER_LARGE) && !_src.includes(HOST_API_V0)) {
      fallback = true
    }

    return (
      <Image
        key={isUrl ? _src : 'avatar'}
        style={[style, dev && isUrl && _src.includes(HOST_CDN) && styles.dev]}
        size={_size}
        src={_src}
        radius={_radius}
        border={borderColor}
        borderWidth={borderWidth}
        quality={false}
        placeholder={placeholder}
        fallback={fallback}
        fallbackSrc={fallbackSrc || src}
        onPress={_onPress}
        onLongPress={onLongPress}
      />
    )
  }
)
