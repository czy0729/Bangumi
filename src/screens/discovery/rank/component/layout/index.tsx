/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:42:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-24 15:22:51
 */
import React from 'react'
import { Flex, Loading, ScrollView } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Grid from '../grid'
import List from '../list'
import Pagination from '../pagination'
import ToolBar from '../tool-bar'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Layout(props, { $ }: Ctx) {
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

export default obc(Layout, COMPONENT)
