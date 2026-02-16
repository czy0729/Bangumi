/*
 * @Author: czy0729
 * @Date: 2023-04-11 11:53:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-15 17:23:52
 */
import React, { Suspense, useCallback } from 'react'
import Stores from '@stores'
import { r } from '@utils/dev'
import { cleanQuery, isMobile } from '@utils/dom'
import { useBoolean, useMount } from '@utils/hooks'
import { Component } from '../../component'
import { Loading } from '../../loading'
import { Page } from '../../page'
import { StorybookBottomTab } from '../bottom-tab'
import { StorybookPage } from '../page'
import { StorybookScrollToTop } from '../scroll-top-top'
import { COMPONENT } from './ds'
import { styles } from './styles'
import './index.scss'

let inited = false

/** [WEB] 单页面根容器 */
export const StorybookSPA = ({ children }) => {
  r(COMPONENT)

  // 初始化全局 Stores
  const { state, setTrue } = useBoolean(inited)
  const init = useCallback(async () => {
    if (!inited) {
      try {
        await Stores.init()
      } catch (error) {
      } finally {
        setTrue()
        inited = true
      }
    }
  }, [setTrue])
  useMount(() => {
    init()
    setTimeout(() => {
      cleanQuery()
    }, 400)
  })

  return (
    <Suspense fallback={<Loading />}>
      <Component id='component-storybook-spa' data-mobile={isMobile()}>
        <StorybookPage>
          <StorybookScrollToTop />
          {state ? children : <Page style={styles.placeholder} />}
          <StorybookBottomTab />
        </StorybookPage>
      </Component>
    </Suspense>
  )
}

export default StorybookSPA
