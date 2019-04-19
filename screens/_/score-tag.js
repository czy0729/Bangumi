/*
 * @Author: czy0729
 * @Date: 2019-03-23 08:43:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-14 21:06:45
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from '@components'
import { getRating } from '@utils/app'
import { colorMain, radiusXs } from '@styles'

const ScoreTag = ({ style, value }) => (
  <Text style={[styles.container, style]} type='plain' size={12} lineHeight={1}>
    {getRating(value)}
  </Text>
)

ScoreTag.defaultProps = {
  value: 0
}

export default ScoreTag

const styles = StyleSheet.create({
  container: {
    padding: 4,
    backgroundColor: colorMain,
    borderRadius: radiusXs,
    overflow: 'hidden'
  }
})
