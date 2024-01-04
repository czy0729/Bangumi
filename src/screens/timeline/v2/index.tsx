/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:47:13
 */
import React from 'react'
import { Component, Page } from '@components'
import { TapListener } from '@_'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Extra from './extra'
import Header from './header'
import { useTimelinePage } from './hooks'
import Store from './store'
import Tab from './tab'
import { Ctx } from './types'

const Timeline = (props, context: Ctx) => {
  useTimelinePage(context)

  const { $ } = context
  return useObserver(() => (
    <Component id='screen-timeline'>
      <TapListener>
        <Page>
          <Header />
          {$.state._loaded && <Tab />}
        </Page>
      </TapListener>
      <Extra />
    </Component>
  ))
}

export default ic(Store, Timeline)
