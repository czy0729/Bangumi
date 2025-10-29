/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:42:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-29 23:18:22
 */
import React from 'react'
import { View } from 'react-native'
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

  return useObserver(() => {
    const { fixed, fixedPagination, show } = $.state
    const elToolbar = <ToolBar />
    const elPagination = <Pagination />

    return (
      <>
        {fixed && <View style={styles.fixedToolBar}>{elToolbar}</View>}
        <ScrollView
          forwardRef={$.forwardRef}
          contentContainerStyle={!fixed && styles.contentContainerStyle}
          scrollEventThrottle={16}
          onScroll={$.onScroll}
        >
          {!fixed && elToolbar}
          {show && !!$.list._loaded && ($.isList ? <List /> : <Grid />)}
          {!fixedPagination && elPagination}
        </ScrollView>
        {fixedPagination && elPagination}
      </>
    )
  })
}

export default Scroll
