/*
 * @Author: czy0729
 * @Date: 2022-03-16 16:30:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 11:46:59
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Scroll from './scroll'
import { COMPONENT } from './ds'

/** iOS 和 WEB 用 */
export default obc((props, { $ }: Ctx) => {
  const { page } = $.state
  return (
    <Scroll
      fixedHeight={$.fixedHeight}
      page={page}
      scrollToOffset={$.scrollToOffset}
      fetchCollections={$.fetchCollections}
      onChange={$.onChange}
      onScroll={$.onScroll}
    />
  )
}, COMPONENT)
