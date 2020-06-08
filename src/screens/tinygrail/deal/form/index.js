/*
 * @Author: czy0729
 * @Date: 2019-09-11 16:22:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-19 22:26:41
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
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

Form.contextTypes = {
  $: PropTypes.object
}

export default observer(Form)

const styles = StyleSheet.create({
  container: {
    paddingTop: _.sm,
    paddingBottom: _.md - 4,
    paddingLeft: _.wind
  }
})
