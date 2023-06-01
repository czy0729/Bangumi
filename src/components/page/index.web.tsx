/*
 * @Author: czy0729
 * @Date: 2023-05-31 17:16:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-01 01:28:08
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { ErrorBoundary } from '../error-boundary'
import { Loading } from '../loading'
import { styles } from './styles'
import { Props as PageProps } from './types'

export { PageProps }

export const Page = observer(
  ({ style, loaded, loadingColor, backgroundColor, children, ...other }: PageProps) => {
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
