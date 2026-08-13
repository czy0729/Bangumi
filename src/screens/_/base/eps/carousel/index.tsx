/*
 * @Author: czy0729
 * @Date: 2021-08-05 16:43:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 18:55:57
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Carousel as CarouselComp } from '@components'
import { FROZEN_ARRAY } from '@constants'
import NormalButtons from '../normal-buttons'
import { memoStyles } from './styles'

import type { Props } from './types'

function Carousel({ props, epsGroup = FROZEN_ARRAY }: Props) {
  const styles = memoStyles()

  return (
    <CarouselComp
      style={styles.carousel}
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
    </CarouselComp>
  )
}

export default observer(Carousel)
