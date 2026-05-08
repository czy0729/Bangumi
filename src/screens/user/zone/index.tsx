/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 01:03:22
 */
import React from 'react'
import { observer } from 'mobx-react'
import './styles'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { ANDROID } from '@constants'
import Extra from './component/extra'
import { useZonePage } from './hooks'
import NestedScroll from './nested-scroll'
import Scroll from './scroll'

import type { NavigationProps } from '@types'

/** 用户空间 */
function Zone(props: NavigationProps) {
  const { id, $ } = useZonePage(props)

  return (
    <Component id='screen-zone'>
      <StoreContext.Provider value={id}>
        <Page>
          {!!$.state._loaded && (
            <>
              {ANDROID ? <NestedScroll /> : <Scroll />}
              <Extra />
            </>
          )}
        </Page>
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Zone)
