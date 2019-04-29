/* eslint-disable indent */
/*
 * @Author: czy0729
 * @Date: 2019-04-29 16:51:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-29 16:54:33
 */
import React from 'react'
import { HeaderPlaceholder } from '@components'
import { IOS } from '@constants'
import { tabsHeaderHeight } from './index'

export const listViewWithTabsHeaderProps = IOS
  ? {
      contentInset: {
        top: tabsHeaderHeight
      },
      contentOffset: {
        y: -tabsHeaderHeight
      }
    }
  : {
      progressViewOffset: tabsHeaderHeight,
      ListHeaderComponent: <HeaderPlaceholder tabs />
    }
