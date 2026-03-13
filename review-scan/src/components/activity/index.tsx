/*
 * @Author: czy0729
 * @Date: 2020-07-10 09:46:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 21:30:28
 */
import React from 'react'
import { observer } from 'mobx-react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { Props as ActivityProps } from './types'

export { ActivityProps }

/** 加载指示器 */
export const Activity = observer(({ size = 'small', toast = false, color }: ActivityProps) => {
  r(COMPONENT)

  return (
    <ActivityIndicator
      size={size}
      toast={toast}
      color={color || _.select(_.colorSub, _.colorDesc)}
    />
  )
})

export default Activity
