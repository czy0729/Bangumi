/*
 * @Author: czy0729
 * @Date: 2019-09-11 16:22:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 12:59:41
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import Btns from './btns'
import Slider from './slider'
import Stepper from './stepper'
import Submit from './submit'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Form() {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <View style={styles.container}>
        <Btns />
        <Stepper style={_.mt.md} />
        <Slider style={_.mt.md} />
        <Submit style={_.mt.sm} />
      </View>
    )
  })
}

export default Form
