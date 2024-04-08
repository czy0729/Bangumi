/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-08 11:14:58
 */
import React from 'react'
import { Component } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import { IOS, STORYBOOK } from '@constants'
import Extra from './component/extra'
import { useZonePage } from './hooks'
import NestedScroll from './nested-scroll'
import Scroll from './scroll'
import Store from './store'
import { Ctx } from './types'

/** 用户空间 */
const Zone = (props, context: Ctx) => {
  useZonePage(context)

  const { $ } = context
  return useObserver(() => (
    <Component id='screen-zone' style={_.container.plain}>
      {!!$.state._loaded && (
        <>
          {!IOS && !STORYBOOK ? <NestedScroll /> : <Scroll />}
          <Extra />
        </>
      )}
    </Component>
  ))
}

export default ic(Store, Zone)
