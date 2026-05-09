/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:22:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 18:38:02
 */
import React from 'react'
import { observer } from 'mobx-react'
import Image from '../image'

import type { ImageSourcePropType } from 'react-native'
import type { Props } from './types'

function Local({ style, headers, overrideHeaders, src, onError, onLoadEnd, ...other }: Props) {
  let source: ImageSourcePropType
  if (headers && typeof src === 'object') {
    source = {
      ...src,
      headers: overrideHeaders
    }
  } else if (typeof src === 'string') {
    source = {
      uri: src,
      headers: overrideHeaders
    }
  } else {
    source = src
  }

  return (
    <Image
      {...other}
      style={style}
      source={source}
      fadeDuration={0}
      onError={onError}
      onLoadEnd={onLoadEnd}
    />
  )
}

export default observer(Local)
