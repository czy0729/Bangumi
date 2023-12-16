/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 07:34:50
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { InView } from '@_'
import { memo } from '@utils/decorators'
import { rerender } from '@utils/dev'
import Chart from '../chart'
import IconHidden from '../icon/hidden'
import { TITLE_RATING } from '../ds'
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
}, DEFAULT_PROPS)
