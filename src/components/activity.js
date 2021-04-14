/*
 * @Author: czy0729
 * @Date: 2020-07-10 09:46:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-09 10:40:55
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ActivityIndicator } from '@ant-design/react-native'
import { _ } from '@stores'

export const Activity = observer(({ size = 'small', toast = false, color }) => (
  <ActivityIndicator
    size={size}
    toast={toast}
    color={color || _.select(_.colorSub, _.colorDesc)}
  />
))
