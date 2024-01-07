/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 22:10:29
 */
import React from 'react'
import { ic } from '@utils/decorators'
import { IOS, STORYBOOK } from '@constants'
import { useZonePage } from './hooks'
import NestedScroll from './nested-scroll'
import Page from './page'
import Store from './store'
import { Ctx } from './types'

const Zone = (props, context: Ctx) => {
  useZonePage(context)

  return !IOS && !STORYBOOK ? <NestedScroll /> : <Page />
}

export default ic(Store, Zone)
