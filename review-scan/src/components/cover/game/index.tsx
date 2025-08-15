/*
 * @Author: czy0729
 * @Date: 2023-06-20 12:10:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-09 16:45:00
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Component } from '../../component'
import { Flex } from '../../flex'
import { Image } from '../../image'
import { Squircle } from '../../squircle'
import { memoStyles } from './styles'

function Game({
  containerStyle,
  bodyStyle,
  angleStyle,
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

  // 游戏为 NS 卡带状
  const containerWidth = width || size
  const containerHeight = height || size
  const gameWidth = containerWidth - 12
  const gameHeight = Math.max(containerHeight - 28, gameWidth)
  return (
    <Component
      id='component-cover'
      data-type='game'
      style={{
        width: containerWidth,
        height: containerHeight
      }}
    >
      <Flex style={stl(styles.game, containerStyle)} direction='column' justify='center'>
        <View style={[styles.head, bodyStyle]} />
        <Squircle width={gameWidth} height={gameHeight} radius={_.radiusXs}>
          <Image
            style={imageStyle}
            src={src}
            imageViewerSrc={imageViewerSrc}
            textOnly={textOnly}
            fallback={fallback}
            {...other}
            size={gameWidth}
            width={gameWidth}
            height={gameHeight}
            radius={0}
            shadow={false}
            border={false}
          />
        </Squircle>
        <View style={[styles.angle, angleStyle]} />
      </Flex>
    </Component>
  )
}

export default observer(Game)
