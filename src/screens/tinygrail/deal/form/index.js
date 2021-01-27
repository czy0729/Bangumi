/*
 * @Author: czy0729
 * @Date: 2019-09-11 16:22:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:11:55
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import Btns from './btns'
import Stepper from './stepper'
import Slider from './slider'
import Submit from './submit'

function Form({ style }) {
  return (
    <View style={[styles.container, style]}>
      <Btns />
      <Stepper style={_.mt.md} />
      <Slider style={_.mt.md} />
      <Submit style={_.mt.sm} />
    </View>
  )
}

export default ob(Form)

const styles = _.create({
  container: {
    paddingTop: _.sm,
    paddingBottom: _.md - 4,
    paddingLeft: _.wind
  }
})
