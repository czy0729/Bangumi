/*
 * @Author: czy0729
 * @Date: 2022-08-31 14:21:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 22:11:18
 */
import React, { useState, useMemo, useCallback } from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { arrGroup, asc } from '@utils'
import { memo } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { MODEL_EP_TYPE, WSA } from '@constants'
import { EpTypeCn } from '@types'
import { NormalButtons } from './normal-buttons'
import { Carousel } from './carousel'
import { DEFAULT_PROPS } from './ds'
import { Props } from './types'

export default memo(
  ({
    style,
    advance,
    canPlay,
    eps,
    grid,
    layoutWidth,
    lines,
    login,
    marginRight,
    numbersOfLine,
    pagination,
    subjectId,
    userProgress,
    orientation,
    flip,
    onFliped,
    onSelect
  }: Props) => {
    rerender('Eps.Main')

    const [width, setWidth] = useState(layoutWidth - marginRight)

    const btnStyle = useMemo(() => {
      rerender('Eps.btnStyle')

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
      rerender('Eps.passProps')

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
      rerender('Eps.pages')

      let _eps = eps || []
      const hasSp = _eps.some(item => item.type == 1) // 是否有 SP
      if (hasSp) {
        // 保证 SP 排在普通章节后面
        _eps = _eps
          .slice()
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

    const onLayout = useCallback(
      ({ nativeEvent }) => {
        if (layoutWidth) return

        setWidth(nativeEvent.layout.width - marginRight)
      },

      // eslint-disable-next-line react-hooks/exhaustive-deps
      [orientation, layoutWidth, marginRight]
    )

    if (!pages.length) return null

    const mounted = width !== 0
    const _style = mounted
      ? [
          style,
          {
            marginRight: -btnStyle.margin
          }
        ]
      : undefined
    const _onLayout = layoutWidth ? undefined : onLayout
    if (pagination) {
      return (
        <View style={_style} onLayout={_onLayout}>
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
      <View style={[_style, marginStyle]} onLayout={_onLayout}>
        {mounted && <NormalButtons props={passProps} eps={pages[0]} />}
      </View>
    )
  },
  DEFAULT_PROPS
)
