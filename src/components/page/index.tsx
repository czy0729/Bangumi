/*
 * 页面容器
 * @Author: czy0729
 * @Date: 2022-05-01 14:26:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-08 23:19:03
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { ErrorBoundary } from '../error-boundary'
import { Loading } from '../loading'
import { Props as PageProps } from './types'

export { PageProps }

export const Page = observer(
  ({ style, loaded, loadingColor, backgroundColor, children, ...other }: PageProps) => {
    const _style = stl(_.container.plain, style)
    if (loaded || loaded === undefined)
      return (
        <ErrorBoundary style={_style}>
          <View style={_style} {...other}>
            {children}
          </View>
        </ErrorBoundary>
      )

    return (
      <Loading style={_style} color={loadingColor} backgroundColor={backgroundColor} />
    )
  }
)
