/*
 * @Author: czy0729
 * @Date: 2023-05-31 17:16:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 13:15:13
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { ErrorBoundary } from '../error-boundary'
import { Loading } from '../loading'
import { Props as PageProps } from './types'

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
    const _style = stl(_.container.plain, styles.page, style)
    if (loaded || loaded === undefined)
      return (
        <ErrorBoundary style={_style}>
          <main className='component-page' style={_.flatten(_style)} {...other}>
            {children}
          </main>
        </ErrorBoundary>
      )

    return (
      <Loading style={_style} color={loadingColor} backgroundColor={backgroundColor} />
    )
  }
)

const styles = _.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh',
    minHeight: `calc(100vh - ${_.appBarHeight}px)`
  }
})
