/*
 * @Author: czy0729
 * @Date: 2022-08-31 14:21:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 19:49:54
 */
import React, { useCallback, useMemo, useState } from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import { _ } from '@stores'
import { arrGroup, asc, runAfter } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_ARRAY, FROZEN_FN, FROZEN_OBJECT, MODEL_EP_TYPE, WSA } from '@constants'
import { EpTypeCn } from '@types'
import { Carousel } from './carousel'
import { NormalButtons } from './normal-buttons'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'
import { Props } from './types'

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

    const btnStyle = useMemo(() => {
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
      const _width = widthSum / numbersOfLine
      const _margin = marginSum / marginNumbers
      return {
        width: grid ? Math.floor(_width) : _width,
        margin: grid ? Math.floor(_margin) : _margin
      }
    }, [width, numbersOfLine, grid])

    const passProps = useMemo(() => {
      const { width, margin } = btnStyle
      return {
        advance,
        canPlay,
        login,
        margin,
        numbersOfLine,
        subjectId,
        userProgress,
        width,
        flip,
        onFliped,
        onSelect
      }
    }, [
      advance,
      btnStyle,
      canPlay,
      login,
      numbersOfLine,
      subjectId,
      userProgress,
      flip,
      onFliped,
      onSelect
    ])

    const pages = useMemo(() => {
      let _eps = eps || []
      const hasSp = _eps.some(item => item.type == 1) // 是否有 SP
      if (hasSp) {
        // 保证 SP 排在普通章节后面
        _eps = _eps
          .slice()
          // 后来发现会有 2 的情况, 是 OP 或 ED, 暂时排除掉
          .filter(item => item.type === 0 || item.type === 1)
          .sort((a, b) =>
            asc(a, b, item =>
              MODEL_EP_TYPE.getLabel<EpTypeCn>(String(item.type)) === '普通' ? 1 : 0
            )
          )
      }

      // SP 可能会占用一格, 若 eps 当中存在 sp, 每组要减 1 项避免换行
      const arrNum = numbersOfLine * lines - (lines <= 3 ? 0 : advance && hasSp ? 1 : 0)
      return arrGroup(_eps, arrNum)
    }, [eps, numbersOfLine, lines, advance])

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        if (layoutWidth) return

        const { width } = event.nativeEvent.layout
        runAfter(() => {
          setWidth(width - marginRight)
        }, true)
      },

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [orientation, layoutWidth, marginRight]
    )

    if (!pages.length) return null

    const mounted = width !== 0
    const layoutStyle = mounted
      ? [
          style,
          {
            marginRight: -btnStyle.margin
          }
        ]
      : undefined
    if (pagination) {
      return (
        <View style={layoutStyle} onLayout={handleLayout}>
          {mounted ? (
            pages.length <= 1 ? (
              <NormalButtons props={passProps} eps={pages[0]} />
            ) : (
              <Carousel props={passProps} epsGroup={pages} />
            )
          ) : null}
        </View>
      )
    }

    const { margin } = btnStyle
    const marginStyle = {
      marginBottom: margin ? -margin : 0 // 抵消最后一行的 marginBottom
    }
    return (
      <View style={[layoutStyle, marginStyle]} onLayout={handleLayout}>
        {mounted && <NormalButtons props={passProps} eps={pages[0]} />}
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)
