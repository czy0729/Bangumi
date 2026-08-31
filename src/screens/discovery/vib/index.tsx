/*
 * @Author: czy0729
 * @Date: 2024-05-03 22:42:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 20:13:55
 *
 * 评分月刊页面: 编排 useVIBPage 与列表 / 头部
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import List from './component/list'
import Header from './header'
import { useVIBPage } from './hooks'

import type { NavigationProps } from '@types'

/** 评分月刊 */
function VIB(props: NavigationProps) {
  const { id, data, index, loaded, handleSelect, scrollToRef, handleScroll } = useVIBPage(props)

  return (
    <Component id='screen-vib'>
      <StoreContext.Provider value={id}>
        <Page loaded={loaded}>
          <HeaderPlaceholder />
          <List
            data={data}
            index={index}
            scrollToRef={scrollToRef}
            onSelect={handleSelect}
            onScroll={handleScroll}
          />
        </Page>
        <Header data={data.map(item => item.title)} onSelect={handleSelect} />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(VIB)
