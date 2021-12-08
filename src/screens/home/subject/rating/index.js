/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-07 13:03:19
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { ob, memo } from '@utils/decorators'
import IconHidden from '../icon/hidden'
import Title from './title'
import Chart from './chart'

const defaultProps = {
  styles: {},
  hideScore: false,
  showRating: true
}

const Rating = memo(({ styles, hideScore, showRating }) => {
  rerender('Subject.Rating.Main')

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

export default ob(() => {
  rerender('Subject.Rating')

  const { showRating } = systemStore.setting
  if (showRating === -1) return null

  return (
    <Rating
      styles={memoStyles()}
      showRating={showRating}
      hideScore={systemStore.setting.hideScore}
    />
  )
})

const memoStyles = _.memoStyles(() => ({
  hideScore: {
    height: 144 * _.ratio
  }
}))
