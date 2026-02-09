/*
 * @Author: czy0729
 * @Date: 2023-06-20 10:28:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-10 07:18:31
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { _ } from '@stores'
import { Component } from '../../component'
import { Image } from '../../image'
import { Squircle } from '../../squircle'
import { memoStyles } from './styles'

import type { ViewStyle } from '@types'

function Book({
  containerStyle,
  bodyStyle,
  imageStyle,
  src,
  imageViewerSrc,
  textOnly,
  fallback,
  size,
  width,
  height,
  ...other
}) {
  return useObserver(() => {
    const styles = memoStyles()

    // 书籍为书本状
    const bookWidth = (width || size) - 4
    const bookHeight = height || size
    const bookStyle: ViewStyle = {
      width: bookWidth,
      height: bookHeight
    } as const

    return (
      <Component id='component-cover' data-type='book' style={bookStyle}>
        <View style={styles.wrap}>
          <Squircle width={bookWidth} height={bookHeight} radius={_.radiusXs}>
            <View style={[styles.book, bookStyle]} />
          </Squircle>
        </View>
        <Squircle style={styles.image} width={bookWidth} height={bookHeight} radius={_.radiusXs}>
          <Image
            style={imageStyle}
            src={src}
            imageViewerSrc={imageViewerSrc}
            border
            textOnly={textOnly}
            fallback={fallback}
            {...other}
            size={bookWidth}
            width={bookWidth}
            height={bookHeight}
            radius={0}
          />
          <View style={styles.line} />
        </Squircle>
      </Component>
    )
  })
}

export default Book
