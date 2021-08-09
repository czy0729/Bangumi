/*
 * @Author: czy0729
 * @Date: 2021-08-05 15:43:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-10 01:43:10
 */
import React from 'react'
import { _, systemStore } from '@stores'
import { ob } from '@utils/decorators'
import Main from './button.main'

export const Button = ob(props => {
  const styles = memoStyles()
  const { heatMap } = systemStore.setting
  return <Main styles={styles} isPad={_.isPad} heatMap={heatMap} {...props} />
})

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
