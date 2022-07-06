/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 23:34:53
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import Chart from '../chart'
import IconHidden from '../icon/hidden'
import Title from './title'

const defaultProps = {
  styles: {},
  hideScore: false,
  showRating: true
}

export default memo(({ styles, hideScore, showRating }) => {
  global.rerender('Subject.Rating.Main')

  const [showScore, setShowScore] = useState(!hideScore)
  return (
    <View style={[_.container.wind, _.mt.lg, !showRating && _.short]}>
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
}, defaultProps)
