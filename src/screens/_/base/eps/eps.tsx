/*
 * @Author: czy0729
 * @Date: 2022-08-31 14:21:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 20:24:07
 */
import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { arrGroup, asc, postTask } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_ARRAY, FROZEN_FN, FROZEN_OBJECT, WSA } from '@constants'
import Carousel from './carousel'
import NormalButtons from './normal-buttons'
import { getComment } from './utils'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

import type { LayoutChangeEvent } from 'react-native'
import type { PassProps, Props } from './types'

export default memo(
  ({
    style,
    advance = false,
    canPlay = false,
    eps = FROZEN_ARRAY,
    grid = false,
    layoutWidth = 0,
    lines = 4,
    login = false,
    marginRight = 0,
    numbersOfLine = DEFAULT_PROPS.numbersOfLine,
    pagination = false,
    subjectId = 0,
    userProgress = FROZEN_OBJECT,
    orientation = _.orientation,
    flip = false,
    onFliped = FROZEN_FN,
    onSelect = FROZEN_FN
  }: Props) => {
    const [width, setWidth] = useState(layoutWidth - marginRight)

    const memoBtnStyle = useMemo(() => {
      if (WSA || _.isPad) {
        return {
          width: 40,
          margin: _.sm
        }
      }

      if (!width) return {}

      const marginPercent = 0.2
      const marginNumbers = numbersOfLine - 1
      const marginSum = width * marginPercent
      const widthSum = width - marginSum
      const itemWidth = widthSum / numbersOfLine
      const itemMargin = marginSum / marginNumbers

      return {
        width: grid ? Math.floor(itemWidth) : itemWidth,
        margin: grid ? Math.floor(itemMargin) : itemMargin
      }
    }, [width, numbersOfLine, grid])

    const memoPages = useMemo(() => {
      const epsData = eps || []

      // 一次遍历完成: 过滤有效类型 + 检测是否有 SP
      let hasSp = false
      const filteredEps = epsData.filter(item => {
        if (item.type === 1) hasSp = true
        return item.type === 0 || item.type === 1
      })

      // 保证 SP 排在普通章节后面
      if (hasSp) {
        filteredEps.sort((a, b) => asc(a, b, item => (item.type === 0 ? 1 : 0)))
      }

      // 计算评论数的 min/max，用于热力图
      const { min: commentMin, max: commentMax } = getComment(filteredEps)

      // SP 可能会占用一格, 若 eps 当中存在 sp, 每组要减 1 项避免换行
      const arrNum = numbersOfLine * lines - (lines <= 3 ? 0 : advance && hasSp ? 1 : 0)
      return {
        pages: arrGroup(filteredEps, arrNum),
        commentMin,
        commentMax
      }
    }, [eps, numbersOfLine, lines, advance])

    const memoPassProps = useMemo<PassProps>(() => {
      const { width: btnWidth, margin: btnMargin } = memoBtnStyle

      return {
        advance,
        canPlay,
        login,
        margin: btnMargin,
        numbersOfLine,
        subjectId,
        userProgress,
        width: btnWidth,
        flip,
        onFliped,
        onSelect,
        commentMin: memoPages.commentMin,
        commentMax: memoPages.commentMax
      }
    }, [
      advance,
      memoBtnStyle,
      canPlay,
      login,
      numbersOfLine,
      subjectId,
      userProgress,
      flip,
      onFliped,
      onSelect,
      memoPages.commentMin,
      memoPages.commentMax
    ])

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        if (layoutWidth) return

        const { width: layoutWidthVal } = event.nativeEvent.layout
        postTask(() => {
          setWidth(layoutWidthVal - marginRight)
        }, 0)
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [orientation, layoutWidth, marginRight]
    )

    const { pages } = memoPages
    if (!pages.length) return null

    const mounted = width !== 0
    const layoutStyle = mounted
      ? [
          style,
          {
            marginRight: -memoBtnStyle.margin
          }
        ]
      : undefined

    if (pagination) {
      return (
        <View style={layoutStyle} onLayout={handleLayout}>
          {mounted ? (
            pages.length <= 1 ? (
              <NormalButtons props={memoPassProps} eps={pages[0]} />
            ) : (
              <Carousel props={memoPassProps} epsGroup={pages} />
            )
          ) : null}
        </View>
      )
    }

    const { margin } = memoBtnStyle
    const marginStyle = {
      marginBottom: margin ? -margin : 0 // 抵消最后一行的 marginBottom
    }

    return (
      <View style={[layoutStyle, marginStyle]} onLayout={handleLayout}>
        {mounted && <NormalButtons props={memoPassProps} eps={pages[0]} />}
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)
