/*
 * @Author: czy0729
 * @Date: 2020-01-18 17:00:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 12:58:40
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { getCoverMedium, stl } from '@utils'
import { TEXT_ONLY, IMG_DEFAULT, HOST_CDN, CDN_OSS_SUBJECT } from '@constants'
import { Flex } from '../../flex'
import { Image } from '../../image'
import { Props as ImageProps } from '../../image/types'
import { Text } from '../../text'
import { memoStyles } from './styles'

type Props = ImageProps & {
  /** 不使用默认图片 */
  noDefault?: boolean

  /** 封面拟物 */
  type?: '音乐' | '书籍' | '游戏' | '目录'
}

const noImg: any[] = ['//lain.bgm.tv/pic/cover/c/', '/img/no_icon_subject.png']

export const Cover = observer(
  ({
    style,
    src,
    size,
    height,
    noDefault,
    type,
    textOnly = TEXT_ONLY,
    ...other
  }: Props) => {
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

    const { hashSubjectOTALoaded, dev } = systemStore.state
    const { cdn, coverThings } = systemStore.setting

    // 有些情况图片地址分析错误, 排除掉
    const _src = noImg.includes(src)
      ? IMG_DEFAULT
      : (cdn ? CDN_OSS_SUBJECT(getCoverMedium(src)) : getCoverMedium(src)) ||
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
          <View key={hashSubjectOTALoaded} style={_style}>
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
              textOnly={textOnly}
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
          <Flex
            key={hashSubjectOTALoaded}
            style={styles.game}
            direction='column'
            justify='center'
          >
            <View style={styles.gameHead} />
            <Image
              style={imageStyle}
              src={_src}
              textOnly={textOnly}
              {...other}
              radius={4}
              size={w - 8}
              width={w - 8}
              height={Math.max(h - 20, w - 12)}
              shadow={false}
              border={false}
            />
            <View style={styles.gameAngle} />
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
              {...other}
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
        {...other}
      />
    )
  }
)
