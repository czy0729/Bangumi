/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:22:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 09:30:45
 */
import React from 'react'
import { observer } from 'mobx-react'
import Image from '../image'

function Local({ style, headers, overrideHeaders, src, onError, onLoadEnd, ...other }) {
  let source
  if (headers && typeof src === 'object') {
    source = {
      ...src,
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
