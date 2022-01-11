/*
 * @Author: czy0729
 * @Date: 2021-08-05 16:43:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-11 06:22:43
 */
import React from 'react'
import { View } from 'react-native'
import AntCarousel from '@ant-design/react-native/lib/carousel'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { NormalButtons } from './normal-buttons'

export const Carousel = ob(({ props, epsGroup = [] }) => {
  const styles = memoStyles()
  return (
    <AntCarousel
      style={styles.carousel}
      dotStyle={styles.dot}
      dotActiveStyle={styles.dotActive}
      infinite={false}
    >
      {epsGroup
        // 渲染过多会卡顿, 暂时只取前5页
        .filter((item, index) => index < 5)
        .map((eps, index) => (
          <View key={index}>
            <NormalButtons props={props} eps={eps} />
          </View>
        ))}
    </AntCarousel>
  )
})

const memoStyles = _.memoStyles(_ => ({
  carousel: {
    height: 242
  },
  dot: {
    backgroundColor: _.colorPlain,
    borderWidth: 1,
    borderColor: _.colorDesc
  },
  dotActive: {
    backgroundColor: _.colorDesc
  }
}))
