/*
 * @Author: czy0729
 * @Date: 2019-05-29 19:37:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:10:00
 */
import { observer } from 'mobx-react'
import { Component, Page } from '@components'
import { stl } from '@utils'
import Extra from './component/extra'
import Loading from './component/loading'
import WebView from './component/web-view'
import { useAwardPage } from './hooks'
import { styles } from './styles'

import type { NavigationProps } from '@types'
import type { Params } from './types'

/** 年鉴 */
function Award(props: NavigationProps<Params>) {
  const { loading, year, html, source, handleOpen, handleLoad, handleError, handleMessage } =
    useAwardPage(props)

  return (
    <Component id='screen-award'>
      <Page style={stl(styles.container, year === '2025' && styles.container2025)}>
        {loading && <Loading onOpen={handleOpen} />}

        {!!html && (
          <WebView
            year={year}
            source={source}
            onLoad={handleLoad}
            onError={handleError}
            onMessage={handleMessage}
          />
        )}

        <Extra year={year} />
      </Page>
    </Component>
  )
}

export default observer(Award)
