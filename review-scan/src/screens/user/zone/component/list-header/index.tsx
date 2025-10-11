/*
 * @Author: czy0729
 * @Date: 2021-12-11 16:42:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-22 02:04:14
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { H_TABBAR } from '../../store'
import { COMPONENT } from './ds'

function ListHeader() {
  return (
    <View
      style={{
        height: _.parallaxImageHeight + H_TABBAR - 16
      }}
    />
  )
}

export default ob(ListHeader, COMPONENT)
