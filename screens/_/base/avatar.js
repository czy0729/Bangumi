/*
 * @Author: czy0729
 * @Date: 2019-05-19 17:10:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-25 18:12:59
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Image } from '@components'
import { systemStore } from '@stores'
import _ from '@styles'

function Avatar({ style, navigation, userId, src, size }) {
  const { avatarRound } = systemStore.setting
  return (
    <Image
      style={style}
      size={size}
      src={src}
      radius={avatarRound ? size / 2 : true}
      border={_.colorBorder}
      quality={false}
      onPress={
        navigation && userId
          ? () =>
              navigation.push('Zone', {
                userId
              })
          : undefined
      }
    />
  )
}

Avatar.defaultProps = {
  navigation: undefined,
  userId: undefined,
  src: undefined,
  size: 28
}

export default observer(Avatar)
