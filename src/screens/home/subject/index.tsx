/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-15 16:31:15
 */
import React from 'react'
import { Component, Page, Heatmap } from '@components'
import { TapListener } from '@_'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import Header from './page-header'
import Bg from './bg'
import List from './list'
import Modal from './modal'
import Store from './store'
import { useSubjectPage } from './hooks'
import { Ctx } from './types'

const Subject = (props, { $, navigation }: Ctx) => {
  const {
    fixed,
    forwardRef,
    onBlockRef,
    onScrollFn,
    onScrollIntoViewIfNeeded,
    onScrollTo
  } = useSubjectPage($)

  return useObserver(() => (
    <Component id='screen-subject'>
      <TapListener>
        <Page statusBarEvent={false}>
          {IOS && <Bg />}
          <List
            forwardRef={forwardRef}
            onScroll={onScrollFn}
            onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
            onBlockRef={onBlockRef}
          />
          <Modal />
        </Page>
      </TapListener>
      <Header
        fixed={fixed}
        index={navigation.getState().index}
        onScrollTo={onScrollTo}
      />
      <Heatmap id='条目' screen='Subject' />
    </Component>
  ))
}

export default ic(Store, Subject)
