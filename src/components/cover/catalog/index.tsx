/*
 * @Author: czy0729
 * @Date: 2023-06-20 12:22:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-09 16:46:03
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Component } from '../../component'
import { Image } from '../../image'
import { memoStyles } from './styles'

function Catalog({
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
  const w = Math.min(size || 1000, width || 1000, height || 1000)
  const _style = {
    width: w,
    height: w
  }
  return (
    <Component id='component-cover' data-type='catalog' style={_style}>
      <View
        style={[
          styles.catalog,
          styles.catalogLevel2,
          {
            width: w,
            height: w - 8
          }
        ]}
      />
      <View
        style={[
          styles.catalog,
          styles.catalogLevel1,
          {
            width: w,
            height: w - 4
          }
        ]}
      />
      <Image
        style={[imageStyle, styles.image]}
        src={src}
        imageViewerSrc={imageViewerSrc}
        border
        textOnly={textOnly}
        fallback={fallback}
        {...other}
        size={w}
        width={w}
        height={w}
        radius={_.radiusSm}
      />
    </Component>
  )
}

export default observer(Catalog)
