/*
 * @Author: czy0729
 * @Date: 2026-08-12 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-12 10:00:00
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import Dot from './dot'
import { memoStyles } from './styles'

import type { CarouselStyle } from '../types'
import type { PaginationProps } from './types'

/** 轮播分页指示器 */
function Pagination({
  stylesOverride,
  vertical,
  current,
  count,
  dotStyle,
  dotActiveStyle,
  onDotPress
}: PaginationProps) {
  const baseStyles = memoStyles()
  const styles = stylesOverride
    ? ({ ...baseStyles, ...stylesOverride } as CarouselStyle)
    : baseStyles

  const dots = []
  for (let i = 0; i < count; i++) {
    dots.push(
      <Dot
        key={`dot-${i}`}
        active={i === current}
        styles={styles}
        dotStyle={dotStyle}
        dotActiveStyle={dotActiveStyle}
        onPress={onDotPress ? () => onDotPress(i) : undefined}
      />
    )
  }
  const positionStyle = vertical ? styles.paginationY : styles.paginationX
  return (
    <View style={[styles.pagination, positionStyle]}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: vertical ? 'column' : 'row'
        }}
      >
        {dots}
      </View>
    </View>
  )
}

export default observer(Pagination)
