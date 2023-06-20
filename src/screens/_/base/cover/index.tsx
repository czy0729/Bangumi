/*
 * 封面
 * @Author: czy0729
 * @Date: 2020-01-18 17:00:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-20 12:43:11
 */
import React from 'react'
import { Image } from '@components'
import { systemStore } from '@stores'
import { getCover400, matchCoverUrl } from '@utils'
import { ob } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import TextOnly from './text-only'
import Disc from './disc'
import Book from './book'
import Game from './game'
import Catalog from './catalog'
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
    if (textOnly) {
      return (
        <TextOnly
          width={other.width || size}
          height={height || size}
          radius={other.radius}
          onPress={other.onPress}
        />
      )
    }

    let _src = cdn !== false ? matchCoverUrl(src, noDefault) : src

    // 相册模式大图
    let _imageViewerSrc = imageViewerSrc
    if (_imageViewerSrc && typeof _src === 'string' && _src.includes('/bgm_poster')) {
      _imageViewerSrc = _src
    }

    // 对部分尺寸过少的图片, 强制使用缩略图
    const width = other.width || size
    if (STORYBOOK) {
      _src = getCover400(_src, width > 200 ? 400 : width > 100 ? 200 : 100)
    } else {
      _src = getCover400(_src, width > 134 ? 400 : width > 67 ? 200 : 100)
    }

    const { coverThings } = systemStore.setting
    const passProps = {
      src: _src,
      imageViewerSrc,
      textOnly,
      fallback,
      size,
      height
    }
    if (coverThings || useType) {
      if (type === '音乐') {
        return (
          <Disc
            {...other}
            {...passProps}
            imageStyle={style}
            angleStyle={angleStyle}
            width={other.width}
            radius={other.radius}
          />
        )
      }

      if (type === '书籍') {
        return (
          <Book
            {...other}
            {...passProps}
            containerStyle={containerStyle}
            bodyStyle={bodyStyle}
            imageStyle={style}
            width={other.width}
          />
        )
      }

      if (type === '游戏') {
        return (
          <Game
            {...other}
            {...passProps}
            containerStyle={containerStyle}
            bodyStyle={bodyStyle}
            angleStyle={angleStyle}
            imageStyle={style}
            width={other.width}
          />
        )
      }

      if (type === '目录') {
        return (
          <Catalog {...other} {...passProps} imageStyle={style} width={other.width} />
        )
      }
    }

    return <Image {...other} {...passProps} style={style} />
  }
)
