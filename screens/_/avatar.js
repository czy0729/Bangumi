/*
 * @Author: czy0729
 * @Date: 2019-05-19 17:10:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-19 17:19:33
 */
import React from 'react'
import { Image } from '@components'
import _ from '@styles'

const Avatar = ({ style, navigation, userId, src }) => (
  <Image
    style={style}
    size={28}
    src={src}
    radius
    border={_.colorBorder}
    onPress={
      navigation
        ? () => {
            navigation.push('Zone', {
              userId
            })
          }
        : undefined
    }
  />
)

export default Avatar
