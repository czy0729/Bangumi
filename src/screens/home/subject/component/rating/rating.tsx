/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-02 21:21:42
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { InView } from '@_'
import { memo } from '@utils/decorators'
import IconHidden from '../../icon/hidden'
import Chart from './chart'
import Title from './title'
import { TITLE_RATING } from '../../ds'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Rating = memo(
  ({ styles, hideScore, showRating }) => {
    const [showScore, setShowScore] = useState(!hideScore)
    return (
      <InView style={showRating ? styles.container : styles.hide}>
        <Flex>
          <Flex.Item>
            <Title showScore={showScore} />
          </Flex.Item>
          {!showRating && <IconHidden name={TITLE_RATING} value='showRating' />}
        </Flex>
        {showRating && (
          <View>
            {showScore ? (
              <Chart />
            ) : (
              <Touchable onPress={() => setShowScore(true)}>
                <Flex style={styles.hideScore} justify='center'>
                  <Text>评分已隐藏, 点击显示</Text>
                </Flex>
              </Touchable>
            )}
          </View>
        )}
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Rating
