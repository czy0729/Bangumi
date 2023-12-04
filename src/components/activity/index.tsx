/*
 * @Author: czy0729
 * @Date: 2020-07-10 09:46:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-04 20:15:32
 */
import React from 'react'
import { observer } from 'mobx-react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { _ } from '@stores'
import { Props as ActivityProps } from './types'

export { ActivityProps }

/** 加载指示器 */
export const Activity = observer(
  ({ size = 'small', toast = false, color }: ActivityProps) => (
    <ActivityIndicator
      size={size}
      toast={toast}
      color={color || _.select(_.colorSub, _.colorDesc)}
    />
  )
)
