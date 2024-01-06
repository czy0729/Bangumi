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
import { IMG_EMPTY_DARK } from '@constants'
import { TEXT_ONLY } from '@/config'
import { Source } from '@types'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function Bg({ style }, { $ }: Ctx) {
  const styles = memoStyles()
  const { _image } = $.params
  const { avatar } = $.usersInfo
  let source: Source = {
    uri: avatar?.large
  }

  if (TEXT_ONLY) {
    source = IMG_EMPTY_DARK
  } else {
    if (typeof _image === 'string') {
      if (_image?.indexOf('http') === 0) {
        source.uri = _image
      } else {
        source.uri = `https:${_image}`
      }
    }

    source.uri = fixedHD($.bg || $.avatar || source.uri)
    if (typeof source.uri === 'string') {
      source.uri = source.uri.replace('http://', 'https://')
    }
  }

  return (
    <Animated.Image
      style={[styles.parallaxImage, style]}
      source={source}
      blurRadius={getBlurRadius(source.uri, $.bg, avatar?.large)}
    />
  )
}

export default obc(Bg)
