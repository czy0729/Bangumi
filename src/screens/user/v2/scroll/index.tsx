/*
 * @Author: czy0729
 * @Date: 2022-03-16 16:30:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-12 20:55:55
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import Scroll from './scroll'
import { COMPONENT } from './ds'

/** iOS 和 WEB 用 */
export default ob(() => {
  const { $ } = useStore<Ctx>()
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
