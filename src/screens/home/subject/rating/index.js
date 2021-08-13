/*
 * @Author: czy0729
 * @Date: 2021-08-12 13:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-13 09:41:34
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { ob, memo } from '@utils/decorators'
import Title from './title'
import Chart from './chart'

const defaultProps = {
  styles: {},
  showRating: true
}

const Rating = memo(({ styles, showRating }) => {
  rerender('Subject.Rating.Main')

  const [showScore, setShowScore] = useState(true)
  return (
    <View style={[_.container.wind, _.mt.lg, !showRating && _.short]}>
      <Title showScore={showScore} />
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

  return (
    <Rating styles={memoStyles()} showRating={systemStore.setting.showRating} />
  )
})

const memoStyles = _.memoStyles(_ => ({
  hideScore: {
    height: 144 * _.ratio
  }
}))
