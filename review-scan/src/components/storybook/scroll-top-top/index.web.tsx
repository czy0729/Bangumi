/*
 * @Author: czy0729
 * @Date: 2023-11-08 20:42:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:36:33
 */
import React from 'react'
import { r } from '@utils/dev'
import { scrollToTop } from '@utils/dom'
import { t } from '@utils/fetch'
import { Component } from '../../component'
import { COMPONENT } from './ds'
import { styles } from './styles'
import './index.scss'

/** [WEB] 单页面滚动到顶块 */
export const StorybookScrollToTop = () => {
  r(COMPONENT)

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
      onClick={() => {
        t('SPA.到顶')

        scrollToTop()
      }}
    />
  )
}

export default StorybookScrollToTop
