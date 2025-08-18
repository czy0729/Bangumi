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
import { Squircle } from '../../squircle'
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
  const catalogSize = Math.min(size || 1000, width || 1000, height || 1000)
  const catalogStyle = {
    width: catalogSize,
    height: catalogSize
  }
  return (
    <Component id='component-cover' data-type='catalog' style={catalogStyle}>
      <View
        style={[
          styles.catalog,
          styles.catalogLevel2,
          {
            width: catalogSize,
            height: catalogSize - 8
          }
        ]}
      />
      <View
        style={[
          styles.catalog,
          styles.catalogLevel1,
          {
            width: catalogSize,
            height: catalogSize - 4
          }
        ]}
      />
      <Squircle style={styles.image} width={catalogSize} height={catalogSize} radius={_.radiusSm}>
        <Image
          style={imageStyle}
          src={src}
          imageViewerSrc={imageViewerSrc}
          textOnly={textOnly}
          fallback={fallback}
          {...other}
          size={catalogSize}
          width={catalogSize}
          height={catalogSize}
          radius={0}
        />
      </Squircle>
    </Component>
  )
}

export default observer(Catalog)
