/*
 * 封面
 * @Author: czy0729
 * @Date: 2020-01-18 17:00:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-26 16:32:52
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text } from '@components'
import { _, systemStore } from '@stores'
import { getCover400, matchCoverUrl, stl } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'
import { Props as CoverProps } from './types'

export { CoverProps }

export const Cover = ob(
  ({
    style,
    containerStyle,
    bodyStyle,
    angleStyle,
    src,
    imageViewerSrc,
    size,
    height,
    noDefault,
    type,
    useType = false,
    cdn,
    textOnly,
    fallback,
    ...other
  }: CoverProps) => {
    const styles = memoStyles()
    if (textOnly) {
      const w = other.width || size
      const h = height || size
      return (
        <Flex
          style={stl(
            styles.textOnly,
            {
              width: w,
              height: h
            },
            other.radius && styles.textOnlyRadius
          )}
          justify='center'
        >
          <Text type='sub' bold onPress={other.onPress}>
            text-only
          </Text>
        </Flex>
      )
    }

    const imageStyle = [style]
    const { hashSubjectOTALoaded } = systemStore.state
    let _src = cdn !== false ? matchCoverUrl(src, noDefault) : src

    // 相册模式大图
    let _imageViewerSrc = imageViewerSrc
    if (_imageViewerSrc && typeof _src === 'string' && _src.includes('/bgm_poster')) {
      _imageViewerSrc = _src
    }

    // @update 2022/12/30 源站图片现在可以统一处理
    _src = getCover400(_src, (other.width || size) > 100 ? 400 : 100)

    const { coverThings, coverRadius } = systemStore.setting
    if (coverThings || useType) {
      if (type === '音乐') {
        // 音乐为矩形唱片装, 长宽取短的
        const w = Math.min(size || 1000, other.width || 1000, height || 1000) - 8
        const _style = {
          width: w,
          height: w,
          borderRadius:
            other?.radius === true ? coverRadius : other?.radius || _.radiusXs
        }
        return (
          <View key={hashSubjectOTALoaded} style={_style}>
            <View
              style={stl([
                styles.disc,
                _style,
                {
                  borderRadius: w / 2
                },
                angleStyle
              ])}
            />
            <View style={[styles.mask, _style]} />
            <Image
              style={[imageStyle, styles.image]}
              src={_src}
              imageViewerSrc={imageViewerSrc}
              border
              textOnly={textOnly}
              fallback={fallback}
              {...other}
              size={w}
              width={w}
              height={w}
            />
          </View>
        )
      }

      if (type === '书籍') {
        // 书籍为书本状
        const w = (other.width || size) - 4
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
          <View key={hashSubjectOTALoaded} style={_style}>
            <View style={[styles.book, _style]} />
            <View style={[styles.mask, _style]} />
            <Image
              style={[imageStyle, styles.image, styles.bookRadius]}
              src={_src}
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
            <View style={styles.bookLine} />
          </View>
        )
      }

      if (type === '游戏') {
        // 游戏为NS卡带状
        const w = other.width || size
        const h = height || size
        return (
          <Flex
            key={hashSubjectOTALoaded}
            style={stl(styles.game, containerStyle)}
            direction='column'
            justify='center'
          >
            <View style={[styles.gameHead, bodyStyle]} />
            <Image
              style={imageStyle}
              src={_src}
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
            <View style={[styles.gameAngle, angleStyle]} />
          </Flex>
        )
      }

      if (type === '目录') {
        const w = Math.min(size || 1000, other.width || 1000, height || 1000)
        const _style = {
          width: w,
          height: w
        }
        return (
          <View key={hashSubjectOTALoaded} style={_style}>
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
              src={_src}
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
          </View>
        )
      }
    }

    return (
      <Image
        key={hashSubjectOTALoaded}
        style={imageStyle}
        src={_src}
        imageViewerSrc={imageViewerSrc}
        textOnly={textOnly}
        fallback={fallback}
        {...other}
        size={size}
        height={height}
      />
    )
  }
)
