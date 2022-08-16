/*
 * 页面容器
 * @Author: czy0729
 * @Date: 2022-05-01 14:26:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 12:50:58
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Loading } from '../loading'
import { Props as PageProps } from './types'

export { PageProps }

export const Page = observer(
  ({ style, loaded, loadingColor, backgroundColor, children, ...other }: PageProps) => {
    const _style = [_.container.plain, style]
    if (loaded || loaded === undefined)
      return (
        <View style={_style} {...other}>
          {children}
        </View>
      )

    return (
      <Loading style={_style} color={loadingColor} backgroundColor={backgroundColor} />
    )
  }
)
