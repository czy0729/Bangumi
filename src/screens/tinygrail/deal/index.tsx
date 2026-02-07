/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:46:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 11:10:30
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Scroll from './component/scroll'
import Header from './header'
import { useTinygrailDealPage } from './hooks'
import { memoStyles } from './styles'

import type { NavigationProps } from '@types'

/** 交易 */
const TinygrailDeal = (props: NavigationProps) => {
  const { id, refreshing, handleRefresh } = useTinygrailDealPage(props)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Component id='screen-tinygrail-deal'>
        <StoreContext.Provider value={id}>
          <Page style={styles.container}>
            <Header />
            <Scroll refreshing={refreshing} onRefresh={handleRefresh} />
          </Page>
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default TinygrailDeal
