/*
 * @Author: czy0729
 * @Date: 2023-06-20 10:11:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-10 07:22:28
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Component } from '../../component'
import { Image } from '../../image'
import { Squircle } from '../../squircle'
import { memoStyles } from './styles'

import type { ViewStyle } from '@types'

function Disc({
  imageStyle,
  angleStyle,
  src,
  imageViewerSrc,
  textOnly,
  fallback,
  size,
  width,
  height,
  radius,
  ...other
}) {
  return useObserver(() => {
    const styles = memoStyles()

    // 音乐为矩形唱片装, 长宽取短的
    const discSize = Math.min(size || 1000, width || 1000, height || 1000) - 8
    const discStyle: ViewStyle = {
      width: discSize,
      height: discSize
    } as const

    return (
      <Component id='component-cover' data-type='music' style={discStyle}>
        <View
          style={stl([
            styles.disc,
            discStyle,
            {
              borderRadius: discSize / 2
            },
            angleStyle
          ])}
        />
        <Squircle style={styles.image} width={discSize} height={discSize} radius={_.radiusSm}>
          <Image
            style={imageStyle}
            src={src}
            imageViewerSrc={imageViewerSrc}
            textOnly={textOnly}
            fallback={fallback}
            // radius={discStyle.borderRadius}
            {...other}
            size={discSize}
            width={discSize}
            height={discSize}
            border={0}
          />
        </Squircle>
      </Component>
    )
  })
}

export default Disc
