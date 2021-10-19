/*
 * @Author: czy0729
 * @Date: 2020-07-10 09:46:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-18 11:48:02
 */
import React from 'react'
import { observer } from 'mobx-react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { _ } from '@stores'

type Props = {
  size?: 'large' | 'small'
  toast?: boolean
  color?: string
}

export const Activity: React.FC<Props> = observer(
  ({ size = 'small', toast = false, color }) => (
    <ActivityIndicator
      size={size}
      toast={toast}
      color={color || _.select(_.colorSub, _.colorDesc)}
    />
  )
)
