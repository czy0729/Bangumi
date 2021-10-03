/*
 * @Author: czy0729
 * @Date: 2021-08-10 00:34:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-03 18:42:07
 */
import React, { useState, useMemo, useCallback } from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { arrGroup } from '@utils'
import { memo } from '@utils/decorators'
import { MODEL_EP_TYPE } from '@constants/model'
import { NormalButtons } from './normal-buttons'
import { Carousel } from './carousel'
import { defaultProps } from './ds'

function Eps({
  style,
  subjectId,
  layoutWidth,
  marginRight,
  numbersOfLine,
  lines,
  pagination,
  canPlay,
  login,
  advance,
  eps,
  userProgress,
  grid,
  onSelect,
  onLongPress
}) {
  rerender('Eps.Main')

  const [width, setWidth] = useState(layoutWidth - marginRight)

  const btnStyle = useMemo(() => {
    rerender('Eps.btnStyle')

    if (_.isPad) {
      return {
        width: 48,
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
      width: grid ? parseInt(_width) : _width,
      margin: grid ? parseInt(_margin) : _margin
    }
  }, [width, numbersOfLine, grid])

  const passProps = useMemo(() => {
    rerender('Eps.passProps')

    const { width, margin } = btnStyle
    return {
      width,
      margin,
      subjectId,
      numbersOfLine,
      canPlay,
      login,
      advance,
      userProgress,
      onSelect,
      onLongPress
    }
  }, [
    btnStyle.width,
    btnStyle.margin,
    subjectId,
    numbersOfLine,
    canPlay,
    login,
    advance,
    JSON.stringify(userProgress)
  ])

  const pages = useMemo(() => {
    rerender('Eps.pages')

    let _eps = eps || []
    let hasSp = false // 是否有SP
    if (!advance) {
      _eps = _eps.filter(item => {
        const isNormal = MODEL_EP_TYPE.getLabel(item.type) !== '普通'
        if (!isNormal) hasSp = true
        return isNormal
      })
    }

    _eps = _eps
      // 保证SP排在普通章节后面
      .sort((a, b) => {
        const sortA = MODEL_EP_TYPE.getLabel(a.type) === '普通' ? 1 : 0
        const sortB = MODEL_EP_TYPE.getLabel(b.type) === '普通' ? 1 : 0
        return sortA - sortB
      })

    // SP可能会占用一格, 若eps当中存在sp, 每组要减1项避免换行
    const arrNum = numbersOfLine * lines - (lines <= 3 ? 0 : hasSp ? 1 : 0)
    return arrGroup(_eps, arrNum)
  }, [eps, advance, numbersOfLine, lines])

  const onLayout = useCallback(
    ({ nativeEvent }) => {
      if (width) return

      setWidth(nativeEvent.layout.width - marginRight)
    },
    [width, marginRight]
  )

  if (!pages.length) return null

  const mounted = width !== 0
  const _style = mounted ? style : undefined
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
  return (
    <View
      style={[
        _style,
        {
          marginBottom: margin ? -margin : 0 // 抵消最后一行的marginBottom
        }
      ]}
      onLayout={_onLayout}
    >
      {mounted && <NormalButtons props={passProps} eps={pages[0]} />}
    </View>
  )
}

export default memo(Eps, defaultProps)
