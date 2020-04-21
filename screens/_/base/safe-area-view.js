/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:09:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-21 10:41:54
 */
import React from 'react'
import { SafeAreaView as RNSafeAreaView } from 'react-navigation'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

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
