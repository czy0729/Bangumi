/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:52:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 19:06:24
 */
import React from 'react'
import { observer } from 'mobx-react'
import { IOS } from '@constants'
import Image from '../image'

import type { AnyObject } from '@types'

function Remote({ style, headers, uri, onError, onLoadEnd, ...other }) {
  const source: AnyObject = {
    headers,
    uri
  }
  if (IOS) source.cache = 'force-cache'

  return <Image {...other} style={style} source={source} onError={onError} onLoadEnd={onLoadEnd} />
}

export default observer(Remote)
