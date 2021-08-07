/*
 * @Author: czy0729
 * @Date: 2021-08-05 16:43:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-08 04:40:38
 */
import React from 'react'
import { View } from 'react-native'
import AntCarousel from '@ant-design/react-native/lib/carousel'
import { _ } from '@stores'
import { memoCompare } from '@utils'
import { NormalButtons } from './normal-buttons'

export const Carousel = React.memo(({ props, epsGroup = [] }) => {
  // rerender('Eps / Carousel')

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
          // eslint-disable-next-line react/no-array-index-key
          <View key={index}>
            <NormalButtons props={props} eps={eps} />
          </View>
        ))}
    </AntCarousel>
  )
}, memoCompare)

const memoStyles = _.memoStyles(_ => ({
  carousel: {
    height: 224
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
