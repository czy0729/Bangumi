/*
 * 头像
 * @Author: czy0729
 * @Date: 2019-05-19 17:10:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-12 05:43:05
 */
import React from 'react'
import { View } from 'react-native'
import { Image } from '@components'
import { _, systemStore, userStore } from '@stores'
import { getTimestamp } from '@utils'
import { getCoverMedium } from '@utils/app'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import {
  IOS,
  URL_DEFAULT_AVATAR,
  // @ts-ignore
  IMG_DEFAULT
} from '@constants'
import { HOST_CDN, CDN_OSS_AVATAR } from '@constants/cdn'
import { ColorValue, EventType, Navigation, ViewStyle, Fn } from '@types'
import { memoStyles } from './styles'

type Props = {
  /** 图片容器样式 */
  style?: ViewStyle

  /** 路由 */
  navigation?: Navigation

  /** 用户 id, 存在则允许点击进入用户空间 */
  userId?: number | string

  /** 用户昵称 */
  name?: string

  /** 头像地址 */
  src?: string

  /** 大小 */
  size?: number

  /** 边框大小 */
  borderWidth?: number

  /** 边框颜色 */
  borderColor?: ColorValue

  /** 埋点事件 */
  event?: EventType

  /** 路由跳转额外传递参数 */
  params?: object

  /** 是否强制圆形 */
  round?: boolean

  /** 圆角大小 */
  radius?: number

  /** 是否显示底色 */
  placeholder?: boolean

  /** 点击回调, 会覆盖跳转到用户空间的事件 */
  onPress?: Fn

  /** 长按回调 */
  onLongPress?: Fn
}

const ts = parseInt(String(getTimestamp() / 604800)) // 一周才变化一次
const USER_MEDIUM = '//lain.bgm.tv/pic/user/m/'
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
    onPress,
    onLongPress
  }: Props) => {
    const styles = memoStyles()
    const { dev } = systemStore.state
    const { cdn, cdnAvatar, avatarRound, coverRadius } = systemStore.setting

    // @ts-ignore
    const { avatar } = userStore.usersInfo()
    const _size = _.r(size)

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
     * @notice 安卓gif图片不能直接设置borderRadius, 需要再包一层
     * 然后就是bgm的默认图/icon.jpg根本不是jpg是gif
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
            onPress={_onPress}
            onLongPress={onLongPress}
          />
        </View>
      )
    }

    const isUrl = typeof _src === 'string'

    /**
     * 强制使用/l/
     * @date 20220512
     */
    if (isUrl && _src.includes(USER_MEDIUM)) {
      _src = _src.replace(USER_MEDIUM, USER_LARGE)
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
        onPress={_onPress}
        onLongPress={onLongPress}
      />
    )
  }
)
