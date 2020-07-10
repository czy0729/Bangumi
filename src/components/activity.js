/*
 * @Author: czy0729
 * @Date: 2020-07-10 09:46:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-10 09:57:01
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ActivityIndicator } from '@ant-design/react-native'
import { _ } from '@stores'

function Activity({ size, toast, color }) {
  return (
    <ActivityIndicator
      size={size}
      toast={toast}
      color={color || _.select(_.colorSub, _.colorDesc)}
    />
  )
}

Activity.defaultProps = {
  size: 'small',
  toast: false,
  color: undefined
}

export default observer(Activity)
