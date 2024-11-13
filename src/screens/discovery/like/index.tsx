/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:37:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-13 07:57:38
 */
import React from 'react'
import { Component, Empty, Page } from '@components'
import { TapListener } from '@_'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import i18n from '@constants/i18n'
import Cate from './component/cate'
import List from './component/list'
import Tips from './component/tips'
import Header from './header'
import { useLikePage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 猜你喜欢 */
const Like = (_props, context: Ctx) => {
  useLikePage(context)

  const { $ } = context
  return useObserver(() => (
    <Component id='screen-like'>
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
    </Component>
  ))
}

export default ic(Store, Like)
