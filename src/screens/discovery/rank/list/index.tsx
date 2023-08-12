/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:42:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 21:01:41
 */
import React from 'react'
import { ScrollView, Flex, Loading } from '@components'
import { obc } from '@utils/decorators'
import ToolBar from '../tool-bar'
import Pagination from '../pagination'
import { Ctx } from '../types'
import ListLayout from './list'
import Grid from './grid'
import { styles } from './styles'

function List(props, { $ }: Ctx) {
  const { show, list, fixed, fixedPagination } = $.state
  const { _loaded } = $.list
  if (show && _loaded) {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollView}
        scrollToTop
        scrollEventThrottle={4}
        onScroll={$.onScroll}
      >
        {!fixed && <ToolBar />}
        {list ? <ListLayout /> : <Grid />}
        {!fixedPagination && <Pagination />}
      </ScrollView>
    )
  }

  return (
    <Flex.Item>
      {!fixed && <ToolBar />}
      <Loading />
    </Flex.Item>
  )
}

export default obc(List)
