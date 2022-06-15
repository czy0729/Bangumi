/*
 * 页面容器
 * @Author: czy0729
 * @Date: 2022-05-01 14:26:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 14:38:41
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { ViewStyle, ColorValue } from '@types'
import { Loading } from '../loading'

type Props = {
  /** 样式 */
  style?: ViewStyle

  /** 是否加载中，通常传入 store._loaded */
  loaded?: boolean | string | number

  /** 加载指示器颜色 */
  loadingColor?: ColorValue

  /** 页面结构 */
  children?: any
}

export const Page = observer(
  ({ style, loaded, loadingColor, children, ...other }: Props) => {
    const _style = [_.container.plain, style]
    if (loaded || loaded === undefined)
      return (
        <View style={_style} {...other}>
          {children}
        </View>
      )

    return <Loading style={_style} color={loadingColor} />
  }
)
