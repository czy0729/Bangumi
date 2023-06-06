/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:52:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 21:31:27
 */
import React from 'react'
import { observer } from 'mobx-react'
import { IOS } from '@constants'
import { AnyObject } from '@types'
import Image from '../image'

function Remote({ style, headers, uri, onError, onLoadEnd, ...other }) {
  const source: AnyObject = {
    headers,

    // 安卓新版本不允许非 https 的图片了
    uri: uri.replace('http://', 'https://')
  }
  if (IOS) source.cache = 'force-cache'

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

export default observer(Remote)
