/*
 * 头像
 * @Author: czy0729
 * @Date: 2019-05-19 17:10:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-26 13:34:31
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, systemStore, userStore } from '@stores'
import { getTimestamp } from '@utils'
import { getCoverMedium } from '@utils/app'
import { t } from '@utils/fetch'
import {
  IOS,
  HOST_CDN,
  CDN_OSS_AVATAR,
  URL_DEFAULT_AVATAR,
  IMG_DEFAULT
} from '@constants'
import { ColorValue, Navigation, ViewStyle, EventType } from '@types'
import { Image } from '../../image'
import { Props as ImageProps } from '../../image/types'
import { memoStyles } from './styles'

type Props = ImageProps & {
  /** 路由对象 */
  navigation?: Navigation

  /** 用户id */
  userId?: number | string

  /** 昵称 */
  name?: string

  /** 边框颜色 */
  borderColor?: ColorValue

  /** 边框大小 */
  borderWidth?: number

  /** 头像埋点参数 */
  event?: EventType

  /** 传递给路由 Zone 的参数 */
  params?: object

  /** 是否圆形 */
  round?: boolean
}

const ts = parseInt(String(getTimestamp() / 604800)) // 一周才变化一次
const USER_MEDIUM = '//lain.bgm.tv/pic/user/m/'
const USER_LARGE = '//lain.bgm.tv/pic/user/l/'

export const Avatar = observer(
  ({
    style,
    navigation,
    userId,
    name,
    src,
    size = 40,
    borderColor = _.colorBorder,
    borderWidth,
    event = {},
    params = {},
    round,
    radius,
    placeholder,
    textOnly,
    onPress,
    onLongPress
  }: Props) => {
    const styles = memoStyles()
    const { dev } = systemStore.state
    const { cdn, avatarRound } = systemStore.setting
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
      _src = cdn ? CDN_OSS_AVATAR(getCoverMedium(src, true)) : mSrc
    }

    // 若还是原始头像, 使用本地
    if ((userStore.isLimit && _src.includes(URL_DEFAULT_AVATAR)) || !_src) {
      _src = IMG_DEFAULT
    }

    const _radius =
      radius === undefined ? (round || avatarRound ? _size / 2 : true) : radius
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
    if (!IOS && typeof src === 'string' && src.includes('/icon.jpg')) {
      const _style: ViewStyle = [
        styles.avatar,
        {
          width: _size,
          height: _size,
          borderColor
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
            textOnly={textOnly}
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
        textOnly={textOnly}
        onPress={_onPress}
        onLongPress={onLongPress}
      />
    )
  }
)
