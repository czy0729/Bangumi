/*
 * @Author: czy0729
 * @Date: 2020-01-18 17:00:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 08:30:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { checkLocalError, getRecoveryBgmCover } from '@components/image/utils'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { HOST_BGM_STATIC, IMG_DEFAULT } from '@constants'
import { Component } from '../component'
import Book from './book'
import Catalog from './catalog'
import CoverImage from './cover-image'
import Disc from './disc'
import Game from './game'
import TextOnly from './text-only'
import { getCoverSrc, getImageViewerSrc } from './utils'
import { COMPONENT } from './ds'

export { getCoverSrc }

import type { Props as CoverProps } from './types'
export type { CoverProps }

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

    // 修正受限内容封面与部分不规范维基数据
    const fixedSrc =
      src === '/img/no_icon_subject.png' || src === `${HOST_BGM_STATIC}/r/200/pic/cover/l/`
        ? IMG_DEFAULT
        : src

    const { width, radius } = other
    const coverWidth = width || size
    const coverHeight = height || size

    if (textOnly) {
      return (
        <TextOnly width={coverWidth} height={coverHeight} radius={radius} onPress={other.onPress} />
      )
    }

    const coverSrcRaw = getCoverSrc(fixedSrc, coverWidth, cdn, noDefault)

    // 能使已确定不能成功加载的图片, 使用回滚路径尽早渲染
    const coverSrc = checkLocalError(coverSrcRaw)
      ? getRecoveryBgmCover(coverSrcRaw, coverWidth, coverHeight, size)
      : coverSrcRaw

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
      const imageProps = { ...passProps, imageStyle: style, width }

      if (type === '音乐') {
        return <Disc {...imageProps} angleStyle={angleStyle} radius={radius} />
      }

      if (type === '书籍') {
        return <Book {...imageProps} containerStyle={containerStyle} bodyStyle={bodyStyle} />
      }

      if (type === '游戏') {
        return (
          <Game
            {...imageProps}
            containerStyle={containerStyle}
            bodyStyle={bodyStyle}
            angleStyle={angleStyle}
          />
        )
      }

      if (type === '目录') return <Catalog {...imageProps} />
    }

    return (
      <Component id='component-cover' data-type='subject'>
        <CoverImage {...passProps} style={style} radius={radius} />
      </Component>
    )
  }
)

export default Cover
