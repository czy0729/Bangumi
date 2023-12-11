/*
 * @Author: czy0729
 * @Date: 2020-01-18 17:00:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 05:24:01
 */
import React from 'react'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { Component } from '../component'
import { Squircle } from '../squircle'
import { Image } from '../image'
import TextOnly from './text-only'
import Disc from './disc'
import Book from './book'
import Game from './game'
import Catalog from './catalog'
import { getCoverSrc, getImageViewerSrc } from './utils'
import { Props as CoverProps } from './types'

export { CoverProps }

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
    const { width, radius, onPress } = other
    const coverWidth = width || size
    const coverHeight = height || size
    if (textOnly) {
      return (
        <TextOnly
          width={coverWidth}
          height={coverHeight}
          radius={radius}
          onPress={onPress}
        />
      )
    }

    const { coverThings } = systemStore.setting
    const coverSrc = getCoverSrc(src, coverWidth, cdn, noDefault)
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
    if (coverThings || useType) {
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

      if (type === '目录') {
        return <Catalog {...passProps} imageStyle={style} width={width} />
      }
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
