/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:32:50
 */
import React from 'react'
import { observer } from 'mobx-react'
import './styles'
import { Component } from '@components'
import { _, StoreContext } from '@stores'
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
    <Component id='screen-zone' style={_.container.plain}>
      <StoreContext.Provider value={id}>
        {!!$.state._loaded && (
          <>
            {ANDROID ? <NestedScroll /> : <Scroll />}
            <Extra />
          </>
        )}
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Zone)
