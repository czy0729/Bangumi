/*
 * @Author: czy0729
 * @Date: 2023-06-20 12:10:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-10 07:24:29
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Component } from '../../component'
import { Flex } from '../../flex'
import { Image } from '../../image'
import { Squircle } from '../../squircle'
import { memoStyles } from './styles'

import type { ViewStyle } from '@types'

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
  return useObserver(() => {
    const styles = memoStyles()

    // 游戏为 NS 卡带状
    const containerWidth = width || size
    const containerHeight = height || size
    const gameStyle: ViewStyle = {
      width: containerWidth,
      height: containerHeight
    } as const

    const gameWidth = containerWidth - 12
    const gameHeight = Math.max(containerHeight - 28, gameWidth)

    return (
      <Component id='component-cover' data-type='game' style={gameStyle}>
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
              border={false}
            />
          </Squircle>
          <View style={[styles.angle, angleStyle]} />
        </Flex>
      </Component>
    )
  })
}

export default Game
