/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 11:37:27
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { memo } from '@utils/decorators'
import Chart from '../chart'
import IconHidden from '../icon/hidden'
import Title from './title'
import { DEFAULT_PROPS } from './ds'

export default memo(({ styles, hideScore, showRating }) => {
  global.rerender('Subject.Rating.Main')

  const [showScore, setShowScore] = useState(!hideScore)
  return (
    <View style={showRating ? styles.container : styles.hide}>
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
    </View>
  )
}, DEFAULT_PROPS)
