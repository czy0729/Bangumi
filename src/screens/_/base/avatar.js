/*
 * 头像
 * @Author: czy0729
 * @Date: 2019-05-19 17:10:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-20 03:08:04
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Image } from '@components'
import { _, systemStore, userStore } from '@stores'
import { getTimestamp } from '@utils'
import { getCoverMedium } from '@utils/app'
import { t } from '@utils/fetch'
import { IOS, URL_DEFAULT_AVATAR, IMG_DEFAULT } from '@constants'
import { HOST_CDN, CDN_OSS_AVATAR } from '@constants/cdn'

const ts = getTimestamp()

function Avatar({
  style,
  navigation,
  userId,
  name,
  src,
  size,
  borderColor = _.colorBorder,
  borderWidth,
  event,
  params,
  round,
  onPress,
  onLongPress
}) {
  const styles = memoStyles()
  const { dev } = systemStore.state
  const { cdn, avatarRound } = systemStore.setting
  const { avatar } = userStore.usersInfo()

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
  if (userStore.isLimit && _src.includes(URL_DEFAULT_AVATAR)) {
    _src = IMG_DEFAULT
  }

  const radius = round || avatarRound ? size / 2 : true
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
        width: size,
        height: size,
        borderColor
      },
      style
    ]
    if (avatarRound) {
      _style.push({
        borderRadius: size / 2
      })
    }
    return (
      <View style={_style}>
        <Image
          size={size}
          src={_src}
          radius={radius}
          quality={false}
          onPress={_onPress}
          onLongPress={onLongPress}
        />
      </View>
    )
  }

  return (
    <Image
      key={typeof _src === 'string' ? _src : 'avatar'}
      style={[
        style,
        dev && typeof _src === 'string' && _src.includes(HOST_CDN) && styles.dev
      ]}
      size={size}
      src={_src}
      radius={radius}
      border={borderColor}
      borderWidth={borderWidth}
      quality={false}
      onPress={_onPress}
      onLongPress={onLongPress}
    />
  )
}

Avatar.defaultProps = {
  navigation: undefined,
  userId: undefined,
  src: undefined,
  size: 36,
  borderColor: undefined,
  event: {},
  params: {},
  onPress: undefined,
  onLongPress: undefined
}

export default observer(Avatar)

const memoStyles = _.memoStyles(_ => ({
  avatar: {
    borderWidth: _.hairlineWidth,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  dev: {
    borderWidth: 1,
    borderColor: _.colorDanger
  }
}))
