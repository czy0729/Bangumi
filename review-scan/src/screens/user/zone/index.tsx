/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:22:34
 */
import React from 'react'
import './styles'
import { Component } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { ANDROID } from '@constants'
import { NavigationProps } from '@types'
import Extra from './component/extra'
import { useZonePage } from './hooks'
import NestedScroll from './nested-scroll'
import Scroll from './scroll'

/** 用户空间 */
const Zone = (props: NavigationProps) => {
  const { id, $ } = useZonePage(props)

  return useObserver(() => (
    <Component id='screen-zone' style={_.container.plain}>
      <StoreContext.Provider value={id}>
        {!!$.state._loaded && (
          <>
            {ANDROID ? <NestedScroll /> : <Scroll $={$} />}
            <Extra />
          </>
        )}
      </StoreContext.Provider>
    </Component>
  ))
}

export default Zone
