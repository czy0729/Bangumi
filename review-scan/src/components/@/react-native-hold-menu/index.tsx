/*
 * 二次开发 react-native-hold-menu@0.1.1
 *
 * https://github.com/enesozturk/react-native-hold-menu
 *  - 减轻全屏毛玻璃背景
 *  - 因为 https://github.com/enesozturk/react-native-hold-menu/issues/28 不能修复
 *    在 MenuItem.tsx(48行) 下使用订阅模式绕过 item.onPress 报错, 实现在 Expo@41 下可用此组件
 *
 * @Author: czy0729
 * @Date: 2021-12-27 06:57:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-19 10:52:28
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import Provider from './Provider'

const HoldMenuProvider = observer(({ children }) => {
  return <Provider theme={_.select('light', 'dark')}>{children}</Provider>
})

export { HoldMenuProvider }
