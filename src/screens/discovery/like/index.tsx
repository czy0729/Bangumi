/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:37:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-14 14:42:40
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Empty, HeaderPlaceholder, Page } from '@components'
import { TapListener } from '@_'
import { StoreContext } from '@stores'
import i18n from '@constants/i18n'
import Cate from './component/cate'
import List from './component/list'
import Tips from './component/tips'
import Header from './header'
import { useLikePage } from './hooks'

import type { NavigationProps } from '@types'

/** 猜你喜欢 */
function Like(props: NavigationProps) {
  const { $, id } = useLikePage(props)

  return (
    <Component id='screen-like'>
      <StoreContext.Provider value={id}>
        <TapListener>
          <Page loaded={$.state._loaded} loading={$.list.length ? undefined : $.state.fetching}>
            <HeaderPlaceholder />
            {$.userId ? (
              <>
                <Cate />
                <List />
                <Tips />
              </>
            ) : (
              <Empty
                text={`此功能依赖收藏数据，请先${i18n.login()}\n或点击右上方设置输入指定用户 ID`}
              />
            )}
          </Page>
        </TapListener>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Like)
