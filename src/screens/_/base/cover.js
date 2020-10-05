/*
 * @Author: czy0729
 * @Date: 2020-01-18 17:00:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-06 04:17:48
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Image } from '@components'
import { _, systemStore } from '@stores'
import { getCoverMedium } from '@utils/app'
import { IMG_DEFAULT } from '@constants'
import { HOST_CDN, CDN_OSS_SUBJECT } from '@constants/cdn'

function Cover({ style, src, size, height, noDefault, type, ...other }) {
  const styles = memoStyles()
  const { dev } = systemStore.state
  const { cdn, coverThings } = systemStore.setting
  const _src =
    (cdn ? CDN_OSS_SUBJECT(getCoverMedium(src)) : getCoverMedium(src)) ||
    (noDefault ? '' : IMG_DEFAULT)
  const imageStyle = [
    style,
    dev && typeof _src === 'string' && _src.includes(HOST_CDN) && styles.dev
  ]

  if (coverThings) {
    if (type === '音乐') {
      // 音乐为矩形唱片装, 长宽取短的
      const w = Math.min(size || 1000, other.width || 1000, height || 1000)
      const _style = {
        width: w,
        height: w
      }
      return (
        <View style={_style}>
          <View
            style={[
              styles.disc,
              _style,
              {
                borderRadius: w / 2
              }
            ]}
          />
          <View style={[styles.mask, _style]} />
          <Image
            style={[imageStyle, styles.image]}
            src={_src}
            size={w}
            border
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
        height: h
      }
      return (
        <View
          style={[
            _style,
            {
              marginRight: 4
            }
          ]}
        >
          <View style={[styles.book, _style]} />
          <View style={[styles.mask, _style]} />
          <Image
            style={[
              imageStyle,
              styles.image,
              {
                borderTopRightRadius: 2,
                borderBottomRightRadius: 2
              }
            ]}
            src={_src}
            size={w}
            height={h}
            border
            {...other}
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
        <Flex style={styles.game} direction='column' justify='center'>
          <View style={styles.gameHead} />
          <Image
            style={[imageStyle, styles.gameImage]}
            src={_src}
            {...other}
            radius={4}
            size={w - 12}
            width={w - 12}
            height={h - 16}
            shadow={false}
            border={false}
          />
          <View style={styles.gameAngle} />
        </Flex>
      )
    }
  }

  return (
    <Image
      style={imageStyle}
      src={_src}
      size={size}
      height={height}
      {...other}
    />
  )
}

export default observer(Cover)

const memoStyles = _.memoStyles(_ => ({
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
    borderRadius: _.radiusXs
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
    marginRight: -4,
    backgroundColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
    borderColor: _.colorBorder,
    borderWidth: _.hairlineWidth,
    borderRadius: 6
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
  game: {
    backgroundColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
    borderWidth: 6,
    borderBottomWidth: 2,
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
    borderWidth: 6,
    borderColor: 'transparent',
    borderTopColor: _.select('rgba(0, 0, 0, 0.2)', _._colorDarkModeLevel2)
  }
}))
