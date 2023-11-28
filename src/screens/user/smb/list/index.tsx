/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:20:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-25 14:47:21
 */
import React from 'react'
import { ScrollView } from '@components'
import { obc } from '@utils/decorators'
import Top from '../top'
import Filter from '../filter'
import Pagination from '../pagination'
import { Ctx } from '../types'
import Lists from './lists'
import Grids from './grids'
import Empty from './empty'
import { styles } from './styles'

function List(props, { $ }: Ctx) {
  const { layoutList } = $.state.configs
  return (
    <>
      <Top />
      <ScrollView key={$.refreshKey} contentContainerStyle={styles.scrollView}>
        {!!$.smbs.length && <Filter />}
        {$.pageList.length ? layoutList ? <Lists /> : <Grids /> : <Empty />}
      </ScrollView>
      {!!$.pageList.length && <Pagination />}
    </>
  )
}

export default obc(List)
