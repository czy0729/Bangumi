/*
 * @Author: czy0729
 * @Date: 2023-11-08 20:42:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-08 20:48:08
 */
import React from 'react'
import { scrollToTop } from '@utils/dom'
import { Component } from '../../component'
import { styles } from './styles'
import './index.scss'

export const StorybookScrollToTop = () => {
  // 全局的双击顶部区域滚动到顶
  // const handleDoubleTap = useDoubleTap(() => {
  //   scrollToTop()
  // })

  return (
    <Component
      id='component-storybook-scroll-to-top'
      style={styles.scrollToTop}
      // onTouchStart={handleDoubleTap}
      // @ts-ignore 电脑端只点击一下就生效
      onClick={scrollToTop}
    />
  )
}
