/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:20:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-04 21:08:33
 */
import React from 'react'
import { ScrollView } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Filter from '../filter'
import Pagination from '../pagination'
import Top from '../top'
import Empty from './empty'
import Grids from './grids'
import Lists from './lists'
import { COMPONENT } from './ds'
import { styles } from './styles'

function List(_props, { $ }: Ctx) {
  return (
    <>
      <Top />
      <ScrollView key={$.refreshKey} contentContainerStyle={styles.scrollView}>
        {!!$.smbs.length && <Filter />}
        {$.pageList.length ? $.state.configs.layoutList ? <Lists /> : <Grids /> : <Empty />}
      </ScrollView>
      {!!$.pageList.length && <Pagination />}
    </>
  )
}

export default obc(List, COMPONENT)
