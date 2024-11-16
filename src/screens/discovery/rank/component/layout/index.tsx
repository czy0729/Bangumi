/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:42:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:42:56
 */
import React from 'react'
import { Flex, Loading, ScrollView } from '@components'
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
  if ($.state.show && $.list._loaded) {
    return (
      <ScrollView
        forwardRef={$.forwardRef}
        contentContainerStyle={styles.scrollView}
        scrollEventThrottle={16}
        onScroll={$.onScroll}
      >
        {!$.state.fixed && <ToolBar />}
        {$.state.list ? <List /> : <Grid />}
        {!$.state.fixedPagination && <Pagination />}
      </ScrollView>
    )
  }

  return (
    <Flex.Item>
      {!$.state.fixed && <ToolBar />}
      <Loading />
    </Flex.Item>
  )
}

export default ob(Layout, COMPONENT)
