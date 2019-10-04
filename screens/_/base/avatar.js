/*
 * 头像
 * @Author: czy0729
 * @Date: 2019-05-19 17:10:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-20 21:43:35
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { Image } from '@components'
import { getCoverMedium } from '@utils/app'
import { IOS } from '@constants'
import { systemStore } from '@stores'
import _ from '@styles'

function Avatar({
  style,
  navigation,
  userId,
  src,
  size,
  borderColor,
  onPress
}) {
  const { avatarRound } = systemStore.setting
  const _onPress = () => {
    if (onPress) {
      onPress()
      return
    }

    if (navigation && userId) {
      navigation.push('Zone', {
        userId
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
          src={getCoverMedium(src, true)}
          radius={avatarRound ? size / 2 : true}
          quality={false}
          onPress={_onPress}
        />
      </View>
    )
  }

  return (
    <Image
      style={style}
      size={size}
      src={getCoverMedium(src, true)}
      radius={avatarRound ? size / 2 : true}
      border={borderColor}
      quality={false}
      onPress={_onPress}
    />
  )
}

Avatar.defaultProps = {
  navigation: undefined,
  userId: undefined,
  src: undefined,
  size: 28,
  borderColor: _.colorBorder,
  onPress: undefined
}

export default observer(Avatar)

const styles = StyleSheet.create({
  avatar: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
})
