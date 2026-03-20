/*
 * @Author: czy0729
 * @Date: 2021-08-05 16:43:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 06:36:11
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import AntCarousel from '@ant-design/react-native/lib/carousel'
import NormalButtons from '../normal-buttons'
import { memoStyles, paginationStyles } from './styles'

function Carousel({ props, epsGroup = [] }) {
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
        // 渲染过多会卡顿
        .filter((_item, index) => index < 5)
        .map((eps, index) => (
          <View key={index}>
            <NormalButtons props={props} eps={eps} />
          </View>
        ))}
    </AntCarousel>
  )
}

export default observer(Carousel)
