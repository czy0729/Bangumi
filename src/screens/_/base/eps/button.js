/*
 * @Author: czy0729
 * @Date: 2021-08-05 15:43:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-11 22:42:46
 */
import React from 'react'
import { _, systemStore } from '@stores'
import { ob } from '@utils/decorators'
import Main from './button.main'

export const Button = ob(props => (
  <Main styles={memoStyles()} heatMap={systemStore.setting.heatMap} {...props} />
))

const memoStyles = _.memoStyles(_ => ({
  bar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    height: 4,
    marginBottom: -4,
    backgroundColor: _.colorWarning,
    borderRadius: 4
  }
}))
