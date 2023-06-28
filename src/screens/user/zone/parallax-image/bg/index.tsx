/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:19:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 09:33:45
 */
import React from 'react'
import { Animated } from 'react-native'
import { fixedHD } from '@_/base/avatar/utils'
import { getBlurRadius } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { memoStyles } from './styles'

function Bg({ style }, { $ }: Ctx) {
  const styles = memoStyles()
  const { _image } = $.params
  const { avatar } = $.usersInfo

  let uri: any = avatar?.large
  if (typeof _image === 'string') {
    if (_image?.indexOf('http') === 0) {
      uri = _image
    } else {
      uri = `https:${_image}`
    }
  }

  uri = fixedHD($.bg || $.avatar || uri)
  if (typeof uri === 'string') {
    uri = uri.replace('http://', 'https://')
  }

  return (
    <Animated.Image
      style={[styles.parallaxImage, style]}
      source={{
        uri
      }}
      blurRadius={getBlurRadius(uri, $.bg, avatar?.large)}
    />
  )
}

export default obc(Bg)
