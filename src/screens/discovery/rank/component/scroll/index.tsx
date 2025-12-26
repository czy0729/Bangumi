/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:42:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 00:31:56
 */
import React, { useMemo } from 'react'
import { ScrollView } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import ToolBar from '../tool-bar'
import Grid from './grid'
import List from './list'
import Pagination from './pagination'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function Scroll() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elToolBar = useMemo(() => <ToolBar />, [])
  const elPagination = useMemo(() => <Pagination />, [])

  return useObserver(() => {
    const { fixed, fixedPagination, show } = $.state

    return (
      <>
        {fixed && elToolBar}
        <ScrollView
          forwardRef={$.forwardRef}
          contentContainerStyle={!fixed && styles.contentContainerStyle}
          scrollEventThrottle={16}
          onScroll={$.onScroll}
        >
          {!fixed && elToolBar}
          {show && !!$.list._loaded && ($.isList ? <List /> : <Grid />)}
          {!fixedPagination && elPagination}
        </ScrollView>
        {fixedPagination && elPagination}
      </>
    )
  })
}

export default Scroll
