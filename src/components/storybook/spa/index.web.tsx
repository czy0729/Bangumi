/*
 * @Author: czy0729
 * @Date: 2023-04-11 11:53:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-08 23:06:29
 */
import React, { useCallback } from 'react'
import Stores from '@stores'
import { useMount, useBoolean } from '@utils/hooks'
import { isMobile } from '@utils/dom'
import { Component } from '../../component'
import { Page } from '../../page'
import { StorybookPage } from '../page'
import { StorybookScrollToTop } from '../scroll-top-top'
import { StorybookBottomTab } from '../bottom-tab'
import { styles } from './styles'
import './index.scss'

let inited = false

export const StorybookSPA = ({ children }) => {
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
  })

  return (
    <Component id='component-storybook-spa' data-mobile={isMobile()}>
      <StorybookPage>
        <StorybookScrollToTop />
        {state ? children : <Page style={styles.placeholder} />}
        <StorybookBottomTab />
      </StorybookPage>
    </Component>
  )
}
