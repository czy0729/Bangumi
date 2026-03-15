/*
 * @Author: czy0729
 * @Date: 2021-12-11 16:42:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-14 16:44:31
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { H_TABBAR } from '../../ds'
import { COMPONENT } from './ds'

function ListHeader() {
  r(COMPONENT)

  return useObserver(() => (
    <View
      style={{
        height: _.parallaxImageHeight + H_TABBAR - 16
      }}
    />
  ))
}

export default ListHeader
