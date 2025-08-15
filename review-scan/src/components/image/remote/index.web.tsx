/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:52:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-13 13:57:24
 */
import React from 'react'
import { observer } from 'mobx-react'
import { IOS } from '@constants'
import { AnyObject } from '@types'
import Image from '../image'

function Remote({ style, headers, uri, onError, onLoadEnd, ...other }) {
  const source: AnyObject = {
    headers,
    uri
  }
  if (IOS) source.cache = 'force-cache'

  return <Image {...other} style={style} source={source} onError={onError} onLoadEnd={onLoadEnd} />
}

export default observer(Remote)
