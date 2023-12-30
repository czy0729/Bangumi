/*
 * @Author: czy0729
 * @Date: 2022-03-16 16:30:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-29 19:53:56
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Wrap from './wrap'

export default obc((props, { $ }: Ctx) => {
  const { page } = $.state
  return (
    <Wrap
      fixedHeight={$.fixedHeight}
      page={page}
      scrollToOffset={$.scrollToOffset}
      fetchCollections={$.fetchCollections}
      onChange={$.onChange}
      onScroll={$.onScroll}
    />
  )
})
