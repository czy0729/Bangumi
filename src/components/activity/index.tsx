/*
 * 加载指示器
 * @Author: czy0729
 * @Date: 2020-07-10 09:46:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-01 14:55:12
 */
import React from 'react'
import { observer } from 'mobx-react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { _ } from '@stores'

type Props = {
  /** 指示器大小 */
  size?: 'large' | 'small'

  /** 是否在屏幕中间生成Portal容器显示 */
  toast?: boolean

  /** 指示器颜色 */
  color?: string
}

export const Activity = observer(({ size = 'small', toast = false, color }: Props) => (
  <ActivityIndicator
    size={size}
    toast={toast}
    color={color || _.select(_.colorSub, _.colorDesc)}
  />
))
