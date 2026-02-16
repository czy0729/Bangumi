/*
 * @Author: czy0729
 * @Date: 2020-01-18 17:00:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 07:11:51
 */
import React from 'react'
import { observer } from 'mobx-react'
import { checkLocalError, getRecoveryBgmCover } from '@components/image/utils'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { Component } from '../component'
import { Image } from '../image'
import { Squircle } from '../squircle'
import Book from './book'
import Catalog from './catalog'
import Disc from './disc'
import Game from './game'
import TextOnly from './text-only'
import { getCoverSrc, getImageViewerSrc } from './utils'
import { COMPONENT } from './ds'
import { Props as CoverProps } from './types'

export { CoverProps, getCoverSrc }

/** 封面 */
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
    r(COMPONENT)

    const { width, radius } = other
    const coverWidth = width || size
    const coverHeight = height || size
    if (textOnly) {
      return (
        <TextOnly width={coverWidth} height={coverHeight} radius={radius} onPress={other.onPress} />
      )
    }

    let coverSrc = getCoverSrc(src, coverWidth, cdn, noDefault)

    // 能使已确定不能成功加载的图片, 使用回滚路径尽早渲染
    if (checkLocalError(coverSrc)) {
      coverSrc = getRecoveryBgmCover(coverSrc, coverWidth, coverHeight, size)
    }

    const passProps = {
      ...other,
      src: coverSrc,
      imageViewerSrc: getImageViewerSrc(imageViewerSrc, coverSrc),
      size,
      height,
      textOnly,
      fallback
    }

    // 封面拟物
    if (useType || systemStore.setting.coverThings) {
      if (type === '音乐') {
        return (
          <Disc
            {...passProps}
            imageStyle={style}
            angleStyle={angleStyle}
            width={width}
            radius={radius}
          />
        )
      }

      if (type === '书籍') {
        return (
          <Book
            {...passProps}
            containerStyle={containerStyle}
            bodyStyle={bodyStyle}
            imageStyle={style}
            width={width}
          />
        )
      }

      if (type === '游戏') {
        return (
          <Game
            {...passProps}
            containerStyle={containerStyle}
            bodyStyle={bodyStyle}
            angleStyle={angleStyle}
            imageStyle={style}
            width={width}
          />
        )
      }

      if (type === '目录') return <Catalog {...passProps} imageStyle={style} width={width} />
    }

    if (radius) {
      return (
        <Component id='component-cover' data-type='subject'>
          <Squircle width={coverWidth} height={coverHeight} radius={radius}>
            <Image {...passProps} style={style} radius={0} />
          </Squircle>
        </Component>
      )
    }

    return (
      <Component id='component-cover' data-type='subject'>
        <Image {...passProps} style={style} />
      </Component>
    )
  }
)

export default Cover
