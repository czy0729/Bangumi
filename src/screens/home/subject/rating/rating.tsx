/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 14:28:38
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { InView } from '@_'
import { memo } from '@utils/decorators'
import { rerender } from '@utils/dev'
import Chart from '../chart'
import IconHidden from '../icon/hidden'
import Title from './title'
import { DEFAULT_PROPS } from './ds'

export default memo(({ styles, hideScore, showRating }) => {
  rerender('Subject.Rating.Main')

  const [showScore, setShowScore] = useState(!hideScore)
  return (
    <InView style={showRating ? styles.container : styles.hide}>
      <Flex>
        <Flex.Item>
          <Title showScore={showScore} />
        </Flex.Item>
        {!showRating && <IconHidden name='评分' value='showRating' />}
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
}, DEFAULT_PROPS)
