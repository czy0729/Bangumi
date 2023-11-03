/*
 * 封面
 * @Author: czy0729
 * @Date: 2020-01-18 17:00:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-20 21:15:30
 */
import React from 'react'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { getCover400, matchCoverUrl } from '@utils'
import { IMG_DEFAULT } from '@constants'
import { Image } from '../image'
import TextOnly from './text-only'
import Disc from './disc'
import Book from './book'
import Game from './game'
import Catalog from './catalog'
import { Props as CoverProps } from './types'

export { CoverProps }

export const Cover = observer(
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

    // 对部分尺寸过少的图片, 强制使用缩略图
    const width = other.width || size
    let prefix = 'bgm_poster_100'
    let coverSize: 100 | 200 | 400 = 100
    if (width > 134) {
      prefix = 'bgm_poster'
      coverSize = 400
    } else if (width > 67) {
      prefix = 'bgm_poster_200'
      coverSize = 200
    }

    const _src =
      getCover400(
        cdn !== false ? matchCoverUrl(src, noDefault, prefix) : src,
        coverSize
      ) || IMG_DEFAULT

    // 相册模式强制大图
    let _imageViewerSrc = imageViewerSrc
    if (_imageViewerSrc && typeof _src === 'string' && _src.includes('/bgm_poster')) {
      _imageViewerSrc = _src.replace(/\/bgm_poster_(100|200)/g, '/bgm_poster')
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

    // 封面拟物
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
