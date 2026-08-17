/*
 * @Author: czy0729
 * @Date: 2026-08-18 05:59:32
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-18 05:59:32
 */
import React, { memo } from 'react'
import { Image } from '../../image'
import { Squircle } from '../../squircle'

import type { Props } from './types'

/**
 * 头像图片渲染
 * 有圆角时包一层 Squircle 裁切, 否则直接渲染 Image
 */
function AvatarImage({
  src,
  fallbackSrc,
  priority,
  skeleton,
  skeletonType,
  size,
  radius,
  border,
  borderWidth,
  placeholder,
  style
}: Props) {
  const key = typeof src === 'string' ? src : 'avatar'
  const passProps = {
    src,
    fallbackSrc,
    priority,
    skeleton,
    skeletonType,
    size,
    border,
    borderWidth,
    placeholder
  }

  if (radius) {
    return (
      <Squircle width={size} height={size} radius={radius}>
        <Image {...passProps} style={style} key={key} border={0} />
      </Squircle>
    )
  }

  return <Image {...passProps} style={style} key={key} radius={0} />
}

export default memo(AvatarImage)
