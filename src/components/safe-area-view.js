/*
 * @Author: czy0729
 * @Date: 2020-06-04 16:20:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-04 16:21:00
 */
import React from 'react'
import { SafeAreaView as RNSafeAreaView } from 'react-navigation'
import { observer } from 'mobx-react'
import { _ } from '@stores'

function SafeAreaView({ style, forceInset, children, ...other }) {
  return (
    <RNSafeAreaView
      style={[_.container.screen, style]}
      forceInset={forceInset}
      {...other}
    >
      {children}
    </RNSafeAreaView>
  )
}

SafeAreaView.defaultProps = {
  forceInset: {
    top: 'never'
  }
}

export default observer(SafeAreaView)
