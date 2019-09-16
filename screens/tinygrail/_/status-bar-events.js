/*
 * @Author: czy0729
 * @Date: 2019-09-16 19:42:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-16 19:42:52
 */
import React from 'react'
import { StatusBarEvents as CompStatusBarEvents } from '@components'
import { colorContainer } from '../styles'

function StatusBarEvents() {
  return (
    <CompStatusBarEvents
      barStyle='light-content'
      backgroundColor={colorContainer}
    />
  )
}

export default StatusBarEvents
