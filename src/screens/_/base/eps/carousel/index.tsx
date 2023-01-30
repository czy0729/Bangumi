/*
 * @Author: czy0729
 * @Date: 2021-08-05 16:43:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-20 07:41:47
 */
import React from 'react'
import { View } from 'react-native'
import AntCarousel from '@ant-design/react-native/lib/carousel'
import { ob } from '@utils/decorators'
import { NormalButtons } from '../normal-buttons'
import { memoStyles, paginationStyles } from './styles'

export const Carousel = ob(({ props, epsGroup = [] }) => {
  const styles = memoStyles()
  return (
    <AntCarousel
      style={styles.carousel}
      styles={paginationStyles}
      dotStyle={styles.dot}
      dotActiveStyle={styles.dotActive}
      infinite={false}
    >
      {epsGroup
        // 渲染过多会卡顿, 暂时只取前 4 页
        .filter((item, index) => index < 4)
        .map((eps, index) => (
          <View key={index}>
            <NormalButtons props={props} eps={eps} />
          </View>
        ))}
    </AntCarousel>
  )
})
