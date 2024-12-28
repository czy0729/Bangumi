/*
 * @Author: czy0729
 * @Date: 2019-09-11 16:22:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-28 05:49:58
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import Btns from './btns'
import Slider from './slider'
import Stepper from './stepper'
import Submit from './submit'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Form() {
  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <Btns />
      <Stepper style={_.mt.md} />
      <Slider style={_.mt.md} />
      <Submit style={_.mt.sm} />
    </View>
  )
}

export default ob(Form, COMPONENT)
