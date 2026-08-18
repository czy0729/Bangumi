/*
 * @Author: czy0729
 * @Date: 2026-08-18 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 14:00:00
 */
import React, { memo } from 'react'
import { Component } from '../../component'
import { Image } from '../../image'
import { Squircle } from '../../squircle'

import type { Props } from './types'

/**
 * 封面图片渲染
 * 有圆角时包一层 Squircle 裁切, 否则直接渲染 Image
 */
function CoverImage({
  src,
  imageViewerSrc,
  size,
  width,
  height,
  radius,
  style,
  textOnly,
  fallback,
  ...other
}: Props) {
  const coverWidth = width || size
  const coverHeight = height || size

  const passProps = {
    ...other,
    src,
    imageViewerSrc,
    size,
    width,
    height,
    textOnly,
    fallback
  }

  if (radius) {
    return (
      <Component id='component-cover' data-type='subject'>
        <Squircle width={coverWidth} height={coverHeight} radius={radius}>
          <Image {...passProps} style={style} radius={0} />
        </Squircle>
      </Component>
    )
  }

  return (
    <Component id='component-cover' data-type='subject'>
      <Image {...passProps} style={style} />
    </Component>
  )
}

export default memo(CoverImage)
