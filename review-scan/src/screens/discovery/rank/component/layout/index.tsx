/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:42:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 14:33:19
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Grid from '../grid'
import List from '../list'
import Pagination from '../pagination'
import ToolBar from '../tool-bar'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Layout() {
  const { $ } = useStore<Ctx>()
  const { fixed, fixedPagination, show, list } = $.state
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
        {show && !!$.list._loaded && (list ? <List /> : <Grid />)}
        {!fixedPagination && elPagination}
      </ScrollView>
      {fixedPagination && elPagination}
    </>
  )
}

export default ob(Layout, COMPONENT)
