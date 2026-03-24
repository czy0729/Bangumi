/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:55:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-23 20:50:27
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import './styles'
import { Component, Page, Track } from '@components'
import { _, StoreContext } from '@stores'
import { useInsets } from '@utils/hooks'
import Bg from './component/bg'
import List from './component/list'
import Options from './component/options'
import { useMilestonePage } from './hooks'

import type { NavigationProps } from '@types'

/** 照片墙 */
function Milestone(props: NavigationProps) {
  const { id, $ } = useMilestonePage(props)

  const { statusBarHeight } = useInsets()

  return (
    <Component id='screen-milestone'>
      <StoreContext.Provider value={id}>
        <View
          style={{
            height: statusBarHeight,
            backgroundColor: _.colorPlain
          }}
        />
        <Page loaded={$.state._loaded}>
          <Bg />
          <List />
        </Page>
        <Options />
        <Track title='照片墙' hm={$.hm} />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Milestone)
