/*
 * @Author: czy0729
 * @Date: 2023-05-31 17:16:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-08 22:52:09
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Component } from '../component'
import { ErrorBoundary } from '../error-boundary'
import { Loading } from '../loading'
import { Props as PageProps } from './types'
import './index.scss'

export { PageProps }

export const Page = observer(
  ({
    style,
    loaded,
    loadingColor,
    backgroundColor,
    statusBarEvent,
    children,
    ...other
  }: PageProps) => {
    const _style = stl(_.container.plain, style)
    if (loaded || loaded === undefined)
      return (
        <ErrorBoundary style={_style}>
          <Component id='component-page' style={_.flatten(_style)} {...other}>
            {children}
          </Component>
        </ErrorBoundary>
      )

    return (
      <Loading style={_style} color={loadingColor} backgroundColor={backgroundColor} />
    )
  }
)
