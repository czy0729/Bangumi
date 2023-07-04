/*
 * @Author: czy0729
 * @Date: 2023-06-20 10:28:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-20 10:59:18
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
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
  const w = (width || size) - 4
  const h = height || size
  const _style = {
    width: w,
    height: h,
    borderTopRightRadius: _.radiusXs,
    borderBottomRightRadius: _.radiusXs,
    borderTopLeftRadius: _.radiusSm,
    borderBottomLeftRadius: _.radiusSm
  }
  return (
    <View style={_style}>
      <View style={[styles.book, _style]} />
      <View style={[styles.mask, _style]} />
      <Image
        style={[imageStyle, styles.image, styles.radius]}
        src={src}
        imageViewerSrc={imageViewerSrc}
        border
        textOnly={textOnly}
        fallback={fallback}
        {...other}
        size={w}
        width={w}
        height={h}
        radius={_.radiusXs}
      />
      <View style={styles.line} />
    </View>
  )
}

export default observer(Book)
