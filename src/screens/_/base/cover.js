/*
 * @Author: czy0729
 * @Date: 2020-01-18 17:00:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 20:24:40
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Image, Text } from '@components'
import { _, systemStore } from '@stores'
import { matchCoverUrl } from '@utils/app'
import { ob } from '@utils/decorators'
import { HOST_CDN } from '@constants/cdn'

export const Cover = ob(
  ({
    style,
    containerStyle,
    bodyStyle,
    angleStyle,
    src,
    size,
    height,
    noDefault,
    type,
    useType = false,
    cdn,
    textOnly,
    fallback,
    ...other
  }) => {
    const styles = memoStyles()
    if (textOnly) {
      const w = other.width || size
      const h = height || size
      return (
        <Flex
          style={[
            styles.textOnly,
            {
              width: w,
              height: h
            },
            other.radius && styles.textOnlyRadius
          ]}
          justify='center'
        >
          <Text type='sub' bold onPress={other.onPress}>
            text-only
          </Text>
        </Flex>
      )
    }

    const { hashSubjectOTALoaded, dev } = systemStore.state
    const _src = cdn !== false ? matchCoverUrl(src, noDefault) : src

    const imageStyle = [
      style,
      dev && typeof _src === 'string' && _src.includes(HOST_CDN) && styles.dev
    ]

    const { coverThings, coverRadius } = systemStore.setting
    if (coverThings || useType) {
      if (type === '音乐') {
        // 音乐为矩形唱片装, 长宽取短的
        const w = Math.min(size || 1000, other.width || 1000, height || 1000)
        const _style = {
          width: w,
          height: w,
          borderRadius:
            other?.radius === true ? coverRadius : other?.radius || _.radiusXs
        }
        return (
          <View key={hashSubjectOTALoaded} style={_style}>
            <View
              style={[
                styles.disc,
                _style,
                {
                  borderRadius: w / 2
                },
                angleStyle
              ]}
            />
            <View style={[styles.mask, _style]} />
            <Image
              style={[imageStyle, styles.image]}
              src={_src}
              size={w}
              border
              textOnly={textOnly}
              fallback={fallback}
              {...other}
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
          borderRadius: _.radiusSm
        }
        return (
          <View key={hashSubjectOTALoaded} style={[_style, styles.bookMarginRight]}>
            <View style={[styles.book, _style]} />
            <View style={[styles.mask, _style]} />
            <Image
              style={[imageStyle, styles.image, styles.bookRadius]}
              src={_src}
              size={w}
              height={h}
              border
              textOnly={textOnly}
              fallback={fallback}
              {...other}
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
            style={[styles.game, containerStyle]}
            direction='column'
            justify='center'
          >
            <View style={[styles.gameHead, bodyStyle]} />
            <Image
              style={[imageStyle, styles.gameImage]}
              src={_src}
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
              size={w}
              border
              textOnly={textOnly}
              fallback={fallback}
              {...other}
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
        size={size}
        height={height}
        textOnly={textOnly}
        fallback={fallback}
        {...other}
      />
    )
  }
)

const memoStyles = _.memoStyles(() => ({
  dev: {
    borderWidth: 1,
    borderColor: _.colorDanger
  },
  mask: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    backgroundColor: _.colorBg,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  image: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0
  },
  disc: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    marginRight: -8,
    backgroundColor: _.select(_.colorTitle, _.colorSub)
  },
  book: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    marginRight: -5,
    backgroundColor: _.select(_.colorIcon, _._colorDarkModeLevel2),
    borderColor: _.colorBorder,
    borderWidth: _.hairlineWidth,
    borderRadius: 7
  },
  bookLine: {
    position: 'absolute',
    zIndex: 3,
    top: 1,
    left: 4,
    bottom: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: _.hairlineWidth
  },
  bookMarginRight: {
    marginRight: 4
  },
  bookRadius: {
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2
  },
  game: {
    backgroundColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
    borderWidth: 5,
    borderBottomWidth: 1,
    borderRadius: 6,
    borderBottomLeftRadius: 16
  },
  gameHead: {
    width: 24,
    height: 2,
    marginBottom: 2,
    backgroundColor: _.select('rgba(0, 0, 0, 0.2)', _._colorDarkModeLevel2)
  },
  gameAngle: {
    width: 6,
    height: 4,
    marginTop: 2,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: _.select('rgba(0, 0, 0, 0.2)', _._colorDarkModeLevel2)
  },
  catalog: {
    position: 'absolute',
    right: 0,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
    borderWidth: 1,
    borderRadius: _.radiusXs,
    borderColor: _.colorBorder
  },
  catalogLevel1: {
    zIndex: 2,
    top: 2,
    bottom: 2,
    marginRight: -4
  },
  catalogLevel2: {
    zIndex: 1,
    top: 4,
    bottom: 4,
    marginRight: -8
  },
  textOnly: {
    backgroundColor: _.select(_.colorBorder, _._colorDarkModeLevel1)
  },
  textOnlyRadius: {
    borderRadius: 4,
    overflow: 'hidden'
  }
}))
