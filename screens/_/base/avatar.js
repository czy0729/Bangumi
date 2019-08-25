/*
 * @Author: czy0729
 * @Date: 2019-05-19 17:10:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-25 22:02:42
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Image } from '@components'
import { systemStore } from '@stores'
import _ from '@styles'

function Avatar({ style, navigation, userId, src, size, onPress }) {
  const { avatarRound } = systemStore.setting
  return (
    <Image
      style={style}
      size={size}
      src={src}
      radius={avatarRound ? size / 2 : true}
      border={_.colorBorder}
      quality={false}
      onPress={() => {
        if (onPress) {
          onPress()
          return
        }

        if (navigation && userId) {
          navigation.push('Zone', {
            userId
          })
        }
      }}
    />
  )
}

Avatar.defaultProps = {
  navigation: undefined,
  userId: undefined,
  src: undefined,
  size: 28,
  onPress: undefined
}

export default observer(Avatar)
