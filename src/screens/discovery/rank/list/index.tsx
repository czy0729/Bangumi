/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:42:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 10:59:42
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
  const { show, list: _list, fixed, fixedPagination } = $.state
  const { _loaded } = $.list
  if (show && _loaded) {
    return (
      <ScrollView contentContainerStyle={styles.scrollView} scrollToTop>
        {!fixed && <ToolBar />}
        {_list ? <ListLayout /> : <Grid />}
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
