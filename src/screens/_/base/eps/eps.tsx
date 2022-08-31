/*
 * @Author: czy0729
 * @Date: 2022-08-31 14:21:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 19:29:59
 */
import React, { useState, useMemo, useCallback } from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { arrGroup, asc } from '@utils'
import { memo } from '@utils/decorators'
import { MODEL_EP_TYPE, WSA } from '@constants'
import { EpTypeCn } from '@types'
import { NormalButtons } from './normal-buttons'
import { Carousel } from './carousel'
import { DEFAULT_PROPS } from './ds'
import { Props as EpsProps } from './types'

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
    onSelect,
    onLongPress
  }: EpsProps) => {
    global.rerender('Eps.Main')

    const [width, setWidth] = useState(layoutWidth - marginRight)

    const btnStyle = useMemo(() => {
      global.rerender('Eps.btnStyle')

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
      global.rerender('Eps.passProps')

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
        onSelect,
        onLongPress
      }
    }, [
      advance,
      btnStyle,
      canPlay,
      login,
      numbersOfLine,
      subjectId,
      userProgress,
      onSelect,
      onLongPress
    ])

    const pages = useMemo(() => {
      global.rerender('Eps.pages')

      let _eps = eps || []
      let hasSp = false // 是否有SP
      if (!advance) {
        _eps = _eps.filter(item => {
          const isNormal = MODEL_EP_TYPE.getLabel<EpTypeCn>(item.type) !== '普通'
          if (!isNormal) hasSp = true
          return isNormal
        })
      }

      _eps = _eps
        // 保证SP排在普通章节后面
        .sort((a, b) =>
          asc(a, b, item =>
            MODEL_EP_TYPE.getLabel<EpTypeCn>(item.type) === '普通' ? 1 : 0
          )
        )

      // SP可能会占用一格, 若eps当中存在sp, 每组要减1项避免换行
      const arrNum = numbersOfLine * lines - (lines <= 3 ? 0 : hasSp ? 1 : 0)
      return arrGroup(_eps, arrNum)
    }, [eps, advance, numbersOfLine, lines])

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
            pages.length === 1 ? (
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
      marginBottom: margin ? -margin : 0 // 抵消最后一行的marginBottom
    }
    return (
      <View style={[_style, marginStyle]} onLayout={_onLayout}>
        {mounted && <NormalButtons props={passProps} eps={pages[0]} />}
      </View>
    )
  },
  DEFAULT_PROPS
)
