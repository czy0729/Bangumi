/*
 * @Author: czy0729
 * @Date: 2023-06-20 10:28:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-09 16:44:04
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Component } from '../../component'
import { Squircle } from '../../squircle'
import { Image } from '../../image'
import { memoStyles } from './styles'

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
  const styles = memoStyles()

  // 书籍为书本状
  const bookWidth = (width || size) - 4
  const bookHeight = height || size
  const bookStyle = {
    width: bookWidth,
    height: bookHeight
  }
  return (
    <Component id='component-cover' data-type='book' style={bookStyle}>
      <View style={[styles.book, bookStyle]} />
      <Squircle
        style={styles.image}
        width={bookWidth}
        height={bookHeight}
        radius={_.radiusXs}
      >
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
}

export default observer(Book)
