/*
 * @Author: czy0729
 * @Date: 2024-03-13 05:48:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 06:22:34
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { info, toFixed } from '@utils'
import { useObserver } from '@utils/hooks'
import { calculateRatio, calculateTempleRate } from '@tinygrail/_/utils'
import { memoStyles } from './styles'

function Refine({ rate, rank, stars, level }) {
  const [refine, setRefine] = useState(1)
  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        <Text type='tinygrailText' size={11}>
          {' '}
          {toFixed(calculateTempleRate(rate, rank, stars, level, refine), 1)} [x
          {calculateRatio(rank)}]
        </Text>
        <Touchable
          style={_.ml.xs}
          onPress={() => {
            setRefine(refine + 1)
            info(`精炼 ${refine + 1}`)
          }}
        >
          <Flex style={styles.step} justify='center'>
            <View style={styles.minus} />
            <View style={styles.plus} />
          </Flex>
        </Touchable>
        {refine > 1 && (
          <Touchable
            onPress={() => {
              setRefine(refine - 1)
              info(`精炼 ${refine - 1}`)
            }}
          >
            <Flex style={styles.step} justify='center'>
              <View style={styles.minus} />
            </Flex>
          </Touchable>
        )}
      </>
    )
  })
}

export default Refine
