/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-18 03:58:05
 */
import React from 'react'
import { Component, Page } from '@components'
import { TapListener } from '@_'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import Bg from './component/bg'
import Extra from './component/extra'
import List from './component/list'
import Header from './header'
import { useSubjectPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 条目 */
const Subject = (props, context: Ctx) => {
  const { forwardRef, onBlockRef, onScrollIntoViewIfNeeded, onScrollTo } = useSubjectPage(context)

  return useObserver(() => (
    <Component id='screen-subject'>
      <TapListener>
        <Page statusBarEvent={false}>
          {IOS && <Bg />}
          <List
            forwardRef={forwardRef}
            onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
            onBlockRef={onBlockRef}
          />
        </Page>
      </TapListener>
      <Header onScrollTo={onScrollTo} />
      <Extra />
    </Component>
  ))
}

export default ic(Store, Subject)
