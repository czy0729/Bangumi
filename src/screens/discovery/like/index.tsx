/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:37:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:39:48
 */
import React from 'react'
import { Component, Empty, Page } from '@components'
import { TapListener } from '@_'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import i18n from '@constants/i18n'
import { NavigationProps } from '@types'
import Cate from './component/cate'
import List from './component/list'
import Tips from './component/tips'
import Header from './header'
import { useLikePage } from './hooks'

/** 猜你喜欢 */
const Like = (props: NavigationProps) => {
  const { $, id } = useLikePage(props)

  return useObserver(() => (
    <Component id='screen-like'>
      <StoreContext.Provider value={id}>
        <Header />
        <TapListener>
          <Page loaded={$.state._loaded}>
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
      </StoreContext.Provider>
    </Component>
  ))
}

export default Like
