/*
 * @Author: czy0729
 * @Date: 2023-06-20 12:10:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-20 12:16:56
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
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
  const w = width || size
  const h = height || size
  return (
    <Flex style={stl(styles.game, containerStyle)} direction='column' justify='center'>
      <View style={[styles.head, bodyStyle]} />
      <Image
        style={imageStyle}
        src={src}
        imageViewerSrc={imageViewerSrc}
        textOnly={textOnly}
        fallback={fallback}
        {...other}
        radius={_.radiusXs}
        size={w - 8}
        width={w - 8}
        height={Math.max(h - 20, w - 12)}
        shadow={false}
        border={false}
      />
      <View style={[styles.angle, angleStyle]} />
    </Flex>
  )
}

export default ob(Game)
