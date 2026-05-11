/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-11 08:37:55
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { TITLE_RATING } from '../../ds'
import IconHidden from '../icon/hidden'
import Chart from './chart'
import Title from './title'
import VIB from './vib'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Rating = memo(
  ({ styles, hideScore = false, showRating = true }) => {
    const [showScore, setShowScore] = useState(!hideScore)

    return (
      <View
        style={stl(
          styles.container,
          showRating && !showScore && styles.hideScoreContainer,
          !showRating && !showScore && styles.hide
        )}
      >
        <Flex>
          <Flex.Item>
            <Title showScore={showScore} />
          </Flex.Item>
          {!showRating && <IconHidden name={TITLE_RATING} value='showRating' />}
        </Flex>

        {showRating && (
          <View style={styles.rate}>
            {showScore ? (
              <>
                <Chart />
                <VIB />
              </>
            ) : (
              <Flex style={styles.hideScore} justify='center'>
                <Touchable onPress={() => setShowScore(true)}>
                  <Text type='sub'>评分已隐藏，点击显示</Text>
                </Touchable>
              </Flex>
            )}
          </View>
        )}
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Rating
