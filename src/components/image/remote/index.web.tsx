/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:52:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-06 19:20:30
 */
import { observer } from 'mobx-react'
import { IOS } from '@constants'
import Image from '../image'

import type { ImageProps, ImageURISource } from 'react-native'
import type { Props } from './types'

function Remote({ style, headers, uri, onError, onLoadEnd, ...other }: Props) {
  const source = {
    headers: headers as ImageURISource['headers'],
    uri,
    ...(IOS ? { cache: 'force-cache' as const } : {})
  }

  return (
    <Image
      {...other}
      style={style as ImageProps['style']}
      source={source}
      onError={onError}
      onLoadEnd={onLoadEnd}
    />
  )
}

export default observer(Remote)
