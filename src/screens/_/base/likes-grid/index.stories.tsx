/*
 * @Author: czy0729
 * @Date: 2023-04-05 12:31:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:06:49
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import Component from './grid'
import { props } from './index.mock'
import { DATA } from './ds'

export default {
  title: 'base/LikesGrid',
  component: Component
}

export const LikesGrid = args => (
  <View style={styles.container}>
    <Component {...args} data={DATA.filter(item => item[0] < 100)} />
  </View>
)

LikesGrid.args = props

const styles = _.create({
  container: {
    width: 240,
    height: 240 * 0.8,
    backgroundColor: _.select(
      `rgba(0, 0, 0, ${_.ios('0.08', '0.16')})`,
      `rgba(255, 255, 255, ${_.ios('0.24', '0.05')})`
    ),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
